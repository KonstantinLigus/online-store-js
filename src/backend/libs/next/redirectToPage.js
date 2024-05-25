import { redirect } from "next/navigation";

export function redirectToPage(path, config) {
  redirect(path, config);
}
