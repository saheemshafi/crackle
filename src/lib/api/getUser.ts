import { getServerSession } from "next-auth";
import { authOptions } from "../authentication/auth-options";

export const getAuthUser = async () => await getServerSession(authOptions);
