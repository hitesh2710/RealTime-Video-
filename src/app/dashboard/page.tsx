import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const auth = await onAuthenticateUser();

  // If authentication failed → redirect to login
  if (!auth?.user || auth.status >= 400) {
    redirect("/auth/sign-in");
  }

  const workspaces = auth.user.workspace || [];

  // If user has no workspaces → redirect to login
  if (!workspaces.length) {
    redirect("/auth/sign-in");
  }

  // Safe redirect to workspace
  const workspaceId = workspaces[0].id;
  redirect(`/dashboard/${workspaceId}`);
}
