"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Home,
  Users,
  MessageCircle,
  Bell,
  User,
  Menu,
  X,
  Settings,
  LogOut,
  LucideIcon,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path?: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
  showDropdown?: boolean;
}

interface MobileNavItemProps extends NavItemProps {
  onClick?: () => void;
}

type IconType = LucideIcon;

interface NavLink {
  icon: IconType;
  label: string;
  path?: string;
  badge?: string;
  active?: boolean;
}

const NavBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showMeDropdown, setShowMeDropdown] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem("user") || "0");

  const navLinks: NavLink[] = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "My Network", path: "/#" },
    { icon: MessageCircle, label: "Messaging", path: "/#" },
    { icon: Bell, label: "Notifications", badge: "3", path: "/#" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showMeDropdown && !target.closest(".profile-dropdown")) {
        setShowMeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMeDropdown]);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const toggleMeDropdown = (): void => {
    setShowMeDropdown(!showMeDropdown);
  };

  return (
    <>
      <nav className="px-6 py-5 fixed w-full top-0 z-50 bg-gray-900">
        <div className="flex items-center w-[95%] mx-auto justify-between h-14">
          <div className="flex items-center flex-1">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Travel<span className="text-green-500">Guide</span>
            </Link>

            <div className="hidden sm:block ml-4 flex-1 max-w-80">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
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

            <button
              type="button"
              className="sm:hidden ml-4 p-2 text-white hover:text-white"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavItem
                key={link.label}
                icon={<link.icon className="w-6 h-6" />}
                label={link.label}
                path={link.path}
                active={link.active}
                badge={link.badge}
              />
            ))}
            <div className="profile-dropdown relative">
              <NavItem
                icon={
                  user && user.profilePicture !== null ? (
                    <img
                      src={user.profilePicture}
                      className="w-6 h-6 rounded-full"
                      alt="profile"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )
                }
                label={
                  user
                    ? `${user?.name?.firstName} ${user?.name?.lastName}`
                    : "Log In"
                }
                onClick={toggleMeDropdown}
                showDropdown={showMeDropdown}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-white hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden fixed inset-0 top-14 bg-gray-900 z-40">
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <MobileNavItem
                  key={link.label}
                  icon={<link.icon className="w-6 h-6" />}
                  label={link.label}
                  path={link.path}
                  active={link.active}
                  badge={link.badge}
                />
              ))}
              <MobileNavItem
                icon={<User className="w-6 h-6" />}
                label="Log In"
                path="/login"
              />
            </div>
          </div>
        )}
      </nav>

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
  path = "#",
  active = false,
  badge,
  onClick,
  showDropdown,
}) => {
  const isLoginOrProfile = label === "Log In" || label.includes(" ");
  const user = JSON.parse(localStorage.getItem("user") || "0");

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="relative">
      {isLoginOrProfile ? (
        <div
          onClick={handleClick}
          className="flex flex-col items-center text-xs px-2 py-4 rounded text-white hover:text-blue-400 cursor-pointer"
        >
          <div className="relative">{icon}</div>
          <span className="mt-1 whitespace-nowrap">{label}</span>
        </div>
      ) : (
        <Link
          href={path}
          className="flex flex-col items-center text-xs px-2 py-4 rounded text-white hover:text-blue-400"
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
        </Link>
      )}

      {showDropdown && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            href={user ? "/profile" : "/login"}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="inline-block w-4 h-4 mr-2" />
            Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="inline-block w-4 h-4 mr-2" />
            Settings
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="inline-block w-4 h-4 mr-2" />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="inline-block w-4 h-4 mr-2" />
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

const MobileNavItem: React.FC<MobileNavItemProps> = ({
  icon,
  label,
  path = "#",
  active = false,
  badge,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={path}
      className={`flex items-center px-4 py-3 text-base hover:bg-gray-800 ${
        active ? "text-blue-400" : "text-white"
      }`}
      onClick={handleClick}
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
    </Link>
  );
};

export default NavBar;
