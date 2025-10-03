import { NoteCard } from "./Note-card";
import { ThemeProvider } from "./Theme-Provider";
import type { Note } from "./Schema";

export default function NoteCardExample() {
  const sampleNote: Note = {
    id: "1",
    title: "How to Build a Second Brain",
    content: "The best way to learn is to build in public. Share your progress, get feedback, and help others along the way. This creates a positive feedback loop that accelerates learning.",
    type: "article",
    tags: ["productivity", "learning"],
    url: "https://example.com/article",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  };

  const handleEdit = (note: Note) => {
    console.log("Edit note:", note.id);
  };

  const handleShare = (note: Note) => {
    console.log("Share note:", note.id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete note:", id);
  };

  return (
    <ThemeProvider>
      <div className="p-8 bg-background min-h-[400px]">
        <div className="max-w-sm">
          <NoteCard
            note={sampleNote}
            onEdit={handleEdit}
            onShare={handleShare}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
