import {
  Geist,
  Geist_Mono,
  Montserrat,
  Bebas_Neue,
  Roboto,
} from "next/font/google";
import "../../app/globals.css";
import NavbarTop from "../components/navbar/navbar-top";
import FooterSection from "../components/footer/footer";
import CustomSessionProvider from "../components/providers/session-provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "BDG CLUB DE PADEL",
  description: "Bandung Club De Padel",
};

export default function GuestLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${bebasNeue.variable} ${roboto.variable} antialiased`}
      >
        <CustomSessionProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: "#5CB338",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#d81012",
                  color: "#fff",
                },
              },
            }}
          />
          <NavbarTop />
          {children}
          <FooterSection id="footer-section" />
        </CustomSessionProvider>
      </body>
    </html>
  );
}
