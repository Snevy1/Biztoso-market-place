import React, { useContext } from "react";
import ProfileForm from "../components/profile/ProfileForm";

function ProfilePage() {

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Profile Page
      </h1>
      <ProfileForm  />
    </div>
  );
}

export default React.memo(ProfilePage);