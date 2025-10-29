import "./globals.css";
import ClientWrapper from "./ClientWrapper";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Fondation Assalam",
  description: "Fondation Assalam - Pour un avenir meilleur",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    // FIX: Set language to French for semantic correctness
    <html lang="fr">
      <body className="font-sans">
        <ClientWrapper>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ClientWrapper>
      </body>
    </html>
  );
}
