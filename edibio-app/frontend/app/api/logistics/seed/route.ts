import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import {
  LsLoad,
  LsLoadEvent,
  LsTracking,
  LsDriver,
  LsVehicle,
  LsFuel,
  LsMaintenance,
  LsInvoice
} from '@/lib/logistics/models';

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const { companyId } = body;

    if (!companyId) {
      return NextResponse.json({ error: 'companyId is required' }, { status: 400 });
    }

    // Clean existing data for this company to allow re-seeding
    await LsDriver.deleteMany({ companyId });
    await LsVehicle.deleteMany({ companyId });
    await LsLoad.deleteMany({ companyId });
    await LsLoadEvent.deleteMany({ companyId });
    await LsTracking.deleteMany({ companyId });
    await LsFuel.deleteMany({ companyId });
    await LsMaintenance.deleteMany({ companyId });
    await LsInvoice.deleteMany({ companyId });

    // 1. Create Drivers
    const driversData = [
      {
        name: 'John Doe',
        phone: '+1 (555) 019-2831',
        email: 'john.doe@loadswift.com',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        licenseNumber: 'CDL-TX98231',
        licenseExpiry: '2028-12-31',
        insuranceExpiry: '2027-06-30',
        medicalExpiry: '2026-11-15',
        status: 'available',
        rating: 4.85,
        totalLoads: 142,
        totalKm: 184500,
        companyId,
      },
      {
        name: 'Robert Smith',
        phone: '+1 (555) 014-9844',
        email: 'robert.s@loadswift.com',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        licenseNumber: 'CDL-IL87431',
        licenseExpiry: '2029-04-18',
        insuranceExpiry: '2027-06-30',
        medicalExpiry: '2027-02-28',
        status: 'on_trip',
        rating: 4.92,
        totalLoads: 289,
        totalKm: 342100,
        companyId,
      },
      {
        name: 'Carlos Santana',
        phone: '+1 (555) 017-3811',
        email: 'carlos.s@loadswift.com',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        licenseNumber: 'CDL-CA19827',
        licenseExpiry: '2027-08-24',
        insuranceExpiry: '2027-06-30',
        medicalExpiry: '2026-09-12',
        status: 'available',
        rating: 4.78,
        totalLoads: 94,
        totalKm: 98200,
        companyId,
      },
      {
        name: 'Michael Chang',
        phone: '+1 (555) 012-7391',
        email: 'm.chang@loadswift.com',
        photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        licenseNumber: 'CDL-NY78129',
        licenseExpiry: '2028-05-14',
        insuranceExpiry: '2027-06-30',
        medicalExpiry: '2027-05-14',
        status: 'on_trip',
        rating: 4.65,
        totalLoads: 64,
        totalKm: 52100,
        companyId,
      },
      {
        name: 'David Miller',
        phone: '+1 (555) 015-8822',
        email: 'd.miller@loadswift.com',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        licenseNumber: 'CDL-FL65431',
        licenseExpiry: '2026-03-10',
        insuranceExpiry: '2026-03-10',
        medicalExpiry: '2025-12-05',
        status: 'suspended',
        rating: 3.82,
        totalLoads: 18,
        totalKm: 12400,
        companyId,
      }
    ];

    const drivers = await LsDriver.insertMany(driversData);

    // 2. Create Vehicles
    const vehiclesData = [
      {
        vehicleNumber: 'TRK-101',
        type: 'truck',
        make: 'Peterbilt',
        model: '579 Ultraloft',
        year: 2022,
        vin: '1XP9D49XNND762391',
        registrationNumber: 'TX-RGT9811',
        registrationExpiry: '2027-02-15',
        insuranceExpiry: '2027-06-30',
        capacityTons: 24,
        status: 'active',
        currentDriverId: drivers[1]._id.toString(),
        currentDriverName: drivers[1].name,
        odometerKm: 245100,
        fuelType: 'diesel',
        fuelEfficiency: 2.8, // km per liter
        companyId,
        nextMaintenanceDue: '2026-07-15',
        nextMaintenanceKm: 250000,
      },
      {
        vehicleNumber: 'TRK-102',
        type: 'truck',
        make: 'Freightliner',
        model: 'Cascadia',
        year: 2023,
        vin: '1FVACWDB8NP491823',
        registrationNumber: 'IL-RGT4819',
        registrationExpiry: '2027-05-18',
        insuranceExpiry: '2027-06-30',
        capacityTons: 22,
        status: 'active',
        currentDriverId: drivers[0]._id.toString(),
        currentDriverName: drivers[0].name,
        odometerKm: 112400,
        fuelType: 'diesel',
        fuelEfficiency: 3.1,
        companyId,
        nextMaintenanceDue: '2026-08-01',
        nextMaintenanceKm: 120000,
      },
      {
        vehicleNumber: 'TRK-103',
        type: 'truck',
        make: 'Volvo',
        model: 'VNL 860',
        year: 2024,
        vin: '4V4NC9EJ8PN291083',
        registrationNumber: 'CA-RGT1983',
        registrationExpiry: '2027-10-12',
        insuranceExpiry: '2027-06-30',
        capacityTons: 24,
        status: 'active',
        currentDriverId: drivers[3]._id.toString(),
        currentDriverName: drivers[3].name,
        odometerKm: 38200,
        fuelType: 'diesel',
        fuelEfficiency: 2.9,
        companyId,
        nextMaintenanceDue: '2026-09-10',
        nextMaintenanceKm: 50000,
      },
      {
        vehicleNumber: 'TRL-201',
        type: 'trailer',
        make: 'Great Dane',
        model: 'Champion Dry Van 53\'',
        year: 2021,
        registrationNumber: 'TX-TRL4391',
        registrationExpiry: '2026-11-20',
        capacityTons: 20,
        status: 'active',
        odometerKm: 389200,
        companyId,
      },
      {
        vehicleNumber: 'TRL-202',
        type: 'trailer',
        make: 'Utility',
        model: '3000R Reefer 53\'',
        year: 2020,
        registrationNumber: 'IL-TRL8210',
        registrationExpiry: '2026-08-15',
        capacityTons: 22,
        status: 'maintenance',
        odometerKm: 421000,
        companyId,
        nextMaintenanceDue: '2026-05-30',
      }
    ];

    const vehicles = await LsVehicle.insertMany(vehiclesData);

    // 3. Create Loads
    const now = new Date();
    const isoString = (d: Date) => d.toISOString();

    const dateOffset = (days: number) => {
      const d = new Date(now);
      d.setDate(d.getDate() + days);
      return d;
    };

    const loadsData = [
      {
        loadNumber: 'LS-01001',
        status: 'in_transit',
        customerName: 'Wayfair Inc',
        customerCompany: 'Wayfair Logistics',
        customerPhone: '+1 (800) 508-1188',
        customerEmail: 'shipping@wayfair.com',
        pickupAddress: '100 Main St, Chicago, IL',
        pickupCity: 'Chicago',
        pickupLat: 41.8781,
        pickupLng: -87.6298,
        pickupDate: isoString(dateOffset(-1)),
        deliveryAddress: '2300 Stemmons Fwy, Dallas, TX',
        deliveryCity: 'Dallas',
        deliveryLat: 32.7767,
        deliveryLng: -96.7970,
        deliveryDate: isoString(dateOffset(1)),
        commodity: 'Furniture & Decor',
        weightKg: 14200,
        volumeCbm: 68,
        specialInstructions: 'Liftgate required. Contact receiver 2 hours prior.',
        driverId: drivers[1]._id.toString(),
        driverName: drivers[1].name,
        vehicleId: vehicles[0]._id.toString(),
        vehicleNumber: vehicles[0].vehicleNumber,
        baseRate: 3500,
        fuelCost: 450,
        fuelRebate: 120,
        tollCost: 80,
        taxes: 280,
        commission: 350,
        netPayout: 2940, // Base - commission
        grossRevenue: 3700, // Base + fuelRebate - toll
        profitMargin: 20.5,
        distanceKm: 1480,
        etaHours: 16.5,
        currentEta: isoString(dateOffset(0.5)),
        currentLat: 36.1627, // Somewhere near Nashville/Memphis/Arkansas
        currentLng: -90.0528,
        lastPing: isoString(now),
        companyId,
      },
      {
        loadNumber: 'LS-01002',
        status: 'upcoming',
        customerName: 'Trader Joe\'s',
        customerCompany: 'TJ Wholesale',
        customerPhone: '+1 (626) 599-3700',
        customerEmail: 'logistics@traderjoes.com',
        pickupAddress: '430 S Bixel St, Los Angeles, CA',
        pickupCity: 'Los Angeles',
        pickupLat: 34.0522,
        pickupLng: -118.2437,
        pickupDate: isoString(dateOffset(1)),
        deliveryAddress: '1201 3rd Ave, Seattle, WA',
        deliveryCity: 'Seattle',
        deliveryLat: 47.6062,
        deliveryLng: -122.3321,
        deliveryDate: isoString(dateOffset(3)),
        commodity: 'Fresh Produce (Organic)',
        weightKg: 18500,
        volumeCbm: 74,
        specialInstructions: 'Maintain temp at 4°C (39°F). Reefer trailer required.',
        driverId: drivers[0]._id.toString(),
        driverName: drivers[0].name,
        vehicleId: vehicles[1]._id.toString(),
        vehicleNumber: vehicles[1].vehicleNumber,
        baseRate: 4200,
        fuelCost: 600,
        fuelRebate: 150,
        tollCost: 40,
        taxes: 336,
        commission: 420,
        netPayout: 3580,
        grossRevenue: 4350,
        profitMargin: 17.7,
        distanceKm: 1820,
        etaHours: 20.0,
        currentEta: isoString(dateOffset(3)),
        companyId,
      },
      {
        loadNumber: 'LS-01003',
        status: 'delivered',
        customerName: 'International Paper',
        customerCompany: 'IP Carton Corp',
        customerPhone: '+1 (901) 419-7000',
        customerEmail: 'ip.shipping@intpaper.com',
        pickupAddress: '6400 Poplar Ave, Memphis, TN',
        pickupCity: 'Memphis',
        pickupLat: 35.1495,
        pickupLng: -90.0490,
        pickupDate: isoString(dateOffset(-4)),
        deliveryAddress: '100 Peachtree St NW, Atlanta, GA',
        deliveryCity: 'Atlanta',
        deliveryLat: 33.7490,
        deliveryLng: -84.3880,
        deliveryDate: isoString(dateOffset(-3)),
        commodity: 'Paper Rolls & Packaging',
        weightKg: 22000,
        volumeCbm: 60,
        specialInstructions: 'Straps required. Double check seal number on bills.',
        driverId: drivers[2]._id.toString(),
        driverName: drivers[2].name,
        vehicleId: vehicles[2]._id.toString(),
        vehicleNumber: vehicles[2].vehicleNumber,
        baseRate: 1800,
        fuelCost: 220,
        tollCost: 15,
        taxes: 144,
        commission: 180,
        netPayout: 1485,
        grossRevenue: 1800,
        profitMargin: 23.5,
        distanceKm: 620,
        etaHours: 7.0,
        currentEta: isoString(dateOffset(-3)),
        companyId,
      },
      {
        loadNumber: 'LS-01004',
        status: 'delayed',
        customerName: 'Chevron Phillips Chemical',
        customerCompany: 'CPC Logistics',
        customerPhone: '+1 (800) 231-1212',
        customerEmail: 'cpchem.freight@cpchem.com',
        pickupAddress: '10001 Six Pines Dr, Houston, TX',
        pickupCity: 'Houston',
        pickupLat: 29.7604,
        pickupLng: -95.3698,
        pickupDate: isoString(dateOffset(-2)),
        deliveryAddress: '1700 Lincoln St, Denver, CO',
        deliveryCity: 'Denver',
        deliveryLat: 39.7392,
        deliveryLng: -104.9903,
        deliveryDate: isoString(dateOffset(1)),
        commodity: 'Polyethylene Resins',
        weightKg: 21600,
        volumeCbm: 70,
        specialInstructions: 'Tarping required if flatbed used. Wear full PPE at plant.',
        driverId: drivers[3]._id.toString(),
        driverName: drivers[3].name,
        vehicleId: vehicles[2]._id.toString(),
        vehicleNumber: vehicles[2].vehicleNumber,
        baseRate: 4600,
        fuelCost: 650,
        fuelRebate: 180,
        tollCost: 90,
        taxes: 368,
        commission: 460,
        netPayout: 3870,
        grossRevenue: 4780,
        profitMargin: 19.1,
        distanceKm: 1650,
        etaHours: 18.5,
        currentEta: isoString(dateOffset(1.5)), // Delayed by half a day
        currentLat: 35.2271, // Near Amarillo, TX
        currentLng: -101.8313,
        lastPing: isoString(now),
        companyId,
        notes: 'Driver reporting heavy snowstorms near Amarillo, TX. Traffic delayed.',
      }
    ];

    const loads = await LsLoad.insertMany(loadsData);

    // Update drivers currentLoadId
    await LsDriver.updateOne({ _id: drivers[1]._id }, { currentLoadId: loads[0]._id.toString(), status: 'on_trip' });
    await LsDriver.updateOne({ _id: drivers[3]._id }, { currentLoadId: loads[3]._id.toString(), status: 'on_trip' });

    // Update vehicles currentLoadId
    await LsVehicle.updateOne({ _id: vehicles[0]._id }, { currentLoadId: loads[0]._id.toString() });
    await LsVehicle.updateOne({ _id: vehicles[2]._id }, { currentLoadId: loads[3]._id.toString() });

    // 4. Create Timeline Events
    const eventsData = [
      // Events for Load 1 (in_transit)
      {
        loadId: loads[0]._id.toString(),
        type: 'pickup_scheduled',
        timestamp: isoString(dateOffset(-1.2)),
        locationName: 'Chicago Terminal',
        notes: 'Pickup appointment scheduled for 10:00 AM.',
        companyId,
      },
      {
        loadId: loads[0]._id.toString(),
        type: 'picked_up',
        timestamp: isoString(dateOffset(-0.95)),
        lat: 41.8781,
        lng: -87.6298,
        locationName: 'Wayfair Warehouse, Chicago IL',
        driverId: drivers[1]._id.toString(),
        driverName: drivers[1].name,
        notes: 'Cargo loaded. Clean bill of lading signed.',
        photos: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300'],
        companyId,
      },
      {
        loadId: loads[0]._id.toString(),
        type: 'in_transit',
        timestamp: isoString(dateOffset(-0.8)),
        lat: 40.0,
        lng: -88.0,
        locationName: 'En route near Champaign, IL',
        notes: 'Departed Chicago terminal. Heading south on I-57.',
        companyId,
      },

      // Events for Load 3 (delivered)
      {
        loadId: loads[2]._id.toString(),
        type: 'pickup_scheduled',
        timestamp: isoString(dateOffset(-4.5)),
        locationName: 'Memphis Plant',
        companyId,
      },
      {
        loadId: loads[2]._id.toString(),
        type: 'picked_up',
        timestamp: isoString(dateOffset(-4.0)),
        lat: 35.1495,
        lng: -90.0490,
        locationName: 'International Paper, Memphis TN',
        notes: 'Banded rolls loaded. Bill #IP-99882.',
        companyId,
      },
      {
        loadId: loads[2]._id.toString(),
        type: 'delivered',
        timestamp: isoString(dateOffset(-3.0)),
        lat: 33.7490,
        lng: -84.3880,
        locationName: 'Atlanta Distribution, GA',
        notes: 'Rolls delivered in good condition. Signed pod uploaded.',
        photos: ['https://images.unsplash.com/photo-1553413077-190dd305871c?w=300'],
        companyId,
      },

      // Events for Load 4 (delayed)
      {
        loadId: loads[3]._id.toString(),
        type: 'picked_up',
        timestamp: isoString(dateOffset(-1.8)),
        lat: 29.7604,
        lng: -95.3698,
        locationName: 'Houston Chemical Plant, TX',
        companyId,
      },
      {
        loadId: loads[3]._id.toString(),
        type: 'delay_reported',
        timestamp: isoString(dateOffset(-0.2)),
        lat: 35.2271,
        lng: -101.8313,
        locationName: 'I-40 Highway, Amarillo TX',
        notes: 'Heavy winter storm. Highway patrol requiring tire chains or parking. Waiting at truck stop.',
        companyId,
      }
    ];

    await LsLoadEvent.insertMany(eventsData);

    // 5. Create GPS pings for live tracking (Load 1 & Load 4)
    const pingsData = [
      {
        loadId: loads[0]._id.toString(),
        driverId: drivers[1]._id.toString(),
        lat: 36.1627,
        lng: -90.0528,
        speed: 85,
        heading: 210,
        battery: 92,
        network: '4g',
        timestamp: isoString(now),
        accuracy: 5,
      },
      {
        loadId: loads[3]._id.toString(),
        driverId: drivers[3]._id.toString(),
        lat: 35.2271,
        lng: -101.8313,
        speed: 0,
        heading: 270,
        battery: 64,
        network: '3g',
        timestamp: isoString(now),
        accuracy: 12,
      }
    ];

    await LsTracking.insertMany(pingsData);

    // 6. Fuel Transactions
    const fuelData = [
      {
        vehicleId: vehicles[0]._id.toString(),
        vehicleNumber: vehicles[0].vehicleNumber,
        driverId: drivers[1]._id.toString(),
        driverName: drivers[1].name,
        loadId: loads[0]._id.toString(),
        liters: 320,
        pricePerLiter: 1.15,
        totalCost: 368,
        odometer: 244800,
        station: 'Loves Travel Stop #321, IL',
        paymentMethod: 'Fuel Card',
        date: isoString(dateOffset(-0.8)),
        companyId,
      },
      {
        vehicleId: vehicles[1]._id.toString(),
        vehicleNumber: vehicles[1].vehicleNumber,
        driverId: drivers[0]._id.toString(),
        driverName: drivers[0].name,
        liters: 280,
        pricePerLiter: 1.20,
        totalCost: 336,
        odometer: 112100,
        station: 'Pilot Flying J #884, CA',
        paymentMethod: 'Fuel Card',
        date: isoString(dateOffset(-3)),
        companyId,
      }
    ];

    await LsFuel.insertMany(fuelData);

    // 7. Maintenance Records
    const maintenanceData = [
      {
        vehicleId: vehicles[0]._id.toString(),
        vehicleNumber: vehicles[0].vehicleNumber,
        type: 'oil_change',
        description: 'Routine 15k mile service. Oil change, filter swap, fluid top-up.',
        cost: 250,
        odometer: 240000,
        serviceCenter: 'Peterbilt Service, Dallas TX',
        date: isoString(dateOffset(-30)),
        nextDueDate: isoString(dateOffset(60)),
        nextDueOdometer: 255000,
        status: 'completed',
        companyId,
      },
      {
        vehicleId: vehicles[1]._id.toString(),
        vehicleNumber: vehicles[1].vehicleNumber,
        type: 'brake',
        description: 'Rear brake shoe replacement and drum machining.',
        cost: 950,
        odometer: 105000,
        serviceCenter: 'TA Truck Service, Chicago IL',
        date: isoString(dateOffset(-12)),
        status: 'completed',
        companyId,
      },
      {
        vehicleId: vehicles[4]._id.toString(), // trailer reefer
        vehicleNumber: vehicles[4].vehicleNumber,
        type: 'repair',
        description: 'Refrigeration unit compressor vibration diagnostics and belt replacement.',
        cost: 480,
        odometer: 421000,
        serviceCenter: 'Thermo King, St Louis MO',
        date: isoString(dateOffset(-1)),
        nextDueDate: isoString(dateOffset(29)),
        status: 'in_progress',
        companyId,
      }
    ];

    await LsMaintenance.insertMany(maintenanceData);

    // 8. Invoices
    const invoicesData = [
      {
        invoiceNumber: 'INV-LS-2026-001',
        loadId: loads[2]._id.toString(),
        loadNumber: loads[2].loadNumber,
        customerName: loads[2].customerName,
        customerCompany: loads[2].customerCompany,
        customerEmail: loads[2].customerEmail,
        amount: loads[2].baseRate,
        tax: loads[2].taxes || 144,
        totalAmount: loads[2].baseRate + (loads[2].taxes || 144),
        status: 'paid',
        dueDate: isoString(dateOffset(15)),
        paidDate: isoString(dateOffset(-2)),
        companyId,
      },
      {
        invoiceNumber: 'INV-LS-2026-002',
        loadId: loads[0]._id.toString(),
        loadNumber: loads[0].loadNumber,
        customerName: loads[0].customerName,
        customerCompany: loads[0].customerCompany,
        customerEmail: loads[0].customerEmail,
        amount: loads[0].baseRate,
        tax: loads[0].taxes || 280,
        totalAmount: loads[0].baseRate + (loads[0].taxes || 280),
        status: 'sent',
        dueDate: isoString(dateOffset(30)),
        companyId,
      }
    ];

    await LsInvoice.insertMany(invoicesData);

    return NextResponse.json({ success: true, message: 'LoadSwift dummy data seeded successfully' }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
