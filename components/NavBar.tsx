import Link from "next/link";

import Image from "next/image";
import logo from "../public/assets/logo.png";

import Logout from "./logout";
import MobileSideNav from "./mobile-sidenav";
import { auth } from "@/auth";
import SignInButton from "./SignInButton";

export const NavBar = async () => {
  const session = await auth();
  return (
    <div className="top-0 sticky w-full h-20 bg-teal-700 flex justify-between mb-6 md:p-6 p-2 items-center">
      <div className="flex lg:hidden text-white">
        <MobileSideNav />
      </div>

      <div>
        <Link
          href={"/"}
          className="text-white font-bold text-2xl flex text-nowrap gap-2"
        >
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Nav Image"
              className="w-auto h-auto md:flex hidden"
              width={40}
              height={40}
            />
            <span className="hidden md:flex">Nssa Vacancies.</span>
            {!session && (
              <span className="flex md:hidden">Nssa Vacancies.</span>
            )}
          </div>
        </Link>
      </div>
      <div>
        <div className="flex">
          {session && (
            <div className="mr-[200px] text-white gap-6 hidden lg:flex">
              {session?.user?.role === "user" && (
                <div>
                  <Link href="/admin/dashboard">Dashboard</Link>
                </div>
              )}

              <div>
                <Link href="/profile">My Account</Link>
              </div>
              <div>
                <Link href="/applications">My Applications</Link>
              </div>
              <div>
                <Link href="/jobs">My Jobs</Link>
              </div>
            </div>
          )}

          {session && (
            <div>
              <Logout />
            </div>
          )}

          {!session && (
            <div className="hidden md:flex">
              <SignInButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
