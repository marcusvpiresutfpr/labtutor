import LoginButton from "@/components/buttons/login-button";

export default async function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div className="[&:not(:first-child)]:mt-4">
        <LoginButton />
      </div>
    </div>
  );
}
