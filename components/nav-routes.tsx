"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const NavRoutes = () => {
  const routes = [
    { name: "My Profile", href: "/profile" },
    { name: "My Applications", href: "/applications" },
    { name: "My Jobs", href: "/jobs" },
  ];

  const pathname = usePathname();

  return (
    <>
      {routes.map((route) => {
        const isActive = pathname === route.href;

        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "my-2 transition flex items-center justify-center w-full py-6 rounded-md",
              isActive ? "bg-gray-300 font-bold" : "hover:bg-gray-100"
            )}
          >
            {route.name}
          </Link>
        );
      })}
    </>
  );
};
