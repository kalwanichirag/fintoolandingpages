"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const hideHeaderRoutes = ["/retirement-planning","/Investment-Plannning","/personal-financial-planning","/financial-planning"];
  const hideFooterRoutes = ["/retirement-planning","/Investment-Plannning","/personal-financial-planning","/financial-planning"];

  const showHeader = !hideHeaderRoutes.includes(pathname);
  const showFooter = !hideFooterRoutes.includes(pathname);

  return (
    <>
      {showHeader && <Header />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
