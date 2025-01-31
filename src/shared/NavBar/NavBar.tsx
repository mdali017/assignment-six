"use client";

import React, { useState } from "react";
import {
  Search,
  Home,
  Users,
  BriefcaseIcon,
  MessageCircle,
  Bell,
  User,
  Grid,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";

// Interface definitions
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
}

interface MobileNavItemProps extends NavItemProps {
  onClick?: () => void;
}

type IconType = LucideIcon;

interface NavLink {
  icon: IconType;
  label: string;
  badge?: string;
  active?: boolean;
}

const NavBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Navigation items data
  const navLinks: NavLink[] = [
    { icon: Home, label: "Home" },
    { icon: Users, label: "My Network" },
    { icon: BriefcaseIcon, label: "Jobs" },
    { icon: MessageCircle, label: "Messaging" },
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: User, label: "Me" },
    { icon: Grid, label: "For Business" },
  ];

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <nav className="bg-black border-b border-gray-300 py-5 fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left section - Logo and Search */}
            <div className="flex items-center flex-1 ">
              {/* LinkedIn Logo */}
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                  />
                </svg>
              </div>

              {/* Search Bar */}
              <div className="hidden sm:block ml-4 flex-1 max-w-80 ">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-white" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-100"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              {/* Mobile Search Icon */}
              <button
                type="button"
                className="sm:hidden ml-4 p-2 text-white hover:text-white"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <NavItem
                    icon={<link.icon className="w-6 h-6" />}
                    label={link.label}
                    active={link.active}
                    badge={link.badge}
                  />
                  {index === 5 && (
                    <div className="border-l border-gray-300 h-8 mx-2" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-white hover:text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden ${
            isOpen ? "fixed inset-0 top-14 bg-white z-40" : "hidden"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                <MobileNavItem
                  icon={<link.icon className="w-6 h-6" />}
                  label={link.label}
                  active={link.active}
                  badge={link.badge}
                />
                {index === 5 && (
                  <div className="border-t border-gray-200 my-2" />
                )}
              </React.Fragment>
            ))}
            <a
              href="#"
              className="flex items-center px-4 py-3 text-base font-semibold text-amber-700 hover:bg-gray-50"
            >
              Try Premium
            </a>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
          role="presentation"
          aria-hidden="true"
        />
      )}
    </>
  );
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  badge,
}) => {
  return (
    <a
      href="#"
      className={`flex flex-col items-center text-xs px-2 py-4 rounded 
         text-white`}
      aria-current={active ? "page" : undefined}
    >
      <div className="relative">
        {icon}
        {badge && (
          <span
            className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"
            aria-label={`${badge} notifications`}
          >
            {badge}
          </span>
        )}
      </div>
      <span className="mt-1 whitespace-nowrap">{label}</span>
    </a>
  );
};

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  icon,
  label,
  active = false,
  badge,
  onClick,
}) => {
  return (
    <a
      href="#"
      className={`flex items-center px-4 py-3 text-base hover:bg-gray-50 
        ${active ? "text-black" : "text-white"}`}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      <div className="relative flex items-center">
        <span className="mr-4">{icon}</span>
        <span>{label}</span>
        {badge && (
          <span
            className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full"
            aria-label={`${badge} notifications`}
          >
            {badge}
          </span>
        )}
      </div>
    </a>
  );
};

export default NavBar;
