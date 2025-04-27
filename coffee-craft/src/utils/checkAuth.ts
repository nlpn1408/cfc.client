const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const checkAuth = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) return null;

    const user = await res.json();
    return user;
  } catch (err) {
    return null;
  }
};
