import Container from "@/components/Container/Container.jsx";
import Button from "@/components/Button/Button.jsx";
import ContentCard from "@/components/ContentCard/ContentCardAbout.jsx";
import ContentGrid from "@/components/ContentGrid/ContentGrid.jsx";
import SectionHeader from "@/components/SectionHeader/SectionHeader.jsx";

export default async function ProjectsPage() {
  const projectsData = await getProjects();

  const projects = projectsData.map((project) => ({
    title: project.title,
    excerpt: project.excerpt,
    image: project.image || "/placeholder-project.jpg",
    link: `/projects/${project.slug}`,
  }));

  return (
    <Container className="py-16 space-y-16">
      {/* Header Section */}
      <SectionHeader
        title="Nos Projets"
        subtitle="Découvrez nos initiatives qui transforment des vies à travers le Maroc."
      />

      {/* Main Projects Section */}
      <div className="bg-blue-50 py-16 rounded-xl">
        <SectionHeader
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
      </div>

      {/* Community Impact Section */}
      <div className="bg-blue-50 py-16 rounded-xl">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-600">
                Impact Communautaire
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Nos projets ne se limitent pas à fournir des ressources, mais
                visent également à renforcer les communautés locales. Grâce à
                des initiatives collaboratives, nous créons des opportunités
                durables pour les générations futures.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <span className="text-gray-500">Image placeholder</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Transforming Lives Section */}
      <div className="bg-blue-50 py-16 rounded-xl">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-600">
            Transformer des Vies, Construire des Avenirs
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                Forage de Puits : L'Eau, Source de Vie
              </h3>
              <p className="text-gray-700 mb-4">
                Objectif : Briser la barrière de l'inaccessibilité à l'eau
                potable dans les zones rurales isolées.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
                <li>
                  Études géologiques approfondies pour localiser les nappes
                  phréatiques.
                </li>
                <li>
                  Construction de puits équipés de systèmes de pompage modernes.
                </li>
                <li>
                  Formation des habitants pour assurer l'entretien et la
                  pérennité des installations.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                Construction d'Écoles : L'Éducation, un Droit pour Tous
              </h3>
              <p className="text-gray-700 mb-4">
                Objectif : Offrir aux enfants des zones rurales un accès à une
                éducation de qualité.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
                <li>
                  Écoles primaires modernes, équipées en matériel pédagogique
                  adapté.
                </li>
                <li>
                  Programmes de sensibilisation pour encourager la
                  scolarisation,
                </li>
                <li>en particulier des filles.</li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Self-Sufficient Village Section */}
      <div className="bg-blue-50 py-16 rounded-xl">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-blue-600">
                Un Village Autosuffisant
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Le premier village orange au Maroc est un modèle innovant de
                développement communautaire. Avec des infrastructures modernes
                et des centres éducatifs, ce projet vise à autonomiser les
                habitants des zones rurales.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center md:order-1">
              <span className="text-gray-500">Image placeholder</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Call to Action Section */}
      <section className="text-center bg-blue-600 text-white p-12 rounded-lg shadow-lg">
        <Container>
          <h2 className="text-3xl font-bold mb-6">
            Rejoignez-Nous dans Cette Aventure Humanitaire
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Ensemble, nous pouvons transformer des vies, renforcer des
            communautés et apporter de l'espoir là où il est le plus nécessaire.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              href="/contact?type=donation"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Faire un Don
            </Button>
            <Button
              href="/contact?type=volunteer"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Devenir Bénévole
            </Button>
          </div>
        </Container>
      </section>
    </Container>
  );
}
