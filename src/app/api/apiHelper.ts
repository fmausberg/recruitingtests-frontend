import { useRouter } from "next/navigation";
import { useAuth } from "./auth/authContext";

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const jwttoken = localStorage.getItem('jwttoken');
  const username = localStorage.getItem('username');

  if (!jwttoken || !username) {
    throw new Error('User is not authenticated');
  }

  const authObject = {
    name: username,
    jwttoken: jwttoken,
  };

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': `Bearer ${jwttoken}`,
  };

  const body = JSON.stringify({
    ...JSON.parse(options.body as string || '{}'),
    Authentication: authObject,
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      body: options.body ? body : undefined,
    });

    // Check if the response contains the JWT expiration error
    const data = await response.clone().json();

    if (data.error && data.error === "JWT token has expired. Please login again.") {
      const { logout } = useAuth();
      logout();
      const router = useRouter();
      router.push("/login");
      throw new Error("JWT token expired");
    }

    return response; // Return the Response object
  } catch (error) {
    console.error('Error in API call:', error);
    throw new Error('API call failed');
  }
};