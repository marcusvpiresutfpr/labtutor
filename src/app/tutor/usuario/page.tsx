import ArticlesTable from "./table";
import Navbar from "@/components/navbar";
import User from "./user";

import { getServerSession } from "@/lib/auth";
import { getUserArticles } from "@/lib/db";

const UserDashPage = async () => {
  const user = await getServerSession();
  if (user) {
    const articles = await getUserArticles(user.id);
    return (
      <div>
        <Navbar />
        <main className="h-screen w-screen flex items-center">
          <User user={user} />
          <ArticlesTable articles={articles} />
        </main>
      </div>
    );
  }
};

export default UserDashPage;
