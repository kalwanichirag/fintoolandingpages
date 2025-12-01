"use server";

import { userManagementEndpoints } from "../config/endpoints";

export const generateLead = async (payload) => {
  try {
    const response = await fetch(userManagementEndpoints.GENERATE_LEAD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    return await response.json();
  } catch (error) {
        console.error(" SERVER ACTION ERROR:", error);
    throw error;

  }
};
