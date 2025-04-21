import { ViewTransitions } from "next-view-transitions";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "BLA - BetterListApp",
  description: "BLA - BetterListApp",
};

export default function RootLayout({
  children,
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={quicksand.className}>
          <div className="container">{children}</div>
        </body>
      </html>
    </ViewTransitions>
  );
}
