import { useQuery } from "@tanstack/react-query";
import { fetchPresence } from "../queries";

export const usePresence = () => {
  const { data, isLoading } = useQuery(["presence"], () => fetchPresence(), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: true,
  });
  return { presence: data, isPresenceLoading: isLoading };
};
