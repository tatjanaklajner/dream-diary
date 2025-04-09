import MessageDetails from "@/app/_components/MessageDetails";
import { getMessage, getMessages, getUserById } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";

async function page({ params }) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }
  const { messageId } = await params;
  const role = session.user.role;
  const userId = session.user.userId;
  const message = await getMessage(messageId);
  const user = await getUserById(message.user_id);
  return (
    <div>
      <MessageDetails userRole={role} message={message} user={user} />
    </div>
  );
}

export default page;
