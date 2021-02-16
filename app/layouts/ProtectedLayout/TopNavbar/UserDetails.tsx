import { Button } from "@chakra-ui/react";
import logout from "app/auth/mutations/logout";
import { getCurrentUserData } from "app/selectors/currentUser";
import { Link, useMutation, useRouter } from "blitz";
import React from "react";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [logoutMutation] = useMutation(logout);
  const router = useRouter();

  if (currentUser) {
    return (
      <Button
        colorScheme="red"
        size="sm"
        variant="outline"
        onClick={async () => {
          await logoutMutation();

          router.push("/auth");
        }}
      >
        Sign Out
      </Button>
    );
  } else {
    return (
      <Link href="/auth">
        <Button colorScheme="yellow" type="submit" size="sm" variant="outline">
          Sign In
        </Button>
      </Link>
    );
  }
};

export default UserDetails;
