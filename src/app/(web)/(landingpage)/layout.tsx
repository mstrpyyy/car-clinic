import { Footer } from "./_components/footer/Footer";
import { Navbar } from "./_components/navbar/Navbar";



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
