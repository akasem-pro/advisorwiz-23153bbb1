
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface NoteFormProps {
  initialValue?: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  title: string;
}

const NoteForm: React.FC<NoteFormProps> = ({
  initialValue = '',
  isOpen,
  onClose,
  onSave,
  title,
}) => {
  const [noteText, setNoteText] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      onSave(noteText.trim());
      setNoteText('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter your note here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="min-h-[120px]"
            required
          />
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NoteForm;
