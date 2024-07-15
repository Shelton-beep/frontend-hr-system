import { UserDetails } from "./user-details";

export const UserDetailsCarousel = () => {
  return (
    <div className="flex w-full gap-3 flex-col md:flex-row m-4 md:m-0">
      <div className="w-[50%] justify-items-start space-y-2">
        <UserDetails title="Religion" content="Christianity" />
        <UserDetails title="Gender" content="Male" />
      </div>
      <div className="w-[50%] justify-items-end space-y-2">
        <UserDetails title="Religion" content="Christianity" />
        <UserDetails title="Gender" content="Male" />
      </div>
    </div>
  );
};
