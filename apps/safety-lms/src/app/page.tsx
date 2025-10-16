import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to login page since this is an authenticated-only LMS
  redirect("/auth/login");
}
