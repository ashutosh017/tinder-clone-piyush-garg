import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserByID, getUsersWithNoConnection } from "./neo4j.action";
import HomepageClientComponent from "./components/Home";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  if (!(await isAuthenticated) || !user) {
    return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback")
  }
  const usersWithNoConnection = await getUsersWithNoConnection(user.id);
  const currentUser = await getUserByID(user.id);


  return (
    <div>
      {currentUser && <HomepageClientComponent currentUser={currentUser} users={usersWithNoConnection} />}

    </div>
  );
}
