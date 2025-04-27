// src/pages/api/my-orders.ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies["access_token"];

  if (!token) return res.status(401).json({ message: "No token found" });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/myorders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching orders" });
  }
}
