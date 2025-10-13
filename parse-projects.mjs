import fs from 'fs';
import path from 'path';

const projectsDir = 'projects-info';

function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const project = {
    title: '',
    excerpt: '',
    categories: [],
    content: [],
    goals: [],
    gallery: []
  };

  let currentSection = null;
  let currentBlock = null;
  let inSpecialBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Parse title
    if (line.startsWith('# ')) {
      project.title = line.substring(2).trim();
      continue;
    }

    // Parse main sections (##)
    if (line.startsWith('## ')) {
      const sectionName = line.substring(3).trim();
      currentSection = sectionName;
      inSpecialBlock = false;

      // Create appropriate blocks based on section
      if (sectionName === 'Équipe professionnelle' || sectionName === 'Équipe pédagogique') {
        currentBlock = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: 'team',
          content: { title: sectionName, members: [] }
        };
        project.content.push(currentBlock);
        inSpecialBlock = true;
      } else if (sectionName === 'Services offerts') {
        currentBlock = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: 'services',
          content: { title: sectionName, categories: [] }
        };
        project.content.push(currentBlock);
        inSpecialBlock = true;
      } else if (sectionName === 'Formules de parrainage') {
        currentBlock = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: 'sponsorship',
          content: { title: sectionName, options: [] }
        };
        project.content.push(currentBlock);
        inSpecialBlock = true;
      } else if (sectionName === 'Caractéristiques de la formation' || sectionName === 'Programme éducatif' ||
                 sectionName === 'Infrastructure' || sectionName === 'Méthodologie d\'accompagnement' ||
                 sectionName === 'Critères d\'éligibilité') {
        currentBlock = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: 'programme',
          content: { title: sectionName, modules: [] }
        };
        project.content.push(currentBlock);
        inSpecialBlock = true;
      } else if (sectionName === 'Objectifs spécifiques' || sectionName === 'Objectifs' ||
                 sectionName === 'Objectifs pédagogiques' || sectionName === 'Engagements du programme') {
        currentBlock = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: 'list',
          content: { title: sectionName, items: [] }
        };
        project.content.push(currentBlock);
        inSpecialBlock = true;
      } else {
        // Default to text block for all other sections
        currentBlock = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: 'text',
          content: { title: sectionName, text: '' }
        };
        project.content.push(currentBlock);
      }
      continue;
    }

    // Handle special block parsing
    if (inSpecialBlock && currentBlock) {
      if (currentBlock.type === 'team') {
        if (line.startsWith('- **') || line.startsWith('- ')) {
          const roleMatch = line.match(/- \*\*(.+?)\*\*: (.+)/) || line.match(/- (.+)/);
          if (roleMatch) {
            const role = roleMatch[1];
            const description = roleMatch[2] || '';
            currentBlock.content.members.push({
              role: role,
              responsibilities: description ? [description] : []
            });
          }
        }
      } else if (currentBlock.type === 'services') {
        if (line.startsWith('### ')) {
          const categoryName = line.substring(4).trim();
          currentBlock.content.categories.push({
            name: categoryName,
            services: []
          });
        } else if (line.startsWith('- ')) {
          const serviceText = line.substring(2).trim();
          const lastCategory = currentBlock.content.categories[currentBlock.content.categories.length - 1];
          if (lastCategory) {
            lastCategory.services.push({
              name: serviceText,
              description: ''
            });
          }
        }
      } else if (currentBlock.type === 'sponsorship') {
        if (line.startsWith('### ')) {
          const optionName = line.substring(4).trim();
          currentBlock.content.options.push({
            name: optionName,
            description: '',
            benefits: []
          });
        } else if (line.startsWith('- ')) {
          const lastOption = currentBlock.content.options[currentBlock.content.options.length - 1];
          if (lastOption) {
            lastOption.benefits.push(line.substring(2).trim());
          }
        }
      } else if (currentBlock.type === 'list') {
        if (line.startsWith('- ')) {
          currentBlock.content.items.push(line.substring(2).trim());
        }
      }
    } else if (currentBlock && currentBlock.type === 'text') {
      // Accumulate all content in text blocks
      currentBlock.content.text += line + '\n';
    }

    // Set excerpt from mission or description
    if (currentSection === 'Mission' || currentSection === 'Description du projet') {
      if (line && !line.startsWith('#') && !line.startsWith('**') && line.length > 10) {
        project.excerpt = line.substring(0, 150) + (line.length > 150 ? '...' : '');
      }
    }

    // Set categories based on project type
    if (currentSection === 'Informations générales' && line.startsWith('**Type :**')) {
      const type = line.substring(10).trim();
      if (type.includes('formation') || type.includes('Formation')) {
        project.categories.push('Formation professionnelle');
      } else if (type.includes('parrainage') || type.includes('Centre d\'accueil') || type.includes('protection')) {
        project.categories.push('Protection sociale');
      } else if (type.includes('éducation') || type.includes('Éducation')) {
        project.categories.push('Éducation');
      } else if (type.includes('développement social')) {
        project.categories.push('Développement social');
      }
    }
  }

  // Set default categories if none found
  if (project.categories.length === 0) {
    project.categories = ['Développement social'];
  }

  // Add goals based on impact section
  if (project.content.some(block => block.content.text && block.content.text.includes('ODD'))) {
    project.goals = [
      'Contribuer aux Objectifs de Développement Durable',
      'Améliorer les conditions de vie des populations vulnérables',
      'Promouvoir l\'égalité et la justice sociale'
    ];
  }

  return project;
}

function main() {
  const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md') && file !== 'README.md');

  const projects = [];

  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    console.log(`Parsing ${file}...`);

    const project = parseMarkdownFile(filePath);
    project.slug = file.replace('.md', '');
    project.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    project.status = 'Actif';
    project.createdAt = new Date().toISOString();

    projects.push(project);
  }

  // Write to a JSON file for review
  fs.writeFileSync('parsed-projects.json', JSON.stringify(projects, null, 2));
  console.log(`Parsed ${projects.length} projects and saved to parsed-projects.json`);
}

main();