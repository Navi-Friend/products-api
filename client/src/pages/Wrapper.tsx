import { Outlet } from "react-router-dom";
import { Header } from "../components/common/Header";
import Footer from "../components/common/Footer";

export function Wrapper() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="min-h-screen container mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
