"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGetMe, useLogoutUser } from "@/hooks/auth.hook";
import { toast } from "sonner";
import { useState } from "react";
import { LayoutDashboard, LogOut, Menu, User, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: userResponse, isLoading } = useGetMe();
  const { mutate: logoutUser } = useLogoutUser();
  const queryClient = useQueryClient();

  const user = userResponse?.data;

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        toast.success("Logged out successfully");
        setIsProfileOpen(false);
        setIsMenuOpen(false);
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to log out");
      },
    });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Public Complaints", href: "/public-requests" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const getDashboardPath = () => {
    if (!user) return "/dashboard";
    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") return "/admin";
    if (user?.role === "STAFF") return "/staff";
    return "/dashboard";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 flex justify-center backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Image
            src="/logo.jpg"
            alt="City Service Portal"
            width={38}
            height={38}
            className="rounded-md object-cover"
          />
          <span className="text-green-600 font-extrabold hidden sm:inline-block">
            City Service
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm  font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop User Profile Menu */}
        <div className="hidden md:flex items-center gap-2">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-muted focus:outline-none transition-colors"
              >
                {user.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* Profile dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-background p-2 shadow-lg z-50">
                  <div className="px-3 py-2 border-b mb-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-600 pb-2 border-b-12">
                      <User className="size-4" /> <span>{user.name}</span>
                    </div>
                    <p className="text-xs  text-blue-400 truncate py-2">
                      {user.email}
                    </p>
                    <p className="text-xs font-bold text-orange-400 uppercase truncate">
                      {user.role}
                    </p>
                  </div>

                  <Link
                    href={getDashboardPath()}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 text-muted-foreground focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b bg-background px-4 pt-2 pb-4 mt-10 w-2xs space-y-3">
          {user && (
            <div className="flex items-center justify-end gap-3 p-2 border-b pb-3">
              <div className="flex flex-col   text-right">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <User className="size-4" /> <span>{user.name}</span>
                </div>
                <span className="text-xs text-blue-500">{user.email}</span>
                <span className="font-bold text-[10px] text-orange-500 uppercase">
                  {user.role}
                </span>
              </div>
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base border">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-sm font-medium py-1.5 text-muted-foreground hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2 border-t flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href={getDashboardPath()}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <LayoutDashboard className="size-4" /> Dashboard
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="size-4" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
