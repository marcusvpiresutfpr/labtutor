import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Wellcome from "@/app/wellcome";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <main>
      <Wellcome />
    </main>
  );
};

export default HomePage;
