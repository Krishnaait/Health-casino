import Header from "./Header";
import Footer from "./Footer";
import { PromoWidget } from "./PromoWidget";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Stealth promotional widget - appears above everything */}
      {/* <PromoWidget /> */}
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
