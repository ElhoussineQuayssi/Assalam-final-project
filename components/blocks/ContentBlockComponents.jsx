import { Trash2, Plus, Move } from "lucide-react";

export function TextBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre de la section"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.heading || ""}
        onChange={(e) => updateContentBlock(block.id, { heading: e.target.value })}
      />
      <textarea
        placeholder="Contenu du texte..."
        rows="4"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.text || ""}
        onChange={(e) => updateContentBlock(block.id, { text: e.target.value })}
      ></textarea>
    </div>
  );
}

export function ImageBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="url"
        placeholder="URL de l'image"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.src || ""}
        onChange={(e) => updateContentBlock(block.id, { src: e.target.value })}
      />
      <input
        type="text"
        placeholder="Texte alternatif"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.alt || ""}
        onChange={(e) => updateContentBlock(block.id, { alt: e.target.value })}
      />
      <input
        type="text"
        placeholder="Légende (optionnel)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.caption || ""}
        onChange={(e) => updateContentBlock(block.id, { caption: e.target.value })}
      />
    </div>
  );
}

export function ListBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre de la liste"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      {block.content.items?.map((item, itemIndex) => (
        <div key={itemIndex} className="flex gap-2">
          <input
            type="text"
            placeholder={`Élément ${itemIndex + 1}`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={item}
            onChange={(e) => {
              const newItems = [...block.content.items];
              newItems[itemIndex] = e.target.value;
              updateContentBlock(block.id, { items: newItems });
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newItems = block.content.items.filter((_, i) => i !== itemIndex);
              updateContentBlock(block.id, { items: newItems });
            }}
            className="text-red-400 hover:text-red-600 px-2"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newItems = [...(block.content.items || []), ""];
          updateContentBlock(block.id, { items: newItems });
        }}
        className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Ajouter un élément
      </button>
    </div>
  );
}

export function QuoteBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <textarea
        placeholder="Texte de la citation..."
        rows="3"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.text || ""}
        onChange={(e) => updateContentBlock(block.id, { text: e.target.value })}
      />
      <input
        type="text"
        placeholder="Auteur (optionnel)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.author || ""}
        onChange={(e) => updateContentBlock(block.id, { author: e.target.value })}
      />
    </div>
  );
}

export function TestimonialBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Nom du témoin"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.name || ""}
        onChange={(e) => updateContentBlock(block.id, { name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Rôle/Poste"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.role || ""}
        onChange={(e) => updateContentBlock(block.id, { role: e.target.value })}
      />
      <textarea
        placeholder="Témoignage..."
        rows="4"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.content || ""}
        onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
      />
      <input
        type="url"
        placeholder="Photo du témoin (optionnel)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.image || ""}
        onChange={(e) => updateContentBlock(block.id, { image: e.target.value })}
      />
    </div>
  );
}

export function StatsBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre des statistiques"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      {block.content.stats?.map((stat, statIndex) => (
        <div key={statIndex} className="flex gap-2">
          <input
            type="text"
            placeholder="Libellé"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={stat.label || ""}
            onChange={(e) => {
              const newStats = [...block.content.stats];
              newStats[statIndex] = { ...newStats[statIndex], label: e.target.value };
              updateContentBlock(block.id, { stats: newStats });
            }}
          />
          <input
            type="text"
            placeholder="Valeur"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={stat.value || ""}
            onChange={(e) => {
              const newStats = [...block.content.stats];
              newStats[statIndex] = { ...newStats[statIndex], value: e.target.value };
              updateContentBlock(block.id, { stats: newStats });
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newStats = block.content.stats.filter((_, i) => i !== statIndex);
              updateContentBlock(block.id, { stats: newStats });
            }}
            className="text-red-400 hover:text-red-600 px-2"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newStats = [...(block.content.stats || []), { label: "", value: "" }];
          updateContentBlock(block.id, { stats: newStats });
        }}
        className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Ajouter une statistique
      </button>
    </div>
  );
}

