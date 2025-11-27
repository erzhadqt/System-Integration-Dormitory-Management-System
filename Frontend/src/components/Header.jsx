import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Info, Mail, ArrowRight, Building2, Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-5">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
              <div className="p-1.5 sm:p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-white drop-shadow-lg">
                Dormitory <span className="text-blue-400 hidden xs:inline">Management</span>
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `group flex items-center gap-2 font-semibold transition-all duration-300 ${
                    isActive ? 'text-blue-300' : 'text-white hover:text-blue-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="relative">
                      Home
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      ></span>
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `group flex items-center gap-2 font-semibold transition-all duration-300 ${
                    isActive ? 'text-blue-300' : 'text-white hover:text-blue-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="relative">
                      About
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      ></span>
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `group flex items-center gap-2 font-semibold transition-all duration-300 ${
                    isActive ? 'text-blue-300' : 'text-white hover:text-blue-300'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="relative">
                      Contact
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      ></span>
                    </span>
                  </>
                )}
              </NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer md:hidden p-2 text-white hover:text-blue-300 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="cursor-pointer group bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1 sm:gap-2"
            >
              <span className="hidden xs:inline">Log In</span>
              <span className="xs:hidden">Login</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden px-4 py-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 font-semibold transition-all duration-300 ${
                    isActive ? 'text-blue-300' : 'text-white hover:text-blue-300'
                  }`
                }
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 font-semibold transition-all duration-300 ${
                    isActive ? 'text-blue-300' : 'text-white hover:text-blue-300'
                  }`
                }
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 font-semibold transition-all duration-300 ${
                    isActive ? 'text-blue-300' : 'text-white hover:text-blue-300'
                  }`
                }
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;