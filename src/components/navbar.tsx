import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
return (
  <div className="w-full h-20 bg-white text-black flex items-center justify-between px-6 shadow-md font-sans">
    {/* Logo */}
    <a href="/" className="flex items-center">
      <Image
        src="https://www.underconsideration.com/brandnew/archives/skillshare_logo.png"
        alt="Skillshare Logo"
        width={120} // Adjust size as needed
        height={40}
        className="object-contain"
      />
    </a>

    {/* Search Bar */}
    <div className="flex items-center gap-x-2 w-1/3">
      <Input
        type="text"
        placeholder="Search..."
        className="border rounded-md px-4 py-2 w-full"
      />
    </div>

    {/* Navigation Options */}
    <div className="flex items-center gap-x-4 text-lg">
      <div className="cursor-pointer">Teacher Mode</div>
      <div className="flex gap-x-3">
        <a href='/signin'>
          <Button variant="outline">Sign In</Button>
        </a>
        <a href="/signup">
          <Button>Sign Up</Button>
        </a>
      </div>
    </div>
  </div>
);
}
