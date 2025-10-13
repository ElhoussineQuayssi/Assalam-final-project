import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Users, Clock, Award, Play, FileText } from "lucide-react";
import {
  Container,
  ProjectHero,
  ProjectInfoCard,
  ProjectContentSection,
  ProjectGallery,
  ProjectSidebar,
  Button,
} from "components/unified";
import { getProject } from "lib/projects";

// Generate metadata for the project
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Projet non trouvé",
    };
  }

  return {
    title: `${project.title} | Fondation Assalam`,
    description: project.excerpt,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-16">
      {/* Hero Section */}
      <ProjectHero
        title={project.title}
        excerpt={project.excerpt}
        image={project.image}
        categories={project.categories}
      />

      {/* Project Info */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProjectInfoCard
            type="date"
            label="Année de création"
            value={project.startDate || "N/A"}
          />
          <ProjectInfoCard
            type="location"
            label="Localisation"
            value={project.location || "N/A"}
          />
          <ProjectInfoCard
            type="people"
            label="Bénéficiaires"
            value={project.peopleHelped ? `${project.peopleHelped}+` : "N/A"}
          />
          <ProjectInfoCard
            type="status"
            label="Statut"
            value={project.status || "Actif"}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="mb-12 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          {/* About Section */}
          <ProjectContentSection title="À Propos du Projet" titleColor="green">
            <div className="prose prose-lg max-w-none">
              {project.content?.filter(block => block.type === "text").map((block, index) => {
                if (block.content?.text || block.content?.heading) {
                  return (
                    <div key={index} className="mb-8">
                      {block.content.heading && (
                        <h3 className="text-xl font-bold mb-4 text-brand-primary">{block.content.heading}</h3>
                      )}
                      {block.content.text && (
                        <p className="mb-4 leading-relaxed">{block.content.text}</p>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {project.goals && project.goals.length > 0 && (
              <div className="mt-8 bg-brand-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-brand-primary">
                  Nos Objectifs
                </h3>
                <ul className="space-y-2">
                  {project.goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-brand-100 text-green-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        {index + 1}
                      </div>
                      <p className="leading-relaxed">{goal}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ProjectContentSection>

          {project.gallery && project.gallery.length > 0 && (
            <ProjectGallery
              images={project.gallery}
              projectTitle={project.title}
              className="mt-12"
            />
          )}

          {/* Additional Content Blocks */}
          {project.content?.map((block, index) => {
            switch (block.type) {
              case "text":
                return (
                  <div key={index} className="mb-8">
                    {block.content?.heading && (
                      <h3 className="text-xl font-bold mb-4 text-brand-primary">{block.content.heading}</h3>
                    )}
                    {block.content?.text && (
                      <p className="mb-4 leading-relaxed">{block.content.text}</p>
                    )}
                  </div>
                );

              case "image":
                return block.content?.src ? (
                  <div key={index} className="mb-8">
                    <img
                      src={block.content.src}
                      alt={block.content.alt || ""}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    {block.content.caption && (
                      <p className="text-sm text-gray-600 mt-2 italic text-center">
                        {block.content.caption}
                      </p>
                    )}
                  </div>
                ) : null;

              case "list":
                return block.content?.title || (block.content?.items && block.content.items.length > 0) ? (
                  <ProjectContentSection key={index} title={block.content.title || "Liste"} titleColor="green">
                    <div className="grid md:grid-cols-2 gap-4">
                      {block.content.items?.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
                          <div className="bg-brand-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </ProjectContentSection>
                ) : null;

              case "quote":
                return block.content?.text ? (
                  <div key={index} className="bg-gray-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
                    <blockquote className="text-lg text-gray-700 italic mb-2">
                      "{block.content.text}"
                    </blockquote>
                    {block.content.author && (
                      <cite className="text-sm text-gray-600">— {block.content.author}</cite>
                    )}
                  </div>
                ) : null;

              case "video":
                return block.content?.videoUrl ? (
                  <div key={index} className="mb-8">
                    <div className="bg-gray-100 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Play className="h-5 w-5" />
                        {block.content.title || "Vidéo"}
                      </h3>
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                        <iframe
                          src={block.content.videoUrl}
                          title={block.content.title || "Video"}
                          className="w-full h-full rounded-lg"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      {block.content.description && (
                        <p className="text-gray-700">{block.content.description}</p>
                      )}
                    </div>
                  </div>
                ) : null;

              case "testimonial":
                return block.content?.content ? (
                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start gap-4">
                      {block.content.image && (
                        <img
                          src={block.content.image}
                          alt={block.content.name || ""}
                          className="w-12 h-12 object-cover rounded-full flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <blockquote className="text-gray-700 italic mb-2">
                          "{block.content.content}"
                        </blockquote>
                        <cite className="text-sm text-gray-600">
                          — {block.content.name}
                          {block.content.role && `, ${block.content.role}`}
                        </cite>
                      </div>
                    </div>
                  </div>
                ) : null;

              case "stats":
                return block.content?.title || (block.content?.stats && block.content.stats.length > 0) ? (
                  <ProjectContentSection key={index} title={block.content.title || "Statistiques"} titleColor="green">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {block.content.stats?.map((stat, statIndex) => (
                        <div key={statIndex} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">{stat.value}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </ProjectContentSection>
                ) : null;

              case "timeline":
                return block.content?.title || (block.content?.events && block.content.events.length > 0) ? (
                  <ProjectContentSection key={index} title={block.content.title || "Chronologie"} titleColor="green">
                    <div className="space-y-6">
                      {block.content.events?.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex items-start gap-4">
                          <div className="bg-brand-100 text-green-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-sm font-bold">{event.year}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <p className="text-gray-700 mt-1">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ProjectContentSection>
                ) : null;

              case "faq":
                return block.content?.title || (block.content?.questions && block.content.questions.length > 0) ? (
                  <ProjectContentSection key={index} title={block.content.title || "Questions Fréquentes"} titleColor="green">
                    <div className="space-y-4">
                      {block.content.questions?.map((question, questionIndex) => (
                        <div key={questionIndex} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{question.question}</h4>
                          <p className="text-gray-700">{question.answer}</p>
                        </div>
                      ))}
                    </div>
                  </ProjectContentSection>
                ) : null;

              case "cta":
                return block.content?.title || block.content?.description ? (
                  <div key={index} className="bg-brand-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
                    <h3 className="text-xl font-bold mb-2 text-green-800">{block.content.title}</h3>
                    <p className="text-gray-700 mb-4">{block.content.description}</p>
                    {block.content.buttonText && block.content.buttonUrl && (
                      <Link href={block.content.buttonUrl} className="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors">
                        {block.content.buttonText}
                      </Link>
                    )}
                  </div>
                ) : null;

              case "file":
                return block.content?.title || block.content?.fileUrl ? (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
                    <h4 className="font-semibold mb-2">{block.content.title}</h4>
                    {block.content.description && (
                      <p className="text-gray-700 mb-3">{block.content.description}</p>
                    )}
                    {block.content.fileUrl && (
                      <a
                        href={block.content.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Télécharger {block.content.fileName || "le fichier"}
                      </a>
                    )}
                  </div>
                ) : null;

              case "map":
                return block.content?.title || block.content?.address ? (
                  <ProjectContentSection key={index} title={block.content.title || "Localisation"} titleColor="green">
                    <div className="bg-gray-100 rounded-lg p-4">
                      {block.content.embedUrl ? (
                        <iframe
                          src={block.content.embedUrl}
                          className="w-full h-64 rounded-lg"
                          frameBorder="0"
                          allowFullScreen=""
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p>{block.content.address}</p>
                        </div>
                      )}
                    </div>
                  </ProjectContentSection>
                ) : null;

              case "award":
                return block.content?.title || block.content?.description ? (
                  <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <div className="flex items-start gap-4">
                      {block.content.image && (
                        <img
                          src={block.content.image}
                          alt={block.content.title || ""}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-yellow-800 flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          {block.content.title}
                        </h3>
                        <p className="text-gray-700 mb-2">{block.content.description}</p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          {block.content.issuer && <span><strong>Émetteur:</strong> {block.content.issuer}</span>}
                          {block.content.year && <span><strong>Année:</strong> {block.content.year}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;

              default:
                return null;
            }
          })}
        </div>

        {/* Sidebar */}
        <ProjectSidebar
          projectTitle={project.title}
          targetAudience={[]}
          facilities={[]}
        />
      </section>
    </Container>
  );
}
