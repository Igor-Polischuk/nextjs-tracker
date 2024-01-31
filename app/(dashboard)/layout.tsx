import Navigation from "@/components/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <nav className="backdrop-blur-sm">
        <Navigation />
      </nav>
    </>
  );
}
