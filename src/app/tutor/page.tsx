import { useSession, signIn, signOut } from "next-auth/react";

const TutorPage = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    console.log("session.user", session?.user);
  }

  return (
    <main>
      <h1>Tutor Page</h1>
      {session && session.user ? (
        <p>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </p>
      ) : (
        <button onClick={() => signIn()}>SignIn</button>
      )}
    </main>
  );
};

export default TutorPage;
