import { PersonalInfoCard } from "./_components/personal-info-card";
import { AddressCard } from "./_components/AddressCard";
import { QualificationsCard } from "./_components/QualificationsCard";

import { redirect } from "next/navigation";
import { auth } from "@/auth";

const ProfilePage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <main className="w-full min-h-screen p-4">
      <div>
        <h1 className="text-3xl font-medium">
          Welcome, <span>{session.user.name}</span>
        </h1>
        <h5>Complete your profile first to begin Applying for jobs at NSSA</h5>
      </div>
      <div>Progress Check</div>
      <div className="lg:p-8 space-y-12 w-full flex flex-col mt-3 justify-center">
        <div className="flex flex-col lg:space-y-0 space-y-12 lg:flex-row justify-center lg:justify-around">
          <div>
            <PersonalInfoCard />
          </div>

          <div>
            <AddressCard />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center">
          <QualificationsCard />
          <div />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
