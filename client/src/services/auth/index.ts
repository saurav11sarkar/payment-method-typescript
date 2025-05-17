"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const register = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/create-user`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const login = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("token", result.data.token);
    }
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getUser = async () => {
  const accessToken = (await cookies()).get("token")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  try {
    (await cookies()).delete("token");
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getUserDetails = async (id: string) => {
  try {
    const accessToken = (await cookies()).get("token")?.value;
    if (!accessToken) throw new Error("No access token found");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ["user"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
