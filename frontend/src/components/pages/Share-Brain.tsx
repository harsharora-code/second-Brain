import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ShareBrainDialog() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/shared/${Math.random().toString(36).substring(7)}`;

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" data-testid="button-share-brain">
          <Share2 className="h-4 w-4 mr-2" />
          Share Brain
        </Button>
      </DialogTrigger>
      <DialogContent data-testid="dialog-share-brain">
        <DialogHeader>
          <DialogTitle>Share Your Second Brain</DialogTitle>
          <DialogDescription>
            Anyone with this link will be able to view your saved content.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="share-url">Shareable Link</Label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                className="font-mono text-sm"
                data-testid="input-share-url"
              />
              <Button
                variant="outline"
                onClick={handleCopy}
                data-testid="button-copy-link"
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
            <p className="text-sm text-muted-foreground" data-testid="text-copied-message">
              Link copied to clipboard!
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
