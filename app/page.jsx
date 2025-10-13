import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlogs } from "lib/actions";
import {
  Layout,
  HeroSection,
  SectionHeader,
  ContentCard,
  ContentGrid,
  TestimonialCard,
  CTASection,
  Container,
  Button,
} from "components/unified";

export default async function Home() {
  const projects = [
    {
      title: "Rayhana assalam",
      excerpt: "Programme de soutien pour les femmes en difficulté.",
      image: "/projects/rayhana.jpg",
      link: "/projects/rayhanat-assalam",
    },
    {
      title: "Kafala",
      excerpt: "Programme de parrainage pour les orphelins.",
      image: "/projects/kafala.jpg",
      link: "/projects/kafala",
    },
    {
      title: "Imtiaz",
      excerpt:
        "Parrainage des étudiants brillants issus de milieux défavorisés.",
      image: "/projects/imtiaz.jpg",
      link: "/projects/projet-imtiaz",
    },
    {
      title: "Fataer Al Baraka",
      excerpt: "Centre de formation en pâtisserie marocaine pour femmes.",
      image: "/projects/fataer.jpg",
      link: "/projects/fataer-al-baraka",
    },
    {
      title: "Centre Himaya",
      excerpt: "Centre pluridisciplinaire de soutien aux femmes et enfants.",
      image: "/projects/center.jpg",
      link: "/projects/centre-himaya",
    },
    {
      title: "Nadi Assalam",
      excerpt: "Un avenir cousu d'espoir.",
      image: "/projects/nadi.jpg",
      link: "/projects/nadi-assalam",
    },
  ];

  // Fetch blogs from the database
  const result = await getBlogs();
  const blogs = result.success ? result.data.slice(0, 3) : [];

  return (
    <Layout>
      <div className="mx-auto px-4 w-full">
        {/* Hero Section */}
        <HeroSection
          title={
            <>
              <span className="text-white">Assalam</span> - Ensemble pour un
              avenir meilleur
            </>
          }
          subtitle="Une fondation marocaine dédiée à l'amélioration des conditions de vie, à l'éducation et au développement durable au Maroc."
          actions={[
            {
              text: "Nos Projets",
              href: "/projects",
              variant: "outlineLight",
            },
            {
              text: "Faire un Don",
              href: "/contact",
              variant: "secondary",
            },
          ]}
        />

        {/* Projects Section */}
        <section className="py-16">
          <Container>
            <SectionHeader
              title="Nos Projets Principaux"
              subtitle="Découvrez nos initiatives principales qui transforment des vies à travers le Maroc"
            />

            <ContentGrid
              items={projects}
              columns={{ default: 1, md: 2, lg: 3 }}
              renderItem={(project, index) => (
                <ContentCard
                  key={index}
                  title={project.title}
                  excerpt={project.excerpt}
                  image={project.image}
                  link={project.link}
                  variant="default"
                />
              )}
            />

            <div className="text-center mt-8">
              <Button href="/projects" variant="primary">
                Voir tous les projets
              </Button>
            </div>
          </Container>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-ui-bg">
          <Container>
            <SectionHeader
              title="Actualités & Blog"
              subtitle="Restez informé de nos dernières activités et nouvelles"
            />

            <ContentGrid
              items={blogs}
              columns={{ default: 1, md: 2, lg: 3 }}
              renderItem={(blog) => (
                <ContentCard
                  key={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  image={blog.image}
                  link={`/blogs/${blog.slug}`}
                  category={blog.category}
                  date={blog.createdAt}
                  variant="blog"
                />
              )}
            />

            <div className="text-center mt-8">
              <Button href="/blogs" variant="primary">
                Voir tous les articles
              </Button>
            </div>
          </Container>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <Container>
            <SectionHeader
              title="Témoignages"
              subtitle="Ce que disent les personnes que nous avons aidées"
            />

            <ContentGrid
              items={[
                {
                  name: "Amina El Mansouri",
                  role: "Bénéficiaire du projet Rayhana",
                  image: "/testimonials/person1.jpg",
                  quote:
                    "Grâce au projet Rayhana, j'ai pu retrouver ma dignité et subvenir aux besoins de mes enfants. Je suis infiniment reconnaissante pour cette opportunité.",
                },
                {
                  name: "Karim Benali",
                  role: "Bénéficiaire du projet Imtiaz",
                  image: "/testimonials/person2.jpg",
                  quote:
                    "Grâce au projet Imtiaz, j'ai pu retrouver ma dignité.",
                },
              ]}
              columns={{ default: 1, md: 2 }}
              renderItem={(testimonial) => (
                <TestimonialCard
                  key={testimonial.name}
                  name={testimonial.name}
                  role={testimonial.role}
                  image={testimonial.image}
                  quote={testimonial.quote}
                />
              )}
            />
          </Container>
        </section>

        {/* CTA Section */}
        <CTASection
          title="Rejoignez notre mission"
          className="h-full "
          subtitle="Ensemble, nous pouvons transformer des vies et bâtir un avenir meilleur. Soutenez nos projets en faisant un don ou en devenant bénévole."
          actions={[
            {
              text: "Faire un Don",
              href: "/contact?type=donation",
              variant: "outlineLight",
            },
            {
              text: "Devenir Bénévole",
              href: "/contact?type=volunteer",
              variant: "secondary",
            },
          ]}
        />
      </div>
    </Layout>
  );
}
