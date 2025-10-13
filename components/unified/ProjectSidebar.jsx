// components/unified/ProjectSidebar.jsx
import Link from "next/link";
import { Button } from "components/unified";

/**
 * Project sidebar component with support CTA and additional information
 * @param {string} projectTitle - Project title for testimonials
 * @param {Array} targetAudience - Array of target audience items
 * @param {Array} facilities - Array of facilities items
 * @param {string} className - Additional CSS classes
 */
export default function ProjectSidebar({
  projectTitle,
  targetAudience = [],
  facilities = [],
  className = ""
}) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Support CTA */}
      <div className="bg-white rounded-lg shadow-lg p-6 top-6 animate-fade-in">
        <h3 className="text-xl font-bold mb-6 text-center text-gray-900">
          Soutenez Ce Projet
        </h3>
        <p className="text-gray-600 mb-6 text-center leading-relaxed">
          Contribuez à offrir une meilleure qualité de vie aux bénéficiaires de ce projet
        </p>

        {/* Testimonial placeholder */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700 italic mb-2">
            "Grâce à ce projet, j'ai pu développer mes compétences et retrouver confiance en moi."
          </p>
          <p className="text-xs text-gray-500">— Bénéficiaire du projet</p>
        </div>

        <div className="space-y-3">
          <Button
            href="/contact?type=donation"
            variant="primary"
            size="medium"
            className="w-full"
          >
            Faire un Don
          </Button>
          <Button
            href="/contact?type=volunteer"
            variant="outline"
            size="medium"
            className="w-full"
          >
            Devenir Bénévole
          </Button>
        </div>
      </div>

      {/* Target Audience */}
      {targetAudience.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Public Cible</h3>
          <div className="space-y-3">
            {targetAudience.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Facilities */}
      {facilities.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Nos Installations</h3>
          <div className="space-y-3">
            {facilities.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-green-100 text-green-600 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
