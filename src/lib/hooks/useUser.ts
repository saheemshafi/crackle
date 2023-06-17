import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/user";

export const useAuth = () => {
  const session = useSession();
  const status = session.status;
  const user = session.data?.user as UserProfile;
  return { status, user };
};
