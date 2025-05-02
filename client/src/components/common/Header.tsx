import { NavLink } from "react-router-dom";
import { PAGES } from "../../constants/constants";

export function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span className="text-xl font-bold">Products shop</span>
        </div>

        <nav className="hidden md:flex space-x-6">
          <NavLink to={PAGES.main} className="hover:text-gray-300 transition">
            Главная
          </NavLink>
          <NavLink
            to={PAGES.statistics}
            className="hover:text-gray-300 transition"
          >
            Статистика
          </NavLink>
        </nav>

        <button className="md:hidden focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
