import { useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Note } from "./Schema";

interface ShareNoteDialogProps {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareNoteDialog({ note, open, onOpenChange }: ShareNoteDialogProps) {
  const [copied, setCopied] = useState(false);
  
  if (!note) return null;
  
  const shareUrl = `${window.location.origin}/note/${note.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-share-note">
        <DialogHeader>
          <DialogTitle>Share Note</DialogTitle>
          <DialogDescription>
            Share "{note.title}" with others using this link.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="note-share-url">Shareable Link</Label>
            <div className="flex gap-2">
              <Input
                id="note-share-url"
                value={shareUrl}
                readOnly
                className="font-mono text-sm"
                data-testid="input-note-share-url"
              />
              <Button
                variant="outline"
                onClick={handleCopy}
                data-testid="button-copy-note-link"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {copied && (
            <p className="text-sm text-muted-foreground" data-testid="text-note-copied-message">
              Link copied to clipboard!
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
