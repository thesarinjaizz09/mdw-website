import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-user";
import { RegisterForm } from "./create-form";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return <RegisterForm />;
}