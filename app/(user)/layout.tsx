import { getCurrentUser } from "@/lib/auth/get-user";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/auth");
    }

  return (
    <div className="">{children}</div>
  )
}
