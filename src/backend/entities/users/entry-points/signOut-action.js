"use server";

import { deleteCookie, redirectToPage } from "@/backend/libs/next";

export async function signOutAction() {
  await deleteCookie("token");
  redirectToPage("/login");
}
