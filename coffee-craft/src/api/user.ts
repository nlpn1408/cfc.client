export const registerUser = async (
  data: RegisterRequest
): Promise<AuthResponse | null> => {
  try {
    const response = await baseApi.post<AuthResponse, RegisterRequest>(
      "/api/auth/register",
      data
    );

    // Kiểm tra nếu status không phải 201
    if (response.status !== 201) {
      console.error("Lỗi khi đăng ký:", response.data.message);
      return null;
    }

    return response.data; // Trả về accessToken và role (nếu cần)
  } catch (error) {
    console.error("Lỗi khi gọi API đăng ký", error);
    return null;
  }
};
