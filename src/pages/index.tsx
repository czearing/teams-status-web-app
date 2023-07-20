import * as React from "react";
import { useUserProfile } from "../server";

export default function Home() {
  const { userProfile, isUserProfileLoading } = useUserProfile();

  return (
    <div>
      <div>Hello</div>
      {isUserProfileLoading ? (
        <div>Loading</div>
      ) : (
        <div>Your user profile info: {JSON.stringify(userProfile)}</div>
      )}
    </div>
  );
}
