import { getServerSession } from "@/lib/auth";
import ErrorPage from "@/components/error";

export default async function TutorLayout(props: {
  children: React.ReactNode;
}) {
  const user = await getServerSession();
  if (user?.id) return <>{props.children}</>;

  return <ErrorPage />;
}
