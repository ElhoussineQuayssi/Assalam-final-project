import { getAllGalleryImages } from "@/lib/supabaseImages";
import UnifiedHero from "../UnifiedHero";

/**
 * Server Component that fetches and shuffles images for the UnifiedHero
 */
export default async function UnifiedHeroServer({ title, subtitle }) {
  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  try {
    // Fetch all gallery images
    const images = await getAllGalleryImages();
    
    // Shuffle the array of images
    const shuffledImages = shuffleArray([...images]);

    // Pass props to the client component
    return (
      <UnifiedHero 
        title={title}
        subtitle={subtitle}
        images={shuffledImages}
      />
    );
  } catch (error) {
    console.error('Error loading hero slideshow images:', error);
    // Fallback to default images if Supabase fetch fails
    return (
      <UnifiedHero 
        title={title}
        subtitle={subtitle}
        images={[
          "/projects/foundation1.jpg",
          "/projects/foundation2.jpg",
          "/projects/foundation3.jpg"
        ]}
      />
    );
  }
}