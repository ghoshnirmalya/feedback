import getCurrentUser from "app/users/queries/getCurrentUser";
import { useQuery } from "blitz";

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null, {
    staleTime: 18_00_000, // Refetch user details after every 30 minutes
  });

  return user;
};
