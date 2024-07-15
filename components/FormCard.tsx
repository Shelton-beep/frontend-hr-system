import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  content: React.ReactNode;
  footer: string;
  href: string;
  buttonText: string;
}

const FormCard = ({
  title,
  description,
  content,
  footer,
  href,
  buttonText,
}: Props) => {
  return (
    <>
      <div className="flex justify-center">
        <Card className="md:w-[500px] py-6">
          <CardHeader className="justify-center mx-auto items-center">
            <CardTitle className="text-4xl font-bold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>{content}</CardContent>

          <CardFooter>
            <p className="mx-auto flex justify-center">
              {footer}
              <span>
                <Link
                  href={href}
                  className="hover:underline hover:text-teal-700 ml-2"
                >
                  {buttonText}
                </Link>
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default FormCard;
