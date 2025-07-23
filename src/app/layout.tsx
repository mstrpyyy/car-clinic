import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/authProvider";
// import { ReactScan } from "@/components/react-scan";

export const metadata: Metadata = {
  title: {
    default: "Car Clinic",
    template: "%s - Car Clinic",
  },
  description:
    "Car Clinic is your trusted neighborhood auto repair shop, providing reliable and affordable vehicle maintenance and repair services for everyday drivers. From oil changes to engine diagnostics, we keep your car running smoothly and safely.",
  applicationName: "Car Repair Shop",
  openGraph: {
    title: "Car Clinic",
    description:
      "Car Clinic offers honest, expert auto repair for everyday drivers. We specialize in general maintenance, diagnostics, and fast, friendly service to keep your car in top condition.",
    url: "https://carclinic.example.com", // replace with your actual URL or localhost if needed
    siteName: "Car Clinic",
    images: [
      {
        url: "https://images.pexels.com/photos/10126659/pexels-photo-10126659.jpeg", 
        width: 640,
        height: 427,
        alt: "Car Clinic Auto Repair - Trusted Service for Everyday Drivers",
      },
    ],
    type: "website",
    locale: "id_ID",
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        {/* <ReactScan /> */}
          <body className={`font-jakarta`}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
      </html>
    </AuthProvider>
  );
}
