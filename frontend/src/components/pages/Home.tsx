import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { ThemeToggle } from "./Theme-Toggle"
import { AddContentDialog } from "./Content";
import { ShareBrainDialog } from "./Share-Brain";
import { ShareNoteDialog } from "./Share-Note";
import { EditContentDialog } from "./Edit-Content";
import { NoteCard } from './Note-card'
import type { Note, InsertNote } from "./Schema";

type SidebarFilter = "all" | "tweets" | "videos" | "documents" | "links" | "tags";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<SidebarFilter>("all");
  const [notes, setNotes] = useState<Note[]>([]);
  const [shareNote, setShareNote] = useState<Note | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleAddNote = (insertNote: InsertNote) => {
    const newNote: Note = {
      ...insertNote,
      id: Math.random().toString(36).substring(7),
      url: insertNote.url || null,
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (note: Note) => {
    setEditNote(note);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const handleShareNote = (note: Note) => {
    setShareNote(note);
    setShareDialogOpen(true);
  };

  const filteredNotes = activeFilter === "all"
    ? notes
    : notes.filter(note => note.type === activeFilter.slice(0, -1));

  const counts = {
    all: notes.length,
    tweets: notes.filter(n => n.type === "tweet").length,
    videos: notes.filter(n => n.type === "video").length,
    documents: notes.filter(n => n.type === "document" || n.type === "article").length,
    links: notes.filter(n => n.type === "link").length,
    tags: Array.from(new Set(notes.flatMap(n => n.tags))).length,
  };

  const filterTitle = activeFilter === "all" 
    ? "All Notes" 
    : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2 ml-auto">
              <ShareBrainDialog />
              <AddContentDialog onAdd={handleAddNote} />
              <ThemeToggle />
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
              <h1 className="text-2xl font-semibold mb-6" data-testid="text-page-title">
                {filterTitle}
              </h1>
              
              {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-muted-foreground mb-4">
                    <svg
                      className="h-12 w-12 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg mb-2">No content yet</p>
                    <p className="text-sm">Start building your second brain by adding your first note</p>
                  </div>
                  <AddContentDialog onAdd={handleAddNote} />
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                  <p className="text-lg">No {activeFilter} found</p>
                  <p className="text-sm mt-2">Try selecting a different filter</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={handleEditNote}
                      onShare={handleShareNote}
                      onDelete={handleDeleteNote}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      
      <ShareNoteDialog
        note={shareNote}
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
      />
      
      <EditContentDialog
        note={editNote}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveEdit}
      />
    </SidebarProvider>
  );
}
