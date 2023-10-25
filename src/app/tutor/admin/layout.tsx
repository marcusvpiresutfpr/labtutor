import { get_user } from "@/lib/user";
import { redirect } from "next/navigation";

const AdminPages = async (props: { children: React.ReactNode }) => {
  const user = await get_user();
  if (Number(user?.role) < 30) redirect("/login");

  return <>{props.children}</>;
};

export default AdminPages;