import { Move, Trash2, Type, Image, List, Quote, Play, Users, BarChart3, Calendar, HelpCircle, Target, FileText, MapPin, Award, BookOpen, Heart, Users as UsersIcon, UserCheck, TrendingUp, Briefcase } from "lucide-react";
import {
  TextBlock,
  ImageBlock,
  ListBlock,
  QuoteBlock,
  VideoBlock,
  TestimonialBlock,
  StatsBlock,
  TimelineBlock,
  FaqBlock,
  CtaBlock,
  FileBlock,
  MapBlock,
  AwardBlock,
  ProgrammeBlock,
  ServicesBlock,
  SponsorshipBlock,
  ImpactBlock,
  TeamBlock,
} from "./ContentBlockComponents.jsx";

export default function ContentBlock({ block, index, contentTypes, updateContentBlock, removeContentBlock, handleDragStart, handleDragOver, handleDrop }) {
  const Icon = contentTypes.find(type => type.type === block.type)?.icon || Type;

  const renderBlockContent = () => {
    switch (block.type) {
      case "text":
        return <TextBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "image":
        return <ImageBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "list":
        return <ListBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "quote":
        return <QuoteBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "video":
        return <VideoBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "testimonial":
        return <TestimonialBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "stats":
        return <StatsBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "timeline":
        return <TimelineBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "faq":
        return <FaqBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "cta":
        return <CtaBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "file":
        return <FileBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "map":
        return <MapBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "award":
        return <AwardBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "programme":
        return <ProgrammeBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "services":
        return <ServicesBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "sponsorship":
        return <SponsorshipBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "impact":
        return <ImpactBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      case "team":
        return <TeamBlock block={block} updateContentBlock={updateContentBlock} removeContentBlock={removeContentBlock} />;
      default:
        return <div>Type de bloc non supporté</div>;
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-gray-500" />
          <span className="font-medium text-gray-700 capitalize">
            {contentTypes.find(type => type.type === block.type)?.label || block.type}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            title="Move"
          >
            <Move className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => removeContentBlock(block.id)}
            className="text-red-400 hover:text-red-600"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {renderBlockContent()}
    </div>
  );
}
