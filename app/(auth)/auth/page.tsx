import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/get-user";
import { LoginForm } from "./auth-form";

export default async function LoginPage() {
    const user = await getCurrentUser();

    if (user) {
        redirect("/");
    }

    return <LoginForm />;
}