import { Footer } from "./_components/footer/landingpage--footer";
import { Navbar } from "./_components/navbar/landingpage-navbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
