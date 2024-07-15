"use client";
import { ProfileCardHeader } from "./profile-card-header";
import { PersonalInfoForm } from "./personal-info-form";

import { UserDetailsCarousel } from "./user-details-carousel";
import { useState } from "react";

export const PersonalInfoCard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-2xl lg:p-6 p-1">
      <div className="bg-gray-100 md:p-6 lg:m-4 m-1 rounded-xl">
        <div>
          <ProfileCardHeader
            handleClick={() => setIsEditing(true)}
            title="Personal Information"
            handleClose={() => setIsEditing(false)}
          />
        </div>
        {isEditing ? (
          <div>
            <PersonalInfoForm handleClick={() => setIsEditing(false)} />
          </div>
        ) : (
          <div className="mt-2">
            <UserDetailsCarousel />
          </div>
        )}
      </div>
    </div>
  );
};
