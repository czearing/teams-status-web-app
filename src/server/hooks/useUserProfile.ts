import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../queries";

export const useUserProfile = () => {
  const { data, isLoading } = useQuery(
    ["user-profile"],
    () => fetchUserProfile(),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: true,
    }
  );
  return { userProfile: data, isUserProfileLoading: isLoading };
};
