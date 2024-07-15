import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const WhyNssaItem = ({ icon, title, description }: Props) => {
  return (
    <div className="md:mx-2 md:my-0 my-2 items-center">
      <Card className="flex flex-col">
        <div className="flex-grow">
          <div className="m-4 p-2">{icon}</div>
        </div>
        <CardHeader className="flex-grow">
          <CardTitle className="font-bold text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
