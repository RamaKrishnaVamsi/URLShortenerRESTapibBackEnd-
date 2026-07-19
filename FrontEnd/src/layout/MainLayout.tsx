import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, Link as LinkIcon } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function MainLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-[#0F172A]/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-[#2563EB] p-2 rounded-lg">
              <LinkIcon className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Short.ly</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm font-medium hover:text-[#2563EB] transition-colors"
              >
                Log in
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-[#0F172A]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-[#2563EB] p-1.5 rounded-md">
                <LinkIcon className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">Short.ly</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              The premium URL shortener for modern teams. Build, share, and
              track short links with our powerful analytics platform.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="#" className="hover:text-[#2563EB]">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#2563EB]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#2563EB]">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="#" className="hover:text-[#2563EB]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#2563EB]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#2563EB]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-sm text-center text-slate-500">
          © {new Date().getFullYear()} Short.ly SaaS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
