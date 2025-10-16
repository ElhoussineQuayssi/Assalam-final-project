import {
  Newspaper,
  FolderOpen,
  Mail,
  Eye,
  Users,
  CheckCircle,
  FileText,
} from "lucide-react";

const AdminStatsCard = ({ title, value, type }) => {
  let Icon = Mail;

  switch (type) {
    case "articles":
      Icon = Newspaper;
      break;
    case "projects":
      Icon = FolderOpen;
      break;
    case "messages":
      Icon = Mail;
      break;
    case "views":
      Icon = Eye;
      break;
    case "admins":
      Icon = Users;
      break;
    default:
      Icon = CheckCircle;
  }

  return (
    <div
      className="card-lift bg-white p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border-l-4"
      style={{ borderColor: "#6495ED" }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#B0E0E6" }}
        >
          <Icon className="h-8 w-8" style={{ color: "#6495ED" }} />
        </div>
      </div>
      <div className="mt-8">
        <p
          className="text-5xl font-extrabold mb-3"
          style={{ color: "#333333" }}
        >
          {value}
        </p>
        <h3 className="text-xl font-semibold" style={{ color: "#333333" }}>
          {title}
        </h3>
      </div>
    </div>
  );
};

export default AdminStatsCard;
