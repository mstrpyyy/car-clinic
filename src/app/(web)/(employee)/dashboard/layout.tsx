
import { ContentWrapper } from "./_components/content-wrapper";
import { Sidebar } from "./_components/sidebar/sidebar";
import { BgFixed } from "./_components/bg-fixed";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-sm:flex-col relative">
      <Sidebar />
      <BgFixed />
      <ContentWrapper className="min-h-dvh z-10 px-4 sm:px-8">
          {children}
      </ContentWrapper>
    </div>
  );
}
