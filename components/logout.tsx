import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { IoLogOutOutline } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa6";
import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import { auth, signOut } from "@/auth";

const Logout = async () => {
  const session = await auth();
  return (
    <div className="text-white mr-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="gap-3 text-white items-center hover:bg-transparent"
          >
            <span>{session?.user.name}</span>
            <UserCircle />
            {/**<Image
              alt="Profile"
              className="w-auto h-auto"
              width={100}
              height={100}
              src={session?.user.image ?? ""}
            />*/}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-4">
          <Link href="/profile" className="flex items-center gap-2">
            <FaUserLock />
            My Profile
          </Link>
          <DropdownMenuSeparator />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex items-center gap-2">
              <IoLogOutOutline />
              Log out
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Logout;
