import { Footer } from "./_components/footer/footer";
import { Navbar } from "./_components/navbar/navbar";



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
