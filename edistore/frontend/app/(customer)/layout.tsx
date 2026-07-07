import Navbar from '@/components/customer/Navbar';
import Footer from '@/components/customer/Footer';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={layoutStyle}>
      <Navbar />
      <main style={mainStyle}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};
