import "../globals.css";
import { Layout } from "components/unified";

export const metadata = {
  title: "Fondation Assalam",
  description: "Fondation Assalam - Pour un avenir meilleur",
  generator: "v0.dev",
};

export default function ProjectsLayout({ children }) {
  return <Layout metadata={metadata}>{children}</Layout>;
}
