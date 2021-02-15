import getCurrentUser from "app/users/queries/getCurrentUser";
import { useQuery } from "blitz";

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null, {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  });

  return user;
};