export function TimelineBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre de la chronologie"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      {block.content.events?.map((event, eventIndex) => (
        <div key={eventIndex} className="border border-gray-200 rounded-lg p-3">
          <input
            type="text"
            placeholder="Année"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={event.year || ""}
            onChange={(e) => {
              const newEvents = [...block.content.events];
              newEvents[eventIndex] = { ...newEvents[eventIndex], year: e.target.value };
              updateContentBlock(block.id, { events: newEvents });
            }}
          />
          <input
            type="text"
            placeholder="Titre de l'événement"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={event.title || ""}
            onChange={(e) => {
              const newEvents = [...block.content.events];
              newEvents[eventIndex] = { ...newEvents[eventIndex], title: e.target.value };
              updateContentBlock(block.id, { events: newEvents });
            }}
          />
          <textarea
            placeholder="Description de l'événement..."
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={event.description || ""}
            onChange={(e) => {
              const newEvents = [...block.content.events];
              newEvents[eventIndex] = { ...newEvents[eventIndex], description: e.target.value };
              updateContentBlock(block.id, { events: newEvents });
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newEvents = block.content.events.filter((_, i) => i !== eventIndex);
              updateContentBlock(block.id, { events: newEvents });
            }}
            className="text-red-400 hover:text-red-600 text-sm mt-2"
          >
            Supprimer cet événement
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newEvents = [...(block.content.events || []), { year: "", title: "", description: "" }];
          updateContentBlock(block.id, { events: newEvents });
        }}
        className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Ajouter un événement
      </button>
    </div>
  );
}

export function FaqBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre de la FAQ"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      {block.content.questions?.map((question, questionIndex) => (
        <div key={questionIndex} className="border border-gray-200 rounded-lg p-3">
          <input
            type="text"
            placeholder="Question"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={question.question || ""}
            onChange={(e) => {
              const newQuestions = [...block.content.questions];
              newQuestions[questionIndex] = { ...newQuestions[questionIndex], question: e.target.value };
              updateContentBlock(block.id, { questions: newQuestions });
            }}
          />
          <textarea
            placeholder="Réponse..."
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={question.answer || ""}
            onChange={(e) => {
              const newQuestions = [...block.content.questions];
              newQuestions[questionIndex] = { ...newQuestions[questionIndex], answer: e.target.value };
              updateContentBlock(block.id, { questions: newQuestions });
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newQuestions = block.content.questions.filter((_, i) => i !== questionIndex);
              updateContentBlock(block.id, { questions: newQuestions });
            }}
            className="text-red-400 hover:text-red-600 text-sm mt-2"
          >
            Supprimer cette question
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newQuestions = [...(block.content.questions || []), { question: "", answer: "" }];
          updateContentBlock(block.id, { questions: newQuestions });
        }}
        className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Ajouter une question
      </button>
    </div>
  );
}

export function CtaBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre de l'appel à l'action"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      <textarea
        placeholder="Description..."
        rows="3"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.description || ""}
        onChange={(e) => updateContentBlock(block.id, { description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Texte du bouton"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.buttonText || ""}
        onChange={(e) => updateContentBlock(block.id, { buttonText: e.target.value })}
      />
      <input
        type="url"
        placeholder="URL du bouton"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.buttonUrl || ""}
        onChange={(e) => updateContentBlock(block.id, { buttonUrl: e.target.value })}
      />
    </div>
  );
}

export function FileBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre du fichier"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      <textarea
        placeholder="Description du fichier..."
        rows="3"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.description || ""}
        onChange={(e) => updateContentBlock(block.id, { description: e.target.value })}
      />
      <input
        type="url"
        placeholder="URL du fichier"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.fileUrl || ""}
        onChange={(e) => updateContentBlock(block.id, { fileUrl: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nom du fichier (optionnel)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.fileName || ""}
        onChange={(e) => updateContentBlock(block.id, { fileName: e.target.value })}
      />
    </div>
  );
}

export function MapBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre de la carte"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Adresse complète"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.address || ""}
        onChange={(e) => updateContentBlock(block.id, { address: e.target.value })}
      />
      <input
        type="url"
        placeholder="URL d'intégration Google Maps (optionnel)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.embedUrl || ""}
        onChange={(e) => updateContentBlock(block.id, { embedUrl: e.target.value })}
      />
    </div>
  );
}

