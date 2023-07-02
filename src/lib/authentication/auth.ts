import { TMDBAuthResponse, UserCredentials } from "@/types/user";
import endpoints from "@/lib/constants/endpoints.json";
import { options } from "../api/options";

export const getSessionId = async (
  user: UserCredentials
): Promise<string | null> => {

  try {
    
    const tokenRequest = await fetch(
      endpoints.auth.createRequestToken,
      options
    );
    const tokenData: TMDBAuthResponse = await tokenRequest.json();

    if (typeof tokenData.request_token == "undefined") {
      return null;
    }

    const loginRequest = await fetch(endpoints.auth.login, {
      ...options,
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        request_token: tokenData.request_token,
      }),
    });

    const loginSession: TMDBAuthResponse = await loginRequest.json();
    if (typeof loginSession.request_token == "undefined") return null;

    const sessionIdRequest = await fetch(endpoints.auth.createSession, {
      ...options,
      method: "POST",
      body: JSON.stringify({ request_token: loginSession.request_token }),
    });
    
    const sessionData: TMDBAuthResponse = await sessionIdRequest.json();
    if (typeof sessionData.session_id == "undefined") return null;
    return sessionData.session_id;
  } catch (error) {
    console.log(error);
  }
  return null;
};
