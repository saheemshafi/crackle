import { TMDBAuthResponse, UserCredentials } from "@/types/user";
import endpoints from "@/lib/constants/endpoints.json";

export const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_BEARER}`,
    "content-type": "application/json",
    accept: "application/json",
  },
  body: undefined,
  createOptions(method: "GET" | "POST" | "PUT" | "DELETE", body: string) {
    return { ...this, body, method };
  },
};

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
    const loginRequest = await fetch(
      endpoints.auth.login,
      options.createOptions(
        "POST",
        JSON.stringify({
          username: user.username,
          password: user.password,
          request_token: tokenData.request_token,
        })
      )
    );
    const loginSession: TMDBAuthResponse = await loginRequest.json();
    if (typeof loginSession.request_token == "undefined") return null;
    const sessionIdRequest = await fetch(
      endpoints.auth.createSession,
      options.createOptions(
        "POST",
        JSON.stringify({ request_token: loginSession.request_token })
      )
    );
    const sessionData: TMDBAuthResponse = await sessionIdRequest.json();
    if (typeof sessionData.session_id == "undefined") return null;
    return sessionData.session_id;
  } catch (error) {
    console.log(error);
  }
  return null;
};
