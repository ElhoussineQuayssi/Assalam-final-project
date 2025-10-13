"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
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
} from "lucide-react";
import {
  Container,
  Button,
  Input,
  Textarea,
  Select,
  Alert,
} from "components/unified";

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
      const result = await saveMessage(formData);
      if (result.success) {
        setFormState({
          status: "success",
          message:
            "Votre message a été envoyé avec succès. Nous vous contacterons bientôt.",
        });
        event.target.reset();
      } else {
        setFormState({
          ...formState,
          status: "error",
          message:
            result.message || "Une erreur s'est produite. Veuillez réessayer.",
        });
      }
    } catch {
      setFormState({
        ...formState,
        status: "error",
        message: "Une erreur s'est produite. Veuillez réessayer.",
      });
    }
  };

  const contactOptions = [
    { value: "contact", label: "Contact Général" },
    { value: "donation", label: "Faire un Don" },
    { value: "volunteer", label: "Devenir Bénévole" },
  ];

  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Contactez-Nous</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {type === "donation"
            ? "Soutenez nos projets par un don et aidez-nous à faire une différence"
            : type === "volunteer"
              ? "Rejoignez notre équipe de bénévoles et participez à nos actions"
              : "Nous sommes à votre écoute. N'hésitez pas à nous contacter pour toute question."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
          {/* Form Status Messages */}
          {formState.status === "success" && (
            <Alert
              type="success"
              title="Message envoyé !"
              message={formState.message}
              className="mb-6"
            />
          )}

          {formState.status === "error" && (
            <Alert
              type="error"
              title="Erreur"
              message={formState.message}
              className="mb-6"
            />
          )}

          {/* Form Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            {contactOptions.map((option) => (
              <a
                key={option.value}
                href={`/contact?type=${option.value}`}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  type === option.value
                    ? "text-brand-primary border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {option.label}
              </a>
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
              placeholder="+212 5 XX XX XX XX"
            />

            {type === "donation" && (
              <Input
                label="Montant du don (MAD)"
                type="number"
                name="amount"
                min="10"
                required={type === "donation"}
                placeholder="100"
              />
            )}

            {type === "volunteer" && (
              <Input
                label="Compétences / Domaines d'intérêt"
                name="skills"
                required={type === "volunteer"}
                placeholder="ex: Enseignement, Médecine, Informatique..."
              />
            )}

            <Textarea
              label="Message"
              name="message"
              required
              rows={5}
              placeholder="Votre message..."
            />

            <Button
              type="submit"
              variant="primary"
              size="large"
              className="w-full"
              loading={formState.status === "submitting"}
              disabled={formState.status === "submitting"}
            >
              {formState.status === "submitting"
                ? "Envoi en cours..."
                : type === "donation"
                  ? "Envoyer ma demande de don"
                  : type === "volunteer"
                    ? "Envoyer ma candidature"
                    : "Envoyer mon message"}
            </Button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-ui-surface rounded-xl p-8 mb-6">
            <h3 className="text-xl font-bold mb-6 text-brand-primary">
              Nos Coordonnées
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Adresse:</p>
                  <p className="text-gray-600">
                    123 Rue des Oliviers, Quartier Hassan, Rabat, Maroc
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Email:</p>
                  <a
                    href="mailto:contact@fondation-assalam.org"
                    className="text-brand-primary hover:text-blue-800 transition-colors duration-200"
                  >
                    contact@fondation-assalam.org
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Téléphone:</p>
                  <a
                    href="tel:+212522334455"
                    className="text-brand-primary hover:text-blue-800 transition-colors duration-200"
                  >
                    +212 5 22 33 44 55
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 text-brand-primary mt-1 flex-shrink-0">🕒</div>
                <div>
                  <p className="font-medium text-gray-900">Heures d'ouverture:</p>
                  <p className="text-gray-600">Lundi - Vendredi: 9h00 - 17h00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden h-80 relative bg-gray-100">
            {/* Placeholder for Google Map - In a real project, replace with actual Google Maps embed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-600">Carte Google Maps ici</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#f", color: "bg-blue-800 hover:bg-blue-900" },
                { icon: Twitter, href: "#t", color: "bg-sky-600 hover:bg-sky-700" },
                { icon: Linkedin, href: "#l", color: "bg-blue-600 hover:bg-blue-700" },
                { icon: Instagram, href: "#", color: "bg-rose-600 hover:bg-rose-700" },
              ].map(({ icon: Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  className={`${color} text-white p-3 rounded-full transition-colors duration-200 hover-lift`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
