
import { ContentWrapper } from "./_components/content-wrapper";
import { BgFixed } from "./_components/bg-fixed";
import { Sidebar } from "./_components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-sm:flex-col relative">
      <Toaster />
      <Sidebar />
      <BgFixed />
      <ContentWrapper className="min-h-dvh z-10 px-4 sm:px-8">
          {children}
      </ContentWrapper>
    </div>
  );
}
