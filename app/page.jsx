import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/projects";
import { getBlogs } from "@/lib/blogs";

// Regular imports for lightweight components
import Container from "@/components/Container/Container.jsx";
import SectionHeader from "@/components/SectionHeader/SectionHeader.jsx";
import ContentGrid from "@/components/ContentGrid/ContentGrid.jsx";
import UnifiedHeroServer from "@/components/UnifiedHeroServer";
import TestimonialCard from "@/components/TestimonialCard/TestimonialCard.jsx";
import ContentCard from "@/components/ContentCard/ContentCard.jsx";
import StatsCard from "@/components/StatsCard/StatsCard.jsx";

import ImageTextSection from "@/components/ImageTextSection/ImageTextSection.jsx";
import TimelineSection from "@/components/TimelineSection/TimelineSection";

// Design System Configuration
const DESIGN_SYSTEM = {
  spacing: {
    sectionPadding: "py-16 px-6",
  },
  typography: {
    h2: "text-2xl font-bold",
    body: "text-base",
  },
};

// Color constants (matching the design system)
const ACCENT_COLOR = "#6495ED"; // Cornflower Blue
const ACCENT = "#6495ED"; // Cornflower Blue
const PRIMARY_LIGHT = "#B0E0E6"; // Powder Blue
const DARK_TEXT = "#333333"; // Dark Gray

// Check if HeroSection component exists, if not create import
// Based on memory, HeroSection doesn't exist, so we need to create it
// But first, let's remove the inline component definitions and use existing ones

/**
 * Enhanced Home page component with blueprint design system
 * @returns {JSX.Element} Enhanced home page
 */
export default async function Home() {

  // Fetch projects from Supabase
  const projects = await getProjects();

  // Fetch blogs from Supabase
  const blogs = await getBlogs();

  return (
    // FIX: Replace bg-background with inline style
    <div style={{ backgroundColor: "#FAFAFA" }} className="min-h-screen">
      {/* Hero Section - Blueprint pattern with primary-light background */}
      <UnifiedHeroServer
        title="Assalam - Ensemble pour un avenir meilleur"
        subtitle="Une fondation marocaine dédiée à l'amélioration des conditions de vie, à l'éducation et au développement durable au Maroc."
      />

      {/* Stats Section (No background color change, only structural classes) */}
      <section className={`${DESIGN_SYSTEM.spacing.sectionPadding}`}>
        <Container>
          <SectionHeader
            title="Nos Chiffres Clés"
            subtitle="L'impact mesuré de nos actions sur la société marocaine"
          />

          <ContentGrid
            items={[
              { value: "6+", title: "Projets Actifs" },
              { value: "1000+", title: "Bénéficiaires Aidés" },
              { value: "98%", title: "Taux de Satisfaction" },
            ]}
            columns={{ default: 1, md: 3 }}
            renderItem={(stat, index) => (
              <StatsCard key={index} value={stat.value} title={stat.title} />
            )}
          />
        </Container>
      </section>

      {/* Projects Section - Enhanced with blueprint content cards */}
      {/* FIX: Replace bg-primary-light/50 with inline style (PRIMARY_LIGHT + 50% opacity) */}
      <section
        className={`${DESIGN_SYSTEM.spacing.sectionPadding}`}
        style={{ backgroundColor: `${PRIMARY_LIGHT}80` }}
      >
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
                key={project.id}
                title={project.title}
                excerpt={project.excerpt}
                image={project.image}
                link={`/projects/${project.slug}`}
                index={index}
              />
            )}
          />

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
              // FIX: Replaced bg-accent text-white with inline styles
              style={{ backgroundColor: ACCENT, color: "white" }}
            >
              Voir tous les projets <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ImageText Section - Blueprint pattern with parallax background */}
      <ImageTextSection
        title="Pourquoi Nous Choisir"
        // ENHANCEMENT: Refined subtitle for stronger mission alignment
        subtitle="Fondée en 1992, notre action s'ancre dans une **expertise locale** et une **transparence totale**. Nous créons des changements durables en investissant dans la **dignité** et l'**autonomie**."
        features={[
          // ENHANCEMENT: Added feature highlighting 30+ years of experience
          "Une expérience de plus de **30 ans** au service de la solidarité nationale.",
          "Expertise locale et connaissance approfondie des besoins marocains.",
          "**Transparence totale** dans l'utilisation des fonds (valeur clé).",
          "Approche collaborative avec les communautés locales.",
          "Impact mesurable et suivi rigoureux des résultats.",
        ]}
        buttonText="En Savoir Plus sur notre Mission"
        buttonHref="/about"
      />

      {/* Testimonials Section (No background color change, only structural classes) */}
      <section className={`${DESIGN_SYSTEM.spacing.sectionPadding}`}>
        <Container>
          <SectionHeader
            title="Témoignages de l'Impact"
            subtitle="Leurs mots, notre preuve : l'effet réel de la solidarité sur les vies"
          />

          <ContentGrid
            items={[
              {
                name: "Amina El Mansouri",
                role: "Bénéficiaire du projet Rayhana",
                // ENHANCEMENT: Refined quote for stronger emotional impact and core value integration
                quote:
                  "Le projet **Rayhana** a été un tournant. J'ai retrouvé ma **dignité** et l'**autonomie** nécessaire pour bâtir un avenir stable pour mes enfants. C'est plus qu'une aide, c'est une nouvelle vie pleine d'espoir.",
              },
              {
                name: "Karim Benali",
                role: "Bénéficiaire du projet Imtiaz",
                // ENHANCEMENT: Refined quote for stronger emotional impact and core value integration
                quote:
                  "**Imtiaz** a illuminé mon parcours. Il m'a permis de me concentrer sur mes études et de transformer la précarité en **opportunité**. Ce parrainage est la preuve que la **solidarité** peut changer un destin.",
              },
            ]}
            columns={{ default: 1, md: 2 }}
            renderItem={(testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                name={testimonial.name}
                role={testimonial.role}
                quote={testimonial.quote}
              />
            )}
          />
        </Container>
      </section>

      {/* Enhanced Timeline Section - Blueprint pattern with modern styling and responsive grid */}
      <section
        className={`${DESIGN_SYSTEM.spacing.sectionPadding} scroll-reveal`}
        style={{ backgroundColor: `${PRIMARY_LIGHT}4D` }}
      >
        <Container>
          <SectionHeader
            title="Notre Processus Simple"
            subtitle="Une approche claire et efficace pour réaliser nos projets"
          />

          <TimelineSection />
        </Container>
      </section>

      {/* Blog Section */}
      {blogs.length > 0 && (
        <section className={`${DESIGN_SYSTEM.spacing.sectionPadding}`}>
          <Container>
            <SectionHeader
              title="Actualités & Blog"
              subtitle="Restez informé de nos dernières activités et nouvelles"
            />

            <ContentGrid
              items={blogs}
              columns={{ default: 1, md: 2, lg: 3 }}
              renderItem={(blog, index) => (
                <ContentCard
                  key={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  image={blog.image}
                  link={`/blogs/${blog.slug}`}
                  category={blog.category}
                  date={blog.createdAt}
                  index={index}
                />
              )}
            />

            <div className="text-center mt-12">
              <Link
                href="/blogs"
                className="inline-flex items-center px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
                // FIX: Replaced bg-accent text-white with inline styles
                style={{ backgroundColor: ACCENT, color: "white" }}
              >
                Voir tous les articles <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section - Blueprint pattern with accent background */}
      <section
        className={`${DESIGN_SYSTEM.spacing.sectionPadding} py-20 px-6 rounded-xl border-2 shadow-2xl scroll-reveal`}
        // FIX: Replaced border-accent/50 bg-white and text-dark-text (implicitly for children) with inline styles
        style={{
          backgroundColor: "white",
          borderColor: `${ACCENT}80`, // 80 is 50% opacity
          color: DARK_TEXT,
        }}
      >
        <Container className="text-center">
          {/* ENHANCEMENT: Refined title and subtitle for maximum engagement */}
          <h2 className={`${DESIGN_SYSTEM.typography.h2} mb-4`}>
            Devenez le **Pilier de l'Espoir** et Rejoignez Notre Mission de
            **Solidarité**
          </h2>
          <p
            className={`${DESIGN_SYSTEM.typography.body} mb-8 max-w-2xl mx-auto`}
          >
            Chaque don, chaque heure de bénévolat est un investissement direct
            dans la **dignité** et l'**autonomie** des communautés vulnérables
            au Maroc. Votre action crée un impact **durable**.
          </p>
          <Link
            href="/contact"
            className="px-10 py-4 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 inline-block"
            // FIX: Replaced bg-accent text-white with inline styles
            style={{ backgroundColor: ACCENT, color: "white" }}
          >
            Soutenir la Fondation
          </Link>
        </Container>
      </section>
    </div>
  );
}