export function VideoBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="url"
        placeholder="URL de la vidéo (YouTube, Vimeo, etc.)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.url || ""}
        onChange={(e) => updateContentBlock(block.id, { url: e.target.value })}
      />
      <input
        type="text"
        placeholder="Titre de la vidéo (optionnel)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      <textarea
        placeholder="Description de la vidéo (optionnel)..."
        rows="3"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.description || ""}
        onChange={(e) => updateContentBlock(block.id, { description: e.target.value })}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`autoplay-${block.id}`}
          checked={block.content.autoplay || false}
          onChange={(e) => updateContentBlock(block.id, { autoplay: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor={`autoplay-${block.id}`} className="text-sm text-gray-700">
          Lecture automatique
        </label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`controls-${block.id}`}
          checked={block.content.showControls !== false}
          onChange={(e) => updateContentBlock(block.id, { showControls: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor={`controls-${block.id}`} className="text-sm text-gray-700">
          Afficher les contrôles
        </label>
      </div>
    </div>
  );
}

export function AwardBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre de la récompense"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      <textarea
        placeholder="Description de la récompense..."
        rows="3"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.description || ""}
        onChange={(e) => updateContentBlock(block.id, { description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Émetteur de la récompense"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.issuer || ""}
        onChange={(e) => updateContentBlock(block.id, { issuer: e.target.value })}
      />
      <input
        type="text"
        placeholder="Année d'obtention"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.year || ""}
        onChange={(e) => updateContentBlock(block.id, { year: e.target.value })}
      />
      <input
        type="url"
        placeholder="Image de la récompense (optionnel)"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.image || ""}
        onChange={(e) => updateContentBlock(block.id, { image: e.target.value })}
      />
    </div>
  );
}
export function ProgrammeBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Titre du programme"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Durée du programme"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.duration || ""}
        onChange={(e) => updateContentBlock(block.id, { duration: e.target.value })}
      />

      <div>
        <h4 className="text-sm font-medium mb-2">Modules du programme</h4>
        {block.content.modules?.map((module, moduleIndex) => (
          <div key={moduleIndex} className="border border-gray-200 rounded-lg p-3 mb-3">
            <input
              type="text"
              placeholder="Titre du module"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={module.title || ""}
              onChange={(e) => {
                const newModules = [...block.content.modules];
                newModules[moduleIndex] = { ...newModules[moduleIndex], title: e.target.value };
                updateContentBlock(block.id, { modules: newModules });
              }}
            />
            <textarea
              placeholder="Description du module"
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={module.description || ""}
              onChange={(e) => {
                const newModules = [...block.content.modules];
                newModules[moduleIndex] = { ...newModules[moduleIndex], description: e.target.value };
                updateContentBlock(block.id, { modules: newModules });
              }}
            />
            <input
              type="text"
              placeholder="Durée du module"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={module.duration || ""}
              onChange={(e) => {
                const newModules = [...block.content.modules];
                newModules[moduleIndex] = { ...newModules[moduleIndex], duration: e.target.value };
                updateContentBlock(block.id, { modules: newModules });
              }}
            />
            <button
              type="button"
              onClick={() => {
                const newModules = block.content.modules.filter((_, i) => i !== moduleIndex);
                updateContentBlock(block.id, { modules: newModules });
              }}
              className="text-red-400 hover:text-red-600 text-sm mt-2"
            >
              Supprimer ce module
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newModules = [...(block.content.modules || []), { title: "", description: "", duration: "" }];
            updateContentBlock(block.id, { modules: newModules });
          }}
          className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Ajouter un module
        </button>
      </div>

      <input
        type="text"
        placeholder="Certification obtenue"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.certification || ""}
        onChange={(e) => updateContentBlock(block.id, { certification: e.target.value })}
      />
    </div>
  );
}

export function ServicesBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Titre des services"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />

      <div>
        <h4 className="text-sm font-medium mb-2">Catégories de services</h4>
        {block.content.categories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-gray-200 rounded-lg p-3 mb-3">
            <input
              type="text"
              placeholder="Nom de la catégorie"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={category.name || ""}
              onChange={(e) => {
                const newCategories = [...block.content.categories];
                newCategories[categoryIndex] = { ...newCategories[categoryIndex], name: e.target.value };
                updateContentBlock(block.id, { categories: newCategories });
              }}
            />

            <div className="ml-4">
              <h5 className="text-xs font-medium mb-1">Services dans cette catégorie</h5>
              {category.services?.map((service, serviceIndex) => (
                <div key={serviceIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nom du service"
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={service.name || ""}
                    onChange={(e) => {
                      const newCategories = [...block.content.categories];
                      const newServices = [...newCategories[categoryIndex].services];
                      newServices[serviceIndex] = { ...newServices[serviceIndex], name: e.target.value };
                      newCategories[categoryIndex] = { ...newCategories[categoryIndex], services: newServices };
                      updateContentBlock(block.id, { categories: newCategories });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={service.description || ""}
                    onChange={(e) => {
                      const newCategories = [...block.content.categories];
                      const newServices = [...newCategories[categoryIndex].services];
                      newServices[serviceIndex] = { ...newServices[serviceIndex], description: e.target.value };
                      newCategories[categoryIndex] = { ...newCategories[categoryIndex], services: newServices };
                      updateContentBlock(block.id, { categories: newCategories });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newCategories = [...block.content.categories];
                      const newServices = newCategories[categoryIndex].services.filter((_, i) => i !== serviceIndex);
                      newCategories[categoryIndex] = { ...newCategories[categoryIndex], services: newServices };
                      updateContentBlock(block.id, { categories: newCategories });
                    }}
                    className="text-red-400 hover:text-red-600 px-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newCategories = [...block.content.categories];
                  const newServices = [...(newCategories[categoryIndex].services || []), { name: "", description: "" }];
                  newCategories[categoryIndex] = { ...newCategories[categoryIndex], services: newServices };
                  updateContentBlock(block.id, { categories: newCategories });
                }}
                className="text-blue-500 hover:text-blue-600 text-xs flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Ajouter un service
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                const newCategories = block.content.categories.filter((_, i) => i !== categoryIndex);
                updateContentBlock(block.id, { categories: newCategories });
              }}
              className="text-red-400 hover:text-red-600 text-sm mt-2"
            >
              Supprimer cette catégorie
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newCategories = [...(block.content.categories || []), { name: "", services: [] }];
            updateContentBlock(block.id, { categories: newCategories });
          }}
          className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Ajouter une catégorie
        </button>
      </div>
    </div>
  );
}

export function SponsorshipBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Titre des formules de parrainage"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />

      <div>
        <h4 className="text-sm font-medium mb-2">Options de parrainage</h4>
        {block.content.options?.map((option, optionIndex) => (
          <div key={optionIndex} className="border border-gray-200 rounded-lg p-3 mb-3">
            <input
              type="text"
              placeholder="Nom de la formule"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={option.name || ""}
              onChange={(e) => {
                const newOptions = [...block.content.options];
                newOptions[optionIndex] = { ...newOptions[optionIndex], name: e.target.value };
                updateContentBlock(block.id, { options: newOptions });
              }}
            />
            <textarea
              placeholder="Description de la formule"
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={option.description || ""}
              onChange={(e) => {
                const newOptions = [...block.content.options];
                newOptions[optionIndex] = { ...newOptions[optionIndex], description: e.target.value };
                updateContentBlock(block.id, { options: newOptions });
              }}
            />

            <div className="ml-4">
              <h5 className="text-xs font-medium mb-1">Avantages inclus</h5>
              {option.benefits?.map((benefit, benefitIndex) => (
                <div key={benefitIndex} className="flex gap-2 mb-1">
                  <input
                    type="text"
                    placeholder="Avantage"
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={benefit}
                    onChange={(e) => {
                      const newOptions = [...block.content.options];
                      const newBenefits = [...newOptions[optionIndex].benefits];
                      newBenefits[benefitIndex] = e.target.value;
                      newOptions[optionIndex] = { ...newOptions[optionIndex], benefits: newBenefits };
                      updateContentBlock(block.id, { options: newOptions });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newOptions = [...block.content.options];
                      const newBenefits = newOptions[optionIndex].benefits.filter((_, i) => i !== benefitIndex);
                      newOptions[optionIndex] = { ...newOptions[optionIndex], benefits: newBenefits };
                      updateContentBlock(block.id, { options: newOptions });
                    }}
                    className="text-red-400 hover:text-red-600 px-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newOptions = [...block.content.options];
                  const newBenefits = [...(newOptions[optionIndex].benefits || []), ""];
                  newOptions[optionIndex] = { ...newOptions[optionIndex], benefits: newBenefits };
                  updateContentBlock(block.id, { options: newOptions });
                }}
                className="text-blue-500 hover:text-blue-600 text-xs flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Ajouter un avantage
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                const newOptions = block.content.options.filter((_, i) => i !== optionIndex);
                updateContentBlock(block.id, { options: newOptions });
              }}
              className="text-red-400 hover:text-red-600 text-sm mt-2"
            >
              Supprimer cette formule
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newOptions = [...(block.content.options || []), { name: "", description: "", benefits: [] }];
            updateContentBlock(block.id, { options: newOptions });
          }}
          className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Ajouter une formule
        </button>
      </div>
    </div>
  );
}

