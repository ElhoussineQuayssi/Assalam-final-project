import "./globals.css";

export const metadata = {
  title: "Fondation Assalam",
  description: "Fondation Assalam - Pour un avenir meilleur",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {metadata.generator && <meta name="generator" content={metadata.generator} />}
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
