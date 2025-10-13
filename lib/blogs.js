// Données statiques pour les blogs

export function getBlogs() {
  return [
    {
      id: 1,
      title: "L'importance de l'éducation dans les zones rurales",
      slug: "importance-education-zones-rurales",
      excerpt:
        "Découvrez comment nos initiatives éducatives transforment la vie des enfants dans les régions rurales du Maroc.",
      content: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus justo, ut mattis felis aliquet non. Morbi mattis lorem id augue semper, non aliquam dolor aliquet. Nulla facilisi.",
        "Praesent quis risus ac nisi consectetur interdum. Nulla facilisi. Cras non lobortis nulla. Sed scelerisque metus sit amet tempor euismod. Nullam tincidunt, est vel sagittis volutpat, purus est sagittis magna, nec ultrices purus risus vel nisi.",
        "Donec euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
      ],
      image: "/placeholder.svg?height=800&width=600",
      category: "Éducation",
      tags: ["éducation", "ruralité", "enfants", "avenir"],
      date: "15 juin 2023",
      author: {
        name: "Ahmed Benjelloun",
        role: "Responsable des Projets Éducatifs",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Passionné d'éducation et de développement social, Ahmed travaille depuis plus de 10 ans dans le secteur associatif.",
      },
      readTime: 5,
      views: 1245,
      relatedPosts: [
        {
          slug: "succes-programme-alphabetisation",
          title: "Les succès de notre programme d'alphabétisation",
          date: "2 mai 2023",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          slug: "inauguration-nouvelle-ecole",
          title:
            "Inauguration d'une nouvelle école dans la région de Taroudant",
          date: "10 avril 2023",
          image: "/placeholder.svg?height=200&width=300",
        },
      ],
    },
    {
      id: 2,
      title: "Les défis de l'accès à l'eau potable",
      slug: "defis-acces-eau-potable",
      excerpt:
        "Un regard sur les problématiques d'accès à l'eau potable dans certaines régions du Maroc et nos solutions.",
      content: [],
      image: "/placeholder.svg?height=800&width=600",
      category: "Environnement",
      date: "28 mai 2023",
      author: {
        name: "Samira Alaoui",
        role: "Experte en Développement Durable",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      readTime: 7,
    },
    {
      id: 3,
      title: "Artisanat marocain : préserver le savoir-faire ancestral",
      slug: "artisanat-marocain-savoir-faire",
      excerpt:
        "Comment notre programme de soutien aux artisans contribue à préserver le patrimoine culturel marocain.",
      content: [],
      image: "/placeholder.svg?height=800&width=600",
      category: "Culture",
      date: "12 mai 2023",
      author: {
        name: "Karim Zidane",
        role: "Coordinateur des Projets Culturels",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      readTime: 6,
    },
    {
      id: 4,
      title: "Autonomisation des femmes rurales : un an après",
      slug: "autonomisation-femmes-rurales",
      excerpt:
        "Bilan de notre programme d'autonomisation des femmes rurales un an après son lancement.",
      content: [],
      image: "/placeholder.svg?height=800&width=600",
      category: "Social",
      date: "5 mai 2023",
      author: {
        name: "Nadia Benkhadra",
        role: "Responsable des Projets Féminins",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      readTime: 8,
    },
    {
      id: 5,
      title: "Santé mobile : nos caravanes médicales en chiffres",
      slug: "sante-mobile-caravanes-medicales",
      excerpt:
        "Découvrez l'impact de nos caravanes médicales qui sillonnent les régions reculées du pays.",
      content: [],
      image: "/placeholder.svg?height=800&width=600",
      category: "Santé",
      date: "20 avril 2023",
      author: {
        name: "Dr. Mehdi Chraibi",
        role: "Coordinateur Médical",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      readTime: 5,
    },
    {
      id: 6,
      title: "Jeunesse et emploi : former les entrepreneurs de demain",
      slug: "jeunesse-emploi-entrepreneurs",
      excerpt:
        "Notre nouveau programme de formation entrepreneuriale pour les jeunes des quartiers défavorisés.",
      content: [],
      image: "/placeholder.svg?height=800&width=600",
      category: "Éducation",
      date: "10 avril 2023",
      author: {
        name: "Younes Benali",
        role: "Responsable des Programmes Jeunesse",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      readTime: 6,
    },
  ];
}

export function getBlog(slug) {
  const blogs = getBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return null;

  // Si les contenus sont vides, on ajoute des données de remplissage pour la démo
  if (!blog.content || blog.content.length === 0) {
    blog.content = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus justo, ut mattis felis aliquet non. Morbi mattis lorem id augue semper, non aliquam dolor aliquet. Nulla facilisi.",
      "Praesent quis risus ac nisi consectetur interdum. Nulla facilisi. Cras non lobortis nulla. Sed scelerisque metus sit amet tempor euismod. Nullam tincidunt, est vel sagittis volutpat, purus est sagittis magna, nec ultrices purus risus vel nisi.",
      "Donec euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Donec euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
      "Integer ultricies rhoncus libero, nec eleifend purus interdum at. Fusce eu quam a augue lobortis dapibus eu in sapien. Aliquam id nisi malesuada, convallis sapien eget, mattis dui. Nullam vitae nisl ac nisi bibendum commodo.",
      "Sed auctor, magna in pulvinar lacinia, lacus nisi aliquam velit, at dignissim ante metus a elit. Sed auctor, magna in pulvinar lacinia, lacus nisi aliquam velit, at dignissim ante metus a elit.",
    ];
  }

  // Si pas de tags, on en ajoute
  if (!blog.tags) {
    const categories = ["maroc", "développement", "solidarité"];
    blog.tags = [blog.category.toLowerCase(), ...categories];
  }

  // Si pas de posts liés, on en ajoute
  if (!blog.relatedPosts) {
    blog.relatedPosts = blogs
      .filter((b) => b.id !== blog.id)
      .slice(0, 2)
      .map((b) => ({
        slug: b.slug,
        title: b.title,
        date: b.date,
        image: b.image,
      }));
  }

  return blog;
}