export function GalleryBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre de la galerie"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      {block.content.images?.map((image, imageIndex) => (
        <div key={imageIndex} className="flex gap-2">
          <input
            type="url"
            placeholder={`URL de l'image ${imageIndex + 1}`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={image}
            onChange={(e) => {
              const newImages = [...block.content.images];
              newImages[imageIndex] = e.target.value;
              updateContentBlock(block.id, { images: newImages });
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newImages = block.content.images.filter((_, i) => i !== imageIndex);
              updateContentBlock(block.id, { images: newImages });
            }}
            className="text-red-400 hover:text-red-600 px-2"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newImages = [...(block.content.images || []), ""];
          updateContentBlock(block.id, { images: newImages });
        }}
        className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Ajouter une image
      </button>
    </div>
  );
}

export function ImpactBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Titre de l'impact"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />
      {block.content.impacts?.map((impact, impactIndex) => (
        <div key={impactIndex} className="flex gap-2">
          <input
            type="text"
            placeholder="Description de l'impact"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={impact.description || ""}
            onChange={(e) => {
              const newImpacts = [...block.content.impacts];
              newImpacts[impactIndex] = { ...newImpacts[impactIndex], description: e.target.value };
              updateContentBlock(block.id, { impacts: newImpacts });
            }}
          />
          <input
            type="text"
            placeholder="Valeur"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={impact.value || ""}
            onChange={(e) => {
              const newImpacts = [...block.content.impacts];
              newImpacts[impactIndex] = { ...newImpacts[impactIndex], value: e.target.value };
              updateContentBlock(block.id, { impacts: newImpacts });
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newImpacts = block.content.impacts.filter((_, i) => i !== impactIndex);
              updateContentBlock(block.id, { impacts: newImpacts });
            }}
            className="text-red-400 hover:text-red-600 px-2"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newImpacts = [...(block.content.impacts || []), { description: "", value: "" }];
          updateContentBlock(block.id, { impacts: newImpacts });
        }}
        className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Ajouter un impact
      </button>
    </div>
  );
}

export function TeamBlock({ block, updateContentBlock, removeContentBlock }) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Titre de l'équipe"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content.title || ""}
        onChange={(e) => updateContentBlock(block.id, { title: e.target.value })}
      />

      <div>
        <h4 className="text-sm font-medium mb-2">Membres de l'équipe</h4>
        {block.content.members?.map((member, memberIndex) => (
          <div key={memberIndex} className="border border-gray-200 rounded-lg p-3 mb-3">
            <input
              type="text"
              placeholder="Rôle/Poste"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={member.role || ""}
              onChange={(e) => {
                const newMembers = [...block.content.members];
                newMembers[memberIndex] = { ...newMembers[memberIndex], role: e.target.value };
                updateContentBlock(block.id, { members: newMembers });
              }}
            />

            <div className="ml-4">
              <h5 className="text-xs font-medium mb-1">Responsabilités</h5>
              {member.responsibilities?.map((responsibility, respIndex) => (
                <div key={respIndex} className="flex gap-2 mb-1">
                  <input
                    type="text"
                    placeholder="Responsabilité"
                    className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={responsibility}
                    onChange={(e) => {
                      const newMembers = [...block.content.members];
                      const newResponsibilities = [...newMembers[memberIndex].responsibilities];
                      newResponsibilities[respIndex] = e.target.value;
                      newMembers[memberIndex] = { ...newMembers[memberIndex], responsibilities: newResponsibilities };
                      updateContentBlock(block.id, { members: newMembers });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newMembers = [...block.content.members];
                      const newResponsibilities = newMembers[memberIndex].responsibilities.filter((_, i) => i !== respIndex);
                      newMembers[memberIndex] = { ...newMembers[memberIndex], responsibilities: newResponsibilities };
                      updateContentBlock(block.id, { members: newMembers });
                    }}
                    className="text-red-400 hover:text-red-600 px-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newMembers = [...block.content.members];
                  const newResponsibilities = [...(newMembers[memberIndex].responsibilities || []), ""];
                  newMembers[memberIndex] = { ...newMembers[memberIndex], responsibilities: newResponsibilities };
                  updateContentBlock(block.id, { members: newMembers });
                }}
                className="text-blue-500 hover:text-blue-600 text-xs flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Ajouter une responsabilité
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                const newMembers = block.content.members.filter((_, i) => i !== memberIndex);
                updateContentBlock(block.id, { members: newMembers });
              }}
              className="text-red-400 hover:text-red-600 text-sm mt-2"
            >
              Supprimer ce membre
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newMembers = [...(block.content.members || []), { role: "", responsibilities: [] }];
            updateContentBlock(block.id, { members: newMembers });
          }}
          className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Ajouter un membre
        </button>
      </div>
    </div>
  );
}
