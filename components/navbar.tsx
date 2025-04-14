"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  const isActive = (link: string) => pathname === link;

  return (
    <HeroUINavbar shouldHideOnScroll className="bg-white shadow-lg">
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-2">
          <NextLink className="font-bold text-xl text-primary" href="/">
            MemeBook
          </NextLink>
        </NavbarBrand>

        <NavbarItem className="hidden sm:flex space-x-6">
          <NextLink
            className={`${
              isActive("/") ? "text-primary font-semibold" : "text-gray-700"
            } hover:text-primary transition-all duration-300`}
            href="/"
          >
            Table View
          </NextLink>
          <NextLink
            className={`${
              isActive("/list-view")
                ? "text-primary font-semibold"
                : "text-gray-700"
            } hover:text-primary transition-all duration-300`}
            href="/list-view"
          >
            List View
          </NextLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            as={NextLink}
            className={`${
              isActive("/") ? "text-primary font-semibold" : "text-gray-700"
            } hover:text-primary transition-all duration-300`}
            href="/"
          >
            Table View
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            as={NextLink}
            className={`${
              isActive("/list-view")
                ? "text-primary font-semibold"
                : "text-gray-700"
            } hover:text-primary transition-all duration-300`}
            href="/list-view"
          >
            List View
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
