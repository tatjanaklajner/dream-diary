import { ToastContainer } from "react-toastify";
import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@/app/_styles/toasts.css";

export const metadata = {
  title: {
    template: "%s / Dream Diary",
    default: "Dream Diary - Your Personal Dream Journal",
  },
  description:
    "A digital diary to record and reflect on your dreams. Capture your dream stories and emotions, and revisit them anytime.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f9fafb] text-[#333333] font-inter antialiased">
        <Header />

        <div className="container mx-auto px-4 py-12">
          <section className="space-y-8">{children}</section>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
          progressClassName="custom-toast-progress"
        />
      </body>
    </html>
  );
}
