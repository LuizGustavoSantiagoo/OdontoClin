import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import { getUserData } from "./_data-acess/get-info-user";

export default async function Profile() {

  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const user = await getUserData({userId: session.user?.id})

  if (!user) {
    redirect("/");
  }

  return (
    <section>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your Profile</p>
      </div>
    </section>
  );
}