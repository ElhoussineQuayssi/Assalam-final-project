'use client';

import { useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Import extracted components
import Container from '@/components/Container/Container.jsx';
import SectionHeader from '@/components/SectionHeader/SectionHeader.jsx';
import ContentGrid from '@/components/ContentGrid/ContentGrid.jsx';
import ImageTextSection from '@/components/ImageTextSection/ImageTextSection.jsx';
import HeroSection from '@/components/HeroSection/HeroSection.jsx';
import TestimonialCard from '@/components/TestimonialCard/TestimonialCard.jsx';
import ContentCard from '@/components/ContentCard/ContentCard.jsx';
import StatsCard from '@/components/StatsCard/StatsCard.jsx';
// Design System Configuration
const DESIGN_SYSTEM = {
  spacing: {
    sectionPadding: 'py-16 px-6'
  },
  typography: {
    h2: 'text-2xl font-bold',
    body: 'text-base'
  }
};

// Color constants (matching the design system)
const ACCENT = '#6495ED'; // Cornflower Blue
const PRIMARY_LIGHT = '#B0E0E6'; // Powder Blue
const DARK_TEXT = '#333333'; // Dark Gray


import StatsCard from 'components/StatsCard/StatsCard.jsx';
import { Timeline, TimelineItem, TimelineTitle, TimelineDescription } from 'components/Timeline/Timeline.jsx';

// Check if HeroSection component exists, if not create import
// Based on memory, HeroSection doesn't exist, so we need to create it
// But first, let's remove the inline component definitions and use existing ones

/**
 * Enhanced Home page component with blueprint design system
 * @returns {JSX.Element} Enhanced home page
 */
export default function Home() {
  // Inject blueprint styles and animations on component mount (no change needed here)
  useEffect(() => {
    const existingStyle = document.querySelector('#blueprint-styles');
    if (!existingStyle) {
      const styleElement = document.createElement('style');
      styleElement.id = 'blueprint-styles';
      styleElement.textContent = `
        /* Blueprint Keyframes */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Blueprint Card Lift Effect */
        .card-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px #6495ED26;
        }

        /* Blueprint Timeline Styling */
        .timeline-line {
          background-color: #B0E0E6;
        }

        .timeline-dot {
          background-color: #6495ED;
          box-shadow: 0 0 0 4px #B0E0E6;
        }

        /* Blueprint Scroll Reveal */
        .scroll-reveal {
          opacity: 0;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `;
      document.head.appendChild(styleElement);
    }

    // Initialize scroll reveal animations with IntersectionObserver
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Apply staggered animation delay based on element index
          const delay = index * 0.15;
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in');
            entry.target.style.opacity = 1;
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.15}s`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Original project data maintained
  const projects = [
    {
      title: 'Rayhana assalam',
      excerpt: 'Programme de soutien pour les femmes en difficulté.',
      image: '/projects/rayhana.jpg',
      link: '/projects/rayhanat-assalam',
    },
    {
      title: 'Kafala',
      excerpt: 'Programme de parrainage pour les orphelins.',
      image: '/projects/kafala.jpg',
      link: '/projects/kafala',
    },
    {
      title: 'Imtiaz',
      excerpt: 'Parrainage des étudiants brillants issus de milieux défavorisés.',
      image: '/projects/imtiaz.jpg',
      link: '/projects/projet-imtiaz',
    },
    {
      title: 'Fataer Al Baraka',
      excerpt: 'Centre de formation en pâtisserie marocaine pour femmes.',
      image: '/projects/fataer.jpg',
      link: '/projects/fataer-al-baraka',
    },
    {
      title: 'Centre Himaya',
      excerpt: 'Centre pluridisciplinaire de soutien aux femmes et enfants.',
      image: '/projects/center.jpg',
      link: '/projects/centre-himaya',
    },
    {
      title: 'Nadi Assalam',
      excerpt: "Un avenir cousu d'espoir.",
      image: '/projects/nadi.jpg',
      link: '/projects/nadi-assalam',
    },
  ];

  // Static blog data for demonstration (since this is now a client component)
  const blogs = [
    {
      id: 1,
      title: "Nouveau centre de formation ouvert à Marrakech",
      excerpt: "Découvrez notre nouveau centre de formation en pâtisserie qui vient d'ouvrir ses portes dans la médina de Marrakech.",
      image: "/blogs/training-center.jpg",
      slug: "centre-formation-marrakech",
      category: "Actualités",
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 2,
      title: "Résultats du programme Imtiaz 2024",
      excerpt: "Plus de 50 étudiants ont bénéficié de notre programme de parrainage cette année avec des résultats exceptionnels.",
      image: "/blogs/imtiaz-results.jpg",
      slug: "resultats-imtiaz-2024",
      category: "Impact",
      createdAt: new Date('2024-02-01'),
    },
    {
      id: 3,
      title: "Partenariat avec l'Université Mohammed V",
      excerpt: "Nouvelle collaboration pour soutenir l'éducation supérieure et accompagner les étudiants issus de milieux défavorisés.",
      image: "/blogs/partnership-um5.jpg",
      slug: "partenariat-universite-mohammed-v",
      category: "Partenariats",
      createdAt: new Date('2024-02-15'),
    },
  ];


  return (
    // FIX: Replace bg-background with inline style
    <div style={{ backgroundColor: '#FAFAFA' }} className="min-h-screen">
      {/* Hero Section - Blueprint pattern with primary-light background */}
      <HeroSection
        title={
          <>
            {/* FIX: Replace text-accent with inline style */}
            <span style={{ color: '#6495ED' }}>Assalam</span> - Ensemble pour un avenir meilleur
          </>
        }
        subtitle="Une fondation marocaine dédiée à l'amélioration des conditions de vie, à l'éducation et au développement durable au Maroc."
        actions={[
          {
            text: 'Nos Projets',
            href: '/projects',
          },
          {
            text: 'Faire un Don',
            href: '/contact',
          },
        ]}
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
              { value: '6+', title: 'Projets Actifs' },
              { value: '1000+', title: 'Bénéficiaires Aidés' },
              { value: '98%', title: 'Taux de Satisfaction' },
            ]}
            columns={{ default: 1, md: 3 }}
            renderItem={(stat, index) => (
              <StatsCard
                key={index}
                value={stat.value}
                title={stat.title}
              />
            )}
          />
        </Container>
      </section>

      {/* Projects Section - Enhanced with blueprint content cards */}
      {/* FIX: Replace bg-primary-light/50 with inline style (PRIMARY_LIGHT + 50% opacity) */}
      <section className={`${DESIGN_SYSTEM.spacing.sectionPadding}`} style={{ backgroundColor: `${PRIMARY_LIGHT}80` }}>
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
                key={index}
                title={project.title}
                excerpt={project.excerpt}
                image={project.image}
                link={project.link}
                index={index}
              />
            )}
          />

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
              // FIX: Replaced bg-accent text-white with inline styles
              style={{ backgroundColor: ACCENT, color: 'white' }}
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
          "Impact mesurable et suivi rigoureux des résultats."
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
                name: 'Amina El Mansouri',
                role: 'Bénéficiaire du projet Rayhana',
                // ENHANCEMENT: Refined quote for stronger emotional impact and core value integration
                quote: "Le projet **Rayhana** a été un tournant. J'ai retrouvé ma **dignité** et l'**autonomie** nécessaire pour bâtir un avenir stable pour mes enfants. C'est plus qu'une aide, c'est une nouvelle vie pleine d'espoir.",
              },
              {
                name: 'Karim Benali',
                role: 'Bénéficiaire du projet Imtiaz',
                // ENHANCEMENT: Refined quote for stronger emotional impact and core value integration
                quote: "**Imtiaz** a illuminé mon parcours. Il m'a permis de me concentrer sur mes études et de transformer la précarité en **opportunité**. Ce parrainage est la preuve que la **solidarité** peut changer un destin.",
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

      {/* Timeline Section - Blueprint pattern with primary line and accent dots */}
      {/* FIX: Replace bg-primary-light/30 with inline style (PRIMARY_LIGHT + 30% opacity) */}
      <section className={`${DESIGN_SYSTEM.spacing.sectionPadding}`} style={{ backgroundColor: `${PRIMARY_LIGHT}4D` }}>
        <Container>
          <SectionHeader
            title="Notre Processus Simple"
            subtitle="Une approche claire et efficace pour réaliser nos projets"
          />

          <Timeline>
            <TimelineItem>
              <TimelineTitle>1. Évaluation des Besoins</TimelineTitle>
              <TimelineDescription>Analyse approfondie des besoins réels de la communauté cible.</TimelineDescription>
            </TimelineItem>

            <TimelineItem>
              <TimelineTitle>2. Conception du Projet</TimelineTitle>
              <TimelineDescription>Développement d'une stratégie adaptée et durable.</TimelineDescription>
            </TimelineItem>

            <TimelineItem>
              <TimelineTitle>3. Mise en Œuvre</TimelineTitle>
              {/* ENHANCEMENT: Added 'et transparente' */}
              <TimelineDescription>Exécution rigoureuse et transparente sur le terrain.</TimelineDescription>
            </TimelineItem>

            <TimelineItem>
              <TimelineTitle>4. Évaluation & Impact</TimelineTitle>
              <TimelineDescription>Mesure de l'impact et ajustements pour optimisation.</TimelineDescription>
            </TimelineItem>
          </Timeline>
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
                style={{ backgroundColor: ACCENT, color: 'white' }}
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
          backgroundColor: 'white',
          borderColor: `${ACCENT}80`, // 80 is 50% opacity
          color: DARK_TEXT
        }}
      >
        <Container className="text-center">
          {/* ENHANCEMENT: Refined title and subtitle for maximum engagement */}
          <h2 className={`${DESIGN_SYSTEM.typography.h2} mb-4`}>Devenez le **Pilier de l'Espoir** et Rejoignez Notre Mission de **Solidarité**</h2>
          <p className={`${DESIGN_SYSTEM.typography.body} mb-8 max-w-2xl mx-auto`}>
            Chaque don, chaque heure de bénévolat est un investissement direct dans la **dignité** et l'**autonomie** des communautés vulnérables au Maroc. Votre action crée un impact **durable**.
          </p>
          <Link
            href="/contact"
            className="px-10 py-4 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 inline-block"
            // FIX: Replaced bg-accent text-white with inline styles
            style={{ backgroundColor: ACCENT, color: 'white' }}
          >
            Soutenir la Fondation
          </Link>
        </Container>
      </section>
    </div>
  );
}