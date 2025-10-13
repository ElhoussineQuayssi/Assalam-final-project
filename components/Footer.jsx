import Link from "next/link";
import Image from "next/image";
import Signature from "./Signature";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-primary-dark text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and intro */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="relative w-12 h-12 mr-2">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Logo Fondation Assalam"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl">Assalam</span>
            </Link>
            <p className="text-white/80 mb-6">
              La Fondation Assalam œuvre pour améliorer les conditions de vie au
              Maroc à travers des projets d&apos;éducation, de santé et de
              développement durable.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-blue-300 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-300 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-brand-secondary transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Nos Projets
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Blog & Actualités
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Projets</h3>
            <ul className="space-y-2">
              {[
                { name: "Rayhanat assalam", slug: "rayhanat-assalam" },
                { name: "Centre Himaya", slug: "centre-himaya" },
                { name: "Fataer elbaraka", slug: "fataer-al-baraka" },
                { name: "Imtiaz", slug: "projet-imtiaz" },
                { name: "Kafala", slug: "kafala" },
                { name: "Nadi assalam", slug: "nadi-assalam" },
              ].map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-secondary mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/70">
                  123 Rue des Oliviers, Quartier Hassan, Rabat, Maroc
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-secondary mr-3 flex-shrink-0" />
                <a
                  href="tel:+212522334455"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  +212 5 22 33 44 55
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-secondary mr-3 flex-shrink-0" />
                <a
                  href="mailto:contact@fondation-assalam.org"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  contact@fondation-assalam.org
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/contact"
                className="bg-brand-secondary hover:bg-brand-secondary-dark text-white px-4 py-2 rounded-md transition-colors inline-block"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-8 border-brand-secondary/30" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Fondation Assalam. Tous droits
            réservés.
          </p>
          <Signature />
        </div>
      </div>
    </footer>
  );
}
