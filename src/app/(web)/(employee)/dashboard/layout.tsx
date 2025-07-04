
import { ContentWrapper } from "./_components/wrapper";
import { Sidebar } from "./_components/sidebar/sidebar";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex relative">
      <Sidebar />
      <ContentWrapper className="min-h-dvh">
          {children}
      </ContentWrapper>
    </div>
  );
}
