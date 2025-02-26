import { useRouter } from "next/navigation";
import { useAuth } from "./auth/authContext";

export const authenticatedFetch = async (url, options = {}) => {
  const router = useRouter();
  console.log("AF C1");

  // Get JWT from localStorage
  const jwttoken = localStorage.getItem('jwttoken');
  
  if (!jwttoken) {
    throw new Error('User is not authenticated');
  }

  // Create headers, ensuring Authorization is set with Bearer token
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': `Bearer ${jwttoken}`,
  };

  // Prepare the body (if it exists) while ensuring it's properly handled
  let body;
  if (options.body) {
    body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      body,  // Pass the body (or undefined if none)
    });

    const data = await response.json();

    // Check for JWT expiration error
    if (data.error && data.error === "JWT token has expired. Please login again.") {
      const { logout } = useAuth();
      logout();
      router.push("/login");
      return { error: "JWT token expired" };
    }

    // Return the response data for successful requests
    return data;
  } catch (error) {
    console.error('Error in API call:', error);
    throw new Error('API call failed');
  }
};
