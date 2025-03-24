// pages/index.js or the relevant page where you want to use the swiper

import DreamSwiper from "@/app/_components/Swiper";
import { auth } from "./_lib/auth";

export default async function Page() {
  const session = await auth();
  const user = session?.user || null;
  return (
    <main className="bg-[#F3F4F6]">
      <DreamSwiper user={user} />
    </main>
  );
}
