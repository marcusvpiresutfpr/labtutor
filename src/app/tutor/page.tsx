import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const TutorPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <h2 className="p4">Tutor</h2>
      <pre className="p-4">{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
};

export default TutorPage;
