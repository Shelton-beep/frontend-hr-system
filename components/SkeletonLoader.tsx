import { Skeleton } from "./ui/skeleton";

export const SkeletonLoader = () => {
  return (
    <div className="flex flex-col space-y-3 bg-white p-6">
      <Skeleton className="h-[50px] w-full bg-gray-300 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 bg-gray-300 w-[250px]" />
        <Skeleton className="h-[50px] w-full bg-gray-300 rounded-xl" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 bg-gray-300 w-[250px]" />
        <Skeleton className="h-4 bg-gray-300 w-[250px]" />
      </div>
    </div>
  );
};
