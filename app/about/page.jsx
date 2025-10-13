import Image from "next/image";
import {
  Container,
  ContentCard,
  SectionWithBackground,
  ImageTextSection,
  StatsCard,
  ValueCard,
  TeamMemberCard,
  MissionVisionCard,
  AboutHeader,
  Timeline,
  TimelineItem,
  TimelineTime,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
} from "components/unified";

const partnershipsData = [
  {
    name: "Organisation Internationale",
    logo: "/partners/partner1.png",
    description: "Partenaire clé dans nos projets de développement communautaire.",
  },
  {
    name: "Fondation Locale",
    logo: "/partners/partner2.png",
    description: "Soutient nos initiatives éducatives et sociales depuis plusieurs années.",
  },
  {
    name: "Entreprise Sociale",
    logo: "/partners/partner3.png",
    description: "Collaborateur pour des projets durables et innovants.",
  },
  {
    name: "ONG Environnementale",
    logo: "/partners/partner4.png",
    description: "Partenaire pour la protection de l'environnement et la sensibilisation.",
  },
];

export default function AboutUs() {
  const impactStats = [
    {
      title: "10,000+",
      description: "Bénéficiaires aidés à travers nos projets.",
    },
    {
      title: "50+",
      description:
        "Projets réalisés dans les domaines de l'éducation, la santé et l'autonomisation.",
    },
    {
      title: "20+",
      description:
        "Partenariats avec des organisations locales et internationales.",
    },
  ];

  const values = [
    {
      title: "Solidarité",
      description:
        "Nous croyons fermement à l'entraide et au soutien mutuel pour avancer ensemble.",
      borderColor: "green",
    },
    {
      title: "Intégrité",
      description:
        "Nous agissons avec honnêteté et transparence dans toutes nos actions et décisions.",
      borderColor: "blue",
    },
    {
      title: "Respect",
      description:
        "Nous respectons la dignité et la diversité de chaque personne et communauté.",
      borderColor: "green",
    },
    {
      title: "Innovation",
      description:
        "Nous recherchons constamment des solutions créatives pour répondre aux défis.",
      borderColor: "blue",
    },
    {
      title: "Durabilité",
      description:
        "Nous nous engageons à créer un impact positif et durable sur les communautés et l'environnement.",
      borderColor: "green",
    },
    {
      title: "Excellence",
      description:
        "Nous visons l'excellence dans tous nos projets et initiatives.",
      borderColor: "blue",
    },
  ];

  return (
    <Container className="py-16">
      {/* Header Section */}
      <AboutHeader
        title="À Propos de Nous"
        subtitle="Découvrez l'histoire, la mission et les valeurs de la Fondation Assalam"
      />

      {/* Notre Histoire */}
      <section className="mb-20">
        <ImageTextSection
          title="Notre Histoire"
          content={
            <>
              <p className="mb-4">
                La Fondation Assalam a été créée en 2010 avec une vision claire :
                améliorer les conditions de vie des communautés les plus
                défavorisées au Maroc. Notre fondateur, inspiré par les valeurs de
                solidarité et d'entraide, a commencé par de petites
                initiatives locales qui se sont progressivement transformées en
                projets d'envergure nationale.
              </p>
              <p>
                Au fil des années, notre engagement s'est renforcé et nos
                domaines d'intervention se sont diversifiés, allant de
                l'éducation à la santé, en passant par le développement
                durable et la promotion de l'artisanat marocain.
              </p>
            </>
          }
          imageSrc="/placeholder.svg?height=800&width=600"
          imageAlt="Histoire de la fondation"
          layout="image-left"
          titleColor="blue"
        />
      </section>

      {/* Timeline Section */}
      <SectionWithBackground variant="gray" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-brand-primary">Notre Histoire</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les étapes clés qui ont marqué le parcours de la
            Fondation Assalam.
          </p>
        </div>

        <Timeline className=
          {[
            {
              year: "2010",
              event:
                "Création de la Fondation Assalam avec des initiatives locales.",
            },
            {
              year: "2015",
              event:
                "Lancement des premiers projets nationaux dans l'éducation et la santé.",
            },
            {
              year: "2018",
              event:
                "Ouverture de centres communautaires pour autonomiser les femmes.",
            },
            {
              year: "2023",
              event:
                "Impact sur plus de 10,000 bénéficiaires à travers le Maroc.",
            }
          ].map((item, index) => (
            <TimelineItem key={index}>
              <TimelineTime>{item.year}</TimelineTime>
              <TimelineContent>
                <TimelineTitle>{item.event}</TimelineTitle>
                <TimelineDescription>
                  {index === 0
                    ? "Début de notre mission avec des initiatives locales."
                    : index === 1
                      ? "Expansion vers des projets nationaux."
                      : index === 2
                        ? "Focus sur l'autonomisation des femmes."
                        : "Un impact significatif sur les communautés."}
                </TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          ))}>
        </Timeline>
      </SectionWithBackground>

      {/* Notre Mission et Vision */}
      <SectionWithBackground variant="gray" className="mb-20 py-16 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-brand-primary">Notre Mission et Vision</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <MissionVisionCard
            type="mission"
            title="Notre Mission"
            description="La mission de la Fondation Assalam est d'œuvrer pour l'amélioration des conditions de vie des populations défavorisées au Maroc, à travers des projets dans les domaines de l'éducation, la santé, le développement durable et l'autonomisation économique."
          />

          <MissionVisionCard
            type="vision"
            title="Notre Vision"
            description="Nous aspirons à construire un Maroc où chaque citoyen a accès à l'éducation, aux soins de santé, et aux opportunités économiques. Un Maroc où le développement est durable et respectueux de l'environnement, et où la richesse culturelle est préservée et valorisée."
          />
        </div>
      </SectionWithBackground>

      {/* Impact Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-brand-primary">Notre Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Grâce à votre soutien, nous avons pu transformer des vies et bâtir
            un avenir meilleur.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {impactStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.description}
              value={stat.title}
              description={stat.description}
              color={index === 0 ? "blue" : index === 1 ? "green" : "purple"}
            />
          ))}
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center text-brand-primary">Nos Valeurs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              description={value.description}
              borderColor={value.borderColor}
            />
          ))}
        </div>
      </section>

      {/* Partnerships Section */}
      <SectionWithBackground variant="gray" className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-brand-primary">Nos Partenaires</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous collaborons avec des partenaires de confiance pour maximiser
            notre impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnershipsData.map((partner, index) => (
            <ContentCard
              key={index}
              title={partner.name}
              description={partner.description}
              imageSrc={partner.logo}
              imageAlt={partner.name}
              className="hover-lift transition-all duration-300"
            />
          ))}
        </div>
      </SectionWithBackground>

      {/* Notre Équipe */}
      <section>
        <h2 className="text-3xl font-bold mb-10 text-center text-brand-primary">Notre Équipe</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((id) => (
            <TeamMemberCard
              key={id}
              name="Nom Prénom"
              role="Titre / Fonction"
              imageSrc={`/placeholder.svg?height=300&width=300`}
              imageAlt={`Membre de l'équipe ${id}`}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
