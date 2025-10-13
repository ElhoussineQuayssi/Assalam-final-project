import fs from 'fs';

function cleanProjectContent(projects) {
  return projects.map(project => {
    const cleanedProject = { ...project };

    cleanedProject.content = project.content.map(block => {
      if (block.type === 'text' && block.content.text) {
        // Remove markdown headers and clean formatting
        let cleanedText = block.content.text
          .replace(/^## .+$/gm, '') // Remove ## headers
          .replace(/\*\*(.+?)\*\*/g, '$1') // Remove **bold** markers
          .replace(/\n\n+/g, '\n\n') // Normalize multiple newlines
          .replace(/^\n+/, '') // Remove leading newlines
          .replace(/\n+$/, '') // Remove trailing newlines
          .trim();

        return {
          ...block,
          content: {
            ...block.content,
            text: cleanedText
          }
        };
      } else if (block.type === 'team' && block.content.members) {
        // Clean team member roles
        const cleanedMembers = block.content.members.map(member => ({
          ...member,
          role: member.role.replace(/\*\*(.+?)\*\*/g, '$1').trim()
        }));

        return {
          ...block,
          content: {
            ...block.content,
            members: cleanedMembers
          }
        };
      } else if (block.type === 'list' && block.content.items) {
        // Clean list items
        const cleanedItems = block.content.items.map(item =>
          item.replace(/\*\*(.+?)\*\*/g, '$1').trim()
        );

        return {
          ...block,
          content: {
            ...block.content,
            items: cleanedItems
          }
        };
      }

      return block;
    });

    return cleanedProject;
  });
}

function main() {
  const projectsData = JSON.parse(fs.readFileSync('parsed-projects.json', 'utf-8'));
  const cleanedProjects = cleanProjectContent(projectsData);

  fs.writeFileSync('parsed-projects.json', JSON.stringify(cleanedProjects, null, 2));
  console.log('Cleaned parsed-projects.json');
}

main();