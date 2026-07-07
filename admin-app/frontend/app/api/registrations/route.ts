import { NextResponse } from 'next/server';
import { getConnections } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');
    const { 
      EdibioUser, Company, EdistoreUser, Store, Invoice, 
      EdistoreOrder, EdistoreProduct 
    } = await getConnections();

    if (companyId) {
      const invoices = await Invoice.find({ companyId }).sort({ date: -1 }).lean();
      return NextResponse.json({
        success: true,
        invoices
      });
    }

    // Fetch data in parallel
    const [billingUsers, billingCompanies, storeUsers, storeList, allOrders, allProducts] = await Promise.all([
      EdibioUser.find({}).lean(),
      Company.find({}).lean(),
      EdistoreUser.find({}).lean(),
      Store.find({}).sort({ createdAt: -1 }).lean(),
      EdistoreOrder.find({}).lean(),
      EdistoreProduct.find({}).lean()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        billing: {
          users: billingUsers,
          companies: billingCompanies,
          totalUsers: billingUsers.length,
          totalCompanies: billingCompanies.length
        },
        edistore: {
          users: storeUsers,
          stores: storeList,
          orders: allOrders,
          products: allProducts,
          totalUsers: storeUsers.length,
          totalStores: storeList.length,
          pendingApprovals: storeList.filter((s: any) => s.isPending).length
        }
      }
    });
  } catch (error: any) {
    console.error('API GET Registrations Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, storeId, userId, companyId, plan, expiresAt } = body;

    if (!action) {
      return NextResponse.json(
        { success: false, error: 'Missing action parameter' },
        { status: 400 }
      );
    }

    const { 
      Store, EdibioUser, Company, Invoice, Product, Party, Expense, 
      EdistoreUser, EdistoreProduct, EdistoreOrder 
    } = await getConnections();

    // ── STORE MANAGEMENT ACTIONS ──
    if (['approve', 'reject', 'toggleVerify', 'toggleActive'].includes(action)) {
      if (!storeId) {
        return NextResponse.json({ success: false, error: 'Missing storeId' }, { status: 400 });
      }
      const store = await Store.findById(storeId);
      if (!store) {
        return NextResponse.json({ success: false, error: 'Store profile not found' }, { status: 404 });
      }

      if (action === 'approve') {
        store.isPending = false;
        store.isVerified = true;
        store.isActive = true;
      } else if (action === 'reject') {
        store.isPending = false;
        store.isVerified = false;
        store.isActive = false;
      } else if (action === 'toggleVerify') {
        store.isVerified = !store.isVerified;
      } else if (action === 'toggleActive') {
        store.isActive = !store.isActive;
      }

      await store.save();
      return NextResponse.json({
        success: true,
        message: `Store updated successfully: ${action}`,
        store: store.toObject()
      });
    }

    // ── SUBSCRIPTION PLAN MANAGEMENT ──
    if (action === 'updatePlan') {
      if (!userId || !plan) {
        return NextResponse.json({ success: false, error: 'Missing userId or plan' }, { status: 400 });
      }
      const user = await EdibioUser.findById(userId);
      if (!user) {
        return NextResponse.json({ success: false, error: 'Operator account not found' }, { status: 404 });
      }

      user.subscriptionType = plan.toUpperCase();
      if (expiresAt) {
        user.subscriptionExpiresAt = expiresAt;
      } else {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 1);
        user.subscriptionExpiresAt = d.toISOString();
      }

      await user.save();
      return NextResponse.json({
        success: true,
        message: `Subscription plan updated to ${plan.toUpperCase()}`
      });
    }

    // ── COMPANY DELETION & EDIT ACTIONS ──
    if (action === 'deleteCompany') {
      if (!companyId) {
        return NextResponse.json({ success: false, error: 'Missing companyId' }, { status: 400 });
      }
      // Delete operational logs
      await Invoice.deleteMany({ companyId });
      await Product.deleteMany({ companyId });
      await Party.deleteMany({ companyId });
      await Expense.deleteMany({ companyId });
      // Delete company document
      await Company.deleteOne({ _id: companyId });

      return NextResponse.json({
        success: true,
        message: 'Company and all associated ledger records deleted successfully'
      });
    }

    if (action === 'deleteCompanyData') {
      if (!companyId) {
        return NextResponse.json({ success: false, error: 'Missing companyId' }, { status: 400 });
      }
      // Only delete invoice/product/expense logs inside company
      await Invoice.deleteMany({ companyId });
      await Product.deleteMany({ companyId });
      await Party.deleteMany({ companyId });
      await Expense.deleteMany({ companyId });

      return NextResponse.json({
        success: true,
        message: 'All inventory, invoices, and expense datas inside company deleted successfully'
      });
    }

    // ── ACCOUNT/USER DELETION ──
    if (action === 'deleteAccount') {
      if (!userId) {
        return NextResponse.json({ success: false, error: 'Missing userId' }, { status: 400 });
      }
      
      // Find all companies registered by this user
      const userCompanies = await Company.find({ userId }).lean();
      for (const comp of userCompanies) {
        // Delete all data for this company
        await Invoice.deleteMany({ companyId: comp._id });
        await Product.deleteMany({ companyId: comp._id });
        await Party.deleteMany({ companyId: comp._id });
        await Expense.deleteMany({ companyId: comp._id });
      }
      // Delete all company docs
      await Company.deleteMany({ userId });
      // Delete user doc
      await EdibioUser.deleteOne({ _id: userId });

      return NextResponse.json({
        success: true,
        message: 'Operator account, all registered companies, and operational logs deleted completely'
      });
    }

    // ── STORE DELETION ──
    if (action === 'deleteStore') {
      if (!storeId) {
        return NextResponse.json({ success: false, error: 'Missing storeId' }, { status: 400 });
      }
      const store = await Store.findById(storeId);
      if (!store) {
        return NextResponse.json({ success: false, error: 'Store not found' }, { status: 404 });
      }
      
      const sellerId = store.sellerId;
      // Delete products and orders listed on storefront
      await EdistoreProduct.deleteMany({ storeId });
      await EdistoreOrder.deleteMany({ storeId });
      // Delete store document
      await Store.deleteOne({ _id: storeId });
      
      // Delete seller user if they don't have other stores
      const otherStores = await Store.countDocuments({ sellerId });
      if (otherStores === 0) {
        await EdistoreUser.deleteOne({ _id: sellerId });
      }

      return NextResponse.json({
        success: true,
        message: 'E-commerce store, product listings, and order history deleted completely'
      });
    }

    return NextResponse.json(
      { success: false, error: `Invalid action: ${action}` },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('API POST Registrations Action Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Action processing failed' },
      { status: 500 }
    );
  }
}
