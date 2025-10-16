"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link"; // Import Link for navigation
// Assuming the path to the server action is correct
import { saveMessage } from "lib/actions";
import {
  Check,
  AlertTriangle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import Alert from "@/components/Alert/Alert";
// --- Design System Configuration (Minimalist Light Blue) ---
const ACCENT = "#6495ED"; // Cornflower Blue
const PRIMARY_LIGHT = "#B0E0E6"; // Powder Blue
const DARK_TEXT = "#333333"; // Dark Gray
const BACKGROUND = "#FAFAFA"; // Off-White

export default function Contact() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "contact";

  const [formState, setFormState] = useState({
    status: "idle", // idle, submitting, success, error
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({ status: "submitting", message: "" });

    const formData = new FormData(event.target);
    formData.append("type", type);

    try {
      // Assuming 'saveMessage' is the server action function
      const result = await saveMessage(formData);
      if (result.success) {
        setFormState({
          status: "success",
          message:
            "Votre message a été transmis à notre équipe. Nous vous répondrons dans les plus brefs délais, Insha'Allah.", // Enhanced Success Message
        });
        event.target.reset();
      } else {
        setFormState({
          ...formState,
          status: "error",
          message:
            result.message ||
            "Un problème est survenu lors de l'envoi. Veuillez vérifier les informations et réessayer.", // Enhanced Error Message
        });
      }
    } catch (e) {
      setFormState({
        ...formState,
        status: "error",
        message:
          "Une erreur technique s'est produite. Veuillez réessayer plus tard ou nous contacter par téléphone.", // Enhanced Catch Error Message
      });
    }
  };

  const contactOptions = useMemo(
    () => [
      { value: "contact", label: "Demande Générale" }, // Enhanced Tab Label
      { value: "donation", label: "Soutenir un Projet (Don)" }, // Enhanced Tab Label
      { value: "volunteer", label: "Rejoindre l'Équipe (Bénévole)" }, // Enhanced Tab Label
    ],
    [],
  );

  const buttonText = useMemo(() => {
    if (formState.status === "submitting") return "Envoi de votre intention..."; // Enhanced Loading Text
    if (type === "donation") return "Soumettre ma promesse de don"; // Enhanced Button Text
    if (type === "volunteer") return "Envoyer ma candidature bénévole"; // Enhanced Button Text
    return "Envoyer mon message de contact"; // Enhanced Button Text
  }, [formState.status, type]);

  const introText = useMemo(() => {
    if (type === "donation")
      return "Chaque don est un acte de solidarité. Remplissez ce formulaire pour nous informer de votre intention de soutenir un projet."; // Enhanced Intro Text
    if (type === "volunteer")
      return "Votre temps et vos compétences sont précieux. Rejoignez la communauté Assalam et participez activement à nos actions sur le terrain."; // Enhanced Intro Text
    return "Nous sommes là pour répondre à vos questions sur nos actions, partenariats ou toute autre demande. Votre engagement commence ici."; // Enhanced Intro Text
  }, [type]);

  // Fixed hex colors for social platforms (avoiding Tailwind classes)
  const socialColors = useMemo(
    () => ({
      facebook: "#1877F2",
      twitter: "#1DA1F2",
      linkedin: "#0A66C2",
      instagram: "#E4405F",
    }),
    [],
  );

  return (
    // Layout Architecture: Max-width container and generous vertical spacing (py-24)
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      style={{ backgroundColor: BACKGROUND }}
    >
      {/* GLOBAL STYLE INJECTION FOR INPUT FOCUS */}
      <style jsx global>{`
        .contact-form-input:focus {
          /* Ensure border and shadow/ring use ACCENT color */
          border-color: ${ACCENT} !important;
          box-shadow: 0 0 0 2px ${ACCENT}40; /* Simulate focus ring with opacity */
        }
      `}</style>

      <div className="text-center mb-16">
        {/* Typography System: H2 (Section Title) pattern */}
        <h2 className="text-4xl font-bold mb-4" style={{ color: DARK_TEXT }}>
          L'Espace de Communication et d'Engagement
        </h2>{" "}
        {/* Enhanced Title */}
        {/* Typography System: Body text (text-lg) and Dark Text color */}
        <p
          className="text-lg max-w-3xl mx-auto"
          style={{ color: `${DARK_TEXT}D9` }}
        >
          {introText}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Contact Form - Component Pattern: ContentCard with Scroll Reveal */}
        <div
          className="bg-white rounded-2xl shadow-xl p-8 scroll-reveal card-lift"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Form Status Messages */}
          {formState.status === "success" && (
            <Alert
              type="success"
              title="Merci de votre engagement !" // Enhanced Alert Title
              message={formState.message}
              className="mb-6"
            />
          )}

          {formState.status === "error" && (
            <Alert
              type="error"
              title="Échec de l'envoi" // Enhanced Alert Title
              message={formState.message}
              className="mb-6"
            />
          )}

          {/* Form Tabs - Typography and Color System Application */}
          <div
            className="flex border-b mb-8"
            style={{ borderColor: PRIMARY_LIGHT }}
          >
            {contactOptions.map((option) => (
              <Link
                key={option.value}
                href={`/contact?type=${option.value}`}
                className={`px-4 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none`}
                style={{
                  color: type === option.value ? ACCENT : "#6B7280", // Gray-500
                  borderBottom:
                    type === option.value
                      ? `2px solid ${ACCENT}`
                      : "2px solid transparent",
                }}
              >
                {option.label}
              </Link>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Prénom"
                name="firstName"
                required
                placeholder="Votre prénom"
              />
              <Input
                label="Nom"
                name="lastName"
                required
                placeholder="Votre nom"
              />
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              required
              placeholder="votre.email@exemple.com"
            />

            <Input
              label="Téléphone"
              type="tel"
              name="phone"
              placeholder="+212 5 XX XX XX XX (Optionnel)" // Enhanced Placeholder
            />

            {type === "donation" && (
              <Input
                label="Montant de l'intention de don (MAD)" // Enhanced Label
                type="number"
                name="amount"
                min="10"
                required
                placeholder="Ex: 500 MAD" // Enhanced Placeholder
              />
            )}

            {type === "volunteer" && (
              <Input
                label="Vos Compétences et Domaine d'expertise" // Enhanced Label
                name="skills"
                required
                placeholder="Ex: Enseignement, Santé, Communication, Aide logistique..." // Enhanced Placeholder
              />
            )}

            <Textarea
              label="Votre Message / Détails de votre demande" // Enhanced Label
              name="message"
              required
              rows={5}
              placeholder="Expliquez-nous brièvement comment vous souhaitez contribuer ou votre question spécifique..." // Enhanced Placeholder
            />

            {/* Primary Button Pattern: rounded-full, bg-accent, hover:scale-102, shadow-xl */}
            <button
              type="submit"
              className={`w-full text-white font-bold rounded-full px-8 py-4 text-lg shadow-xl transition-all duration-300 transform flex items-center justify-center space-x-2
              ${
                formState.status === "submitting"
                  ? "disabled:cursor-not-allowed"
                  : "hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-opacity-50"
              }`}
              style={{
                backgroundColor:
                  formState.status === "submitting" ? `${ACCENT}B3` : ACCENT, // 70% opacity for disabled state
                cursor:
                  formState.status === "submitting" ? "not-allowed" : "pointer",
                boxShadow:
                  formState.status === "submitting"
                    ? "none"
                    : "0 10px 15px -3px rgba(100, 149, 237, 0.5), 0 4px 6px -2px rgba(100, 149, 237, 0.05)", // Accent-based shadow
              }}
              disabled={formState.status === "submitting"}
            >
              {formState.status === "submitting" && (
                <Loader2 className="animate-spin h-5 w-5" />
              )}
              <span>{buttonText}</span>
            </button>
          </form>
        </div>

        {/* Contact Info Section - Staggered Scroll Reveal */}
        <div
          className="space-y-8 scroll-reveal"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Contact Info Card - Subtle Background, Accent Styling */}
          <div
            className="rounded-2xl p-8 border shadow-lg"
            style={{
              backgroundColor: PRIMARY_LIGHT,
              borderColor: `${ACCENT}40`,
            }}
          >
            {/* Typography: H3 Card Title pattern */}
            <h3
              className="text-xl font-semibold mb-6"
              style={{ color: ACCENT }}
            >
              Notre Siège Social au Maroc
            </h3>{" "}
            {/* Enhanced Title */}
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Adresse du Siège:",
                  details:
                    "123 Rue des Oliviers, Quartier Hassan, Rabat, Maroc",
                  isLink: false,
                }, // Enhanced Title
                {
                  icon: Mail,
                  title: "Email de Contact:",
                  details: "contact@fondation-assalam.org",
                  href: "mailto:contact@fondation-assalam.org",
                  isLink: true,
                }, // Enhanced Title
                {
                  icon: Phone,
                  title: "Ligne Directe:",
                  details: "+212 5 22 33 44 55",
                  href: "tel:+212522334455",
                  isLink: true,
                }, // Enhanced Title
                {
                  icon: () => (
                    <div
                      className="h-6 w-6 text-accent flex-shrink-0"
                      style={{ color: ACCENT }}
                    >
                      🕒
                    </div>
                  ),
                  title: "Horaires d'Accueil:",
                  details: "Lundi - Vendredi: 9h00 - 17h00 (Heure Marocaine)",
                  isLink: false,
                }, // Enhanced Title & Detail
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <IconComponent
                      className="h-6 w-6 mt-1 flex-shrink-0"
                      style={{ color: ACCENT }}
                    />
                    <div className="text-lg">
                      <p className="font-semibold" style={{ color: DARK_TEXT }}>
                        {item.title}
                      </p>
                      {item.isLink ? (
                        <a
                          href={item.href}
                          className="transition-colors duration-200 hover:opacity-80"
                          style={{ color: ACCENT }}
                        >
                          {item.details}
                        </a>
                      ) : (
                        <p style={{ color: `${DARK_TEXT}B3` }}>
                          {item.details}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Map Placeholder */}
          <div
            className="rounded-2xl overflow-hidden h-80 relative shadow-inner border"
            style={{
              backgroundColor: PRIMARY_LIGHT,
              borderColor: `${ACCENT}40`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p
                className="font-semibold text-lg"
                style={{ color: `${DARK_TEXT}70` }}
              >
                Localisation du Siège sur la carte
              </p>{" "}
              {/* Enhanced Placeholder */}
            </div>
          </div>

          {/* Social Media - Use platform specific colors via inline styles */}
          <div className="mt-6">
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: DARK_TEXT }}
            >
              Suivez nos Actions de Solidarité
            </h3>{" "}
            {/* Enhanced Title */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#f", platform: "facebook" },
                { icon: Twitter, href: "#t", platform: "twitter" },
                { icon: Linkedin, href: "#l", platform: "linkedin" },
                { icon: Instagram, href: "#", platform: "instagram" },
              ].map(({ icon: Icon, href, platform }, index) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Lien vers ${platform}`}
                  // Hover effect applied directly for the required interaction pattern
                  className={`text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-50`}
                  style={{ backgroundColor: socialColors[platform] }}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
