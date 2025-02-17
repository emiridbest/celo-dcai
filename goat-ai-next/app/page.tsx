import Chat from "@/components/Chat";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div>
    <Header />
    <main className="bg-white dark:bg-gray-900 min-h-screen mt-12">
      <ThemeToggle />
      <Chat />
    </main>
    </div>
  );
}