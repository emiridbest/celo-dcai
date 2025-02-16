import Chat from "@/components/Chat";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen">
      <ThemeToggle />
      <Chat />
    </main>
  );
}