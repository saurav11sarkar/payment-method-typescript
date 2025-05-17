"use client";

import { useUser } from "@/contexts/UserContexts";
import { getUserDetails, logout } from "@/services/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/types";

const Navbar = () => {
  const pathname = usePathname();
  const { user, setUser, setLoading } = useUser();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    router.push("/login");
    router.refresh();
    setLoading(false);
  };
  
  useEffect(() => {
    const fetchDetails = async () => {
      if (user?.id) {
        const res = await getUserDetails(user.id);
        if (res.success) {
          setUserDetails(res.data);
        }
      }
    };
    fetchDetails();
  }, [user]);

  console.log(userDetails);
  return (
    <div className="bg-green-100 p-4 fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="container mx-auto ">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/">
              <h2 className="text-green-500 text-2xl font-bold">Payment</h2>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "text-green-500 text-md font-bold"
                  : "text-gray-800 text-md font-bold"
              }`}
            >
              Home
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user?.image || userDetails?.image} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) as string}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className={`${
                  pathname === "/login"
                    ? "text-green-500 text-md font-bold"
                    : "text-gray-800 text-md font-bold"
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
