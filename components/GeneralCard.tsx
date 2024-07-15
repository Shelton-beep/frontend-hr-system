import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import logo from "../public/assets/logo.png";
import { ImLocation2 } from "react-icons/im";
import { LiaIndustrySolid } from "react-icons/lia";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: string;
  jobLocation?: string;
  jobType?: string;
  iconPresent: boolean;
}

const GeneralCard = ({
  title,
  description,
  children,
  jobLocation,
  jobType,
  iconPresent,
  footer,
}: Props) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="md:w-full w-fit">
        <CardHeader className="mx-auto justify-between items-center">
          <CardTitle className="text-4xl font-bold flex gap-2 justify-between items-center w-full">
            <div>
              <Image
                src={logo}
                alt="Nssa Logo"
                width={100}
                height={100}
                className="text-center md:block hidden"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg md:text-2xl font-bold">{title}</span>
              {iconPresent && (
                <span className="space-y-3">
                  <div className="flex gap-3 flex-row">
                    <div className="flex gap-2 md:p-2 items-center justify-start">
                      <ImLocation2 className="text-green-700 w-4 h-4" />
                      <CardDescription>{jobLocation}</CardDescription>
                    </div>
                    <div className="flex gap-2 md:p-2 p-1 items-center justify-start">
                      <LiaIndustrySolid
                        className={cn(
                          `text-green-700 w-4 h-4`,
                          jobType === "Permanent" &&
                            "text-blue-700 flex items-center justify-center"
                        )}
                      />
                      <CardDescription
                        className={cn(
                          ` bg-green-200 px-3 text-green-800 rounded-md`,
                          jobType === "Permanent" && "bg-blue-200 text-blue-800"
                        )}
                      >
                        {jobType}
                      </CardDescription>
                    </div>
                  </div>
                </span>
              )}
            </div>
            <div>
              <Image
                src={logo}
                alt="Nssa Logo"
                width={100}
                height={100}
                className="text-center md:block hidden"
              />
            </div>
          </CardTitle>
          <CardDescription className="z-0 text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <p>{footer}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GeneralCard;
