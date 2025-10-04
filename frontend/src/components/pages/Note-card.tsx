import { Share2, Trash2, Pencil, Twitter, Video, FileText, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { Note } from "./Schema";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onShare: (note: Note) => void;
  onDelete: (id: string) => void;
}

const typeIcons = {
  tweet: Twitter,
  video: Video,
  document: FileText,
  article: FileText,
  link: LinkIcon,
};

export function NoteCard({ note, onEdit, onShare, onDelete }: NoteCardProps) {
  const Icon = typeIcons[note.type as keyof typeof typeIcons] || FileText;
  
  return (
    <Card className="hover-elevate transition-all duration-200 flex flex-col h-full" data-testid={`card-note-${note.id}`}>
      <CardHeader className="space-y-0 pb-3">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5" />
            <span className="capitalize">{note.type}</span>
          </div>
          <span data-testid={`text-date-${note.id}`}>
            Added {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
          </span>
        </div>
        <h3 className="font-semibold line-clamp-2 text-base" data-testid={`text-title-${note.id}`}>
          {note.title}
        </h3>
      </CardHeader>
      
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-content-${note.id}`}>
          {note.content}
        </p>
        
        {note.url && (
          <div className="mt-3 text-xs font-mono text-muted-foreground truncate">
            {note.url}
          </div>
        )}
        
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {note.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
                data-testid={`badge-tag-${tag}`}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-3 border-t flex justify-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(note)}
          data-testid={`button-edit-${note.id}`}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onShare(note)}
          data-testid={`button-share-${note.id}`}
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(note.id)}
          data-testid={`button-delete-${note.id}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
