import Link from "next/link";
import Image from "next/image";
import {
  Container,
  ContentCard,
  Button,
  SectionWithBackground,
  ImageTextSection,
  ProjectHeader,
  ContentGrid,
} from "components/unified";
import { getProjects } from "lib/projects";

export default async function ProjectsPage() {
  const projectsData = await getProjects();

  const projects = projectsData.map(project => ({
    title: project.title,
    excerpt: project.excerpt,
    image: project.image || "/placeholder-project.jpg",
    link: `/projects/${project.slug}`,
  }));

  return (
    <Container className="py-16 space-y-16">
      {/* Header Section */}
      <ProjectHeader
        title="Nos Projets"
        subtitle="Découvrez nos initiatives qui transforment des vies à travers le Maroc."
      />

      {/* Main Projects Section */}
      <SectionWithBackground variant="blue">
        <ProjectHeader
          title="Nos Projets Principaux"
          subtitle=""
          size="small"
          centered={true}
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
              variant="project"
            />
          )}
        />
      </SectionWithBackground>

      {/* Community Impact Section */}
      <SectionWithBackground variant="blue">
        <ImageTextSection
          title="Impact Communautaire"
          content="Nos projets ne se limitent pas à fournir des ressources, mais visent également à renforcer les communautés locales. Grâce à des initiatives collaboratives, nous créons des opportunités durables pour les générations futures."
          imageSrc="/images/community.jpg"
          imageAlt="Community Impact"
          layout="image-left"
          titleColor="blue"
        />
      </SectionWithBackground>

      {/* Transforming Lives Section */}
      <SectionWithBackground variant="blue">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-brand-primary">
            Transformer des Vies, Construire des Avenirs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chez la Fondation Assalam pour le Développement Social Casablanca
            Anfa, nous croyons en un monde où chaque individu a accès aux
            ressources essentielles pour s'épanouir.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-brand-primary">
              Forage de Puits : L'Eau, Source de Vie
            </h3>
            <p className="text-gray-700 mb-4">
              Objectif : Briser la barrière de l'inaccessibilité à l'eau potable
              dans les zones rurales isolées.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Études géologiques approfondies pour localiser les nappes
                phréatiques.
              </li>
              <li>
                Construction de puits équipés de systèmes de pompage modernes.
              </li>
              <li>
                Formation des habitants pour assurer l'entretien et la pérennité
                des installations.
              </li>
            </ul>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold mb-4 text-brand-primary">
              Construction d'Écoles : L'Éducation, un Droit pour Tous
            </h3>
            <p className="text-gray-700 mb-4">
              Objectif : Offrir aux enfants des zones rurales un accès à une
              éducation de qualité.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Écoles primaires modernes, équipées en matériel pédagogique
                adapté.
              </li>
              <li>
                Programmes de sensibilisation pour encourager la scolarisation,
              </li>
              <li>
                en particulier des filles.
              </li>
            </ul>
          </div>
        </div>
      </SectionWithBackground>

      {/* Self-Sufficient Village Section */}
      <SectionWithBackground variant="blue">
        <ImageTextSection
          title="Un Village Autosuffisant"
          content={
            <p>
              Le premier village orange au Maroc est un modèle innovant de
              développement communautaire. Avec des infrastructures modernes et
              des centres éducatifs, ce projet vise à autonomiser les habitants
              des zones rurales.
            </p>
          }
          imageSrc="/images/village.jpg"
          imageAlt="Village Autosuffisant"
          layout="image-right"
          titleColor="blue"
        />
      </SectionWithBackground>

      {/* Call to Action Section */}
      <section className="text-center bg-brand-primary text-white p-8 rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">
          Rejoignez-Nous dans Cette Aventure Humanitaire
        </h2>
        <p className="text-lg mb-6">
          ensemble, nous pouvons transformer des vies, renforcer des communautés
          et apporter de l'espoir là où il est le plus nécessaire.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" href="/contact?type=donation">
            Faire un Don
          </Button>
          <Button variant="outlineLight" href="/contact?type=volunteer">
            Devenir Bénévole
          </Button>
        </div>
      </section>
    </Container>
  );
}
