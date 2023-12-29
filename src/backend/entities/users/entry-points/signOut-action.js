"use server";

import { deleteCookie, redirectToPage } from "@/backend/libs/next";

export async function signOutAction() {
  deleteCookie("token");
  redirectToPage("/login");
}
