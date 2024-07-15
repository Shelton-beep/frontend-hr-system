import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Footer from "./Footer";
import { Separator } from "./ui/separator";
import { auth } from "@/auth";
import SignInButton from "./SignInButton";
import { NavRoutes } from "./nav-routes";

const MobileSideNav = async () => {
  const session = await auth();

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}>
          {!session && (
            <div>
              <SheetHeader>
                <SheetTitle>Welcome to NSSA Vacancy!</SheetTitle>
                <SheetDescription>
                  Create an Account with us or login if you already have one and
                  start applying for your dream job at NSSA.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <Separator />
              </div>
              <div className="mt-6">
                <SignInButton />
              </div>
            </div>
          )}

          {session && (
            <div>
              <SheetHeader>
                <SheetTitle>NSSA Vacancies</SheetTitle>
                <SheetDescription>{session.user.name}</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <Separator />
              </div>
              <div className="mt-6 flex flex-col items-center justify-center">
                <NavRoutes />
              </div>
            </div>
          )}

          <div className="bottom-0 fixed">
            <Separator />
            <Footer />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideNav;
