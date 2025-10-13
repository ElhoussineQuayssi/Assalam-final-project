// components/unified/ProjectContentRenderer.jsx
import Image from "next/image";
import { Award, Download, ExternalLink, MapPin, Quote, TrendingUp, List, Image as ImageIcon, Play, User, HelpCircle, Calendar, FileText } from "lucide-react";

/**
 * Component to render different types of project content
 * @param {Object} contentBlock - The content block object with type and content
 * @param {string} projectTitle - The project title for context
 */
export default function ProjectContentRenderer({ contentBlock, projectTitle }) {
  const { type, content } = contentBlock;

  switch (type) {
    case "text":
      return (
        <div className="animate-fade-in mb-8">
          <h3 className="text-2xl font-bold mb-4 text-brand-primary">
            {content.heading}
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            {content.text}
          </p>
        </div>
      );

    case "image":
      return (
        <div className="animate-fade-in mb-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={content.src || `/placeholder.svg?height=400&width=800`}
              alt={content.alt || "Project image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {content.caption && (
            <p className="text-center text-gray-600 mt-2 italic">
              {content.caption}
            </p>
          )}
        </div>
      );

    case "award":
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 animate-fade-in mb-8">
          <div className="flex items-start">
            <Award className="h-8 w-8 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-yellow-800 mb-2">
                {content.title}
              </h3>
              <p className="text-yellow-700 mb-2">{content.description}</p>
              <div className="flex items-center text-sm text-yellow-600">
                <span className="font-medium">{content.issuer}</span>
                <span className="mx-2">•</span>
                <span>{content.year}</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "cta":
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 animate-fade-in mb-8 text-center">
          <h3 className="text-xl font-bold text-blue-800 mb-2">
            {content.title}
          </h3>
          <p className="text-blue-700 mb-4">{content.description}</p>
          <a
            href={content.buttonUrl}
            className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.buttonText}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      );

    case "map":
      return (
        <div className="animate-fade-in mb-8">
          <h3 className="text-2xl font-bold mb-4 text-brand-primary">
            {content.title}
          </h3>
          <div className="flex items-start mb-2">
            <MapPin className="h-5 w-5 text-brand-primary mr-2 mt-1 flex-shrink-0" />
            <p className="text-gray-700">{content.address}</p>
          </div>
          {content.embedUrl && (
            <div className="aspect-video rounded-lg overflow-hidden mt-4">
              <iframe
                src={content.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          )}
        </div>
      );

    case "quote":
      return (
        <div className="bg-gray-50 border-l-4 border-brand-600 pl-6 py-4 animate-fade-in mb-8">
          <Quote className="h-8 w-8 text-brand-primary mb-2" />
          <blockquote className="text-lg text-gray-700 italic mb-2">
            "{content.text}"
          </blockquote>
          <cite className="text-brand-primary font-medium">
            — {content.author}
          </cite>
        </div>
      );

    case "stats":
      return (
        <div className="animate-fade-in mb-8">
          <h3 className="text-2xl font-bold mb-6 text-brand-primary">
            {content.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.stats.map((stat, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "list":
      return (
        <div className="animate-fade-in mb-8">
          <h3 className="text-2xl font-bold mb-4 text-brand-primary">
            {content.title}
          </h3>
          <ul className="space-y-2">
            {content.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-brand-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "gallery":
      if (!content.images || !content.images.length) return null;
      return (
        <div className="animate-fade-in mb-8">
          <h3 className="text-2xl font-bold mb-6 text-brand-primary">
            {content.title || "Galerie Photos"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {content.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image || `/placeholder.svg?height=300&width=300`}
                  alt={`Image ${index + 1} du ${projectTitle}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      );

    case "video":
      return (
        <div className="animate-fade-in mb-8">
          <h3 className="text-2xl font-bold mb-4 text-brand-primary">
            {content.title}
          </h3>
          <p className="text-gray-600 mb-4">{content.description}</p>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={content.url}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      );

    case "testimonial":
      return (
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 animate-fade-in mb-8">
          <div className="flex items-start">
            {content.image && (
              <Image
                src={content.image}
                alt={content.name}
                width={60}
                height={60}
                className="rounded-full mr-4 flex-shrink-0"
              />
            )}
            <div>
              <div className="flex items-center mb-2">
                <User className="h-5 w-5 text-brand-primary mr-2" />
                <span className="font-bold text-green-800">{content.name}</span>
                <span className="text-brand-primary ml-2">({content.role})</span>
              </div>
              <p className="text-brand-primary italic">"{content.content}"</p>
            </div>
          </div>
        </div>
      );

    case "faq":
      return (
        <div className="animate-fade-in mb-8">
          <h3 className="text-2xl font-bold mb-6 text-brand-primary">
            {content.title}
          </h3>
          <div className="space-y-4">
            {content.questions.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 text-brand-primary mr-2" />
                  {faq.question}
                </h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "file":
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 animate-fade-in mb-8 text-center">
          <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {content.title}
          </h3>
          <p className="text-gray-600 mb-4">{content.description}</p>
          <a
            href={content.fileUrl}
            className="inline-flex items-center bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger {content.fileName}
          </a>
        </div>
      );

    case "timeline":
      return (
        <div className="animate-fade-in mb-8">
          <h3 className="text-2xl font-bold mb-6 text-brand-primary">
            {content.title}
          </h3>
          <div className="space-y-4">
            {content.events.map((event, index) => (
              <div key={index} className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-brand-600 rounded-full flex-shrink-0"></div>
                  {index < content.events.length - 1 && (
                    <div className="w-0.5 h-16 bg-brand-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 text-brand-primary mr-2" />
                    <span className="font-bold text-green-800">{event.year}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">{event.title}</h4>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}
