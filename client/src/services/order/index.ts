"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createOrder = async (data: FieldValues) => {
  try {
    const token = (await cookies()).get("token")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    return response;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
