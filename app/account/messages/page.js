import { auth } from "@/app/_lib/auth";
import ClientMessages from "@/app/_components/ClientMessages";

export const metadata = {
  title: "Patterns",
};

export default async function Page() {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  return <ClientMessages session={session} />;
}
