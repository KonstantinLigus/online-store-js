import { redirect } from "next/navigation";

export function redirectToPage(path) {
  redirect(path);
}
