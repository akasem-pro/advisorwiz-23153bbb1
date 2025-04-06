
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ClientData } from '@/types/clientTypes';
import { useToast } from '@/components/ui/use-toast';
import NoteCard from '../notes/NoteCard';
import NoteForm from '../notes/NoteForm';
import EmptyNotesState from '../notes/EmptyNotesState';
import DeleteConfirmDialog from '../notes/DeleteConfirmDialog';

interface Note {
  content: string;
  createdAt: Date;
}

interface NotesTabProps {
  client: ClientData;
}

const NotesTab: React.FC<NotesTabProps> = ({ client }) => {
  // Transform string notes into objects with content and date
  const initialNotes: Note[] = (client?.notes || []).map(noteText => ({
    content: noteText,
    createdAt: new Date()  // In a real app, this would come from the server
  }));

  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const handleAddNote = () => {
    setIsEditing(false);
    setCurrentNoteIndex(null);
    setIsNoteFormOpen(true);
  };
  
  const handleEditNote = (index: number) => {
    setIsEditing(true);
    setCurrentNoteIndex(index);
    setIsNoteFormOpen(true);
  };
  
  const handleDeleteNote = (index: number) => {
    setCurrentNoteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveNote = (noteText: string) => {
    // In a real app, this would call an API to save the note
    if (isEditing && currentNoteIndex !== null) {
      // Edit existing note
      const updatedNotes = [...notes];
      updatedNotes[currentNoteIndex] = {
        ...updatedNotes[currentNoteIndex],
        content: noteText
      };
      setNotes(updatedNotes);
      toast("Note updated successfully");
    } else {
      // Add new note
      const newNote: Note = {
        content: noteText,
        createdAt: new Date()
      };
      setNotes([newNote, ...notes]);
      toast("Note added successfully");
    }
    setIsNoteFormOpen(false);
  };

  const handleConfirmDelete = () => {
    // In a real app, this would call an API to delete the note
    if (currentNoteIndex !== null) {
      const filteredNotes = notes.filter((_, i) => i !== currentNoteIndex);
      setNotes(filteredNotes);
      toast("Note deleted successfully");
      setIsDeleteDialogOpen(false);
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Client Notes</h3>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleAddNote}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>
      
      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              note={note}
              index={index}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      ) : (
        <EmptyNotesState onAddNote={handleAddNote} />
      )}

      {/* Note Form Dialog */}
      <NoteForm
        isOpen={isNoteFormOpen}
        onClose={() => setIsNoteFormOpen(false)}
        onSave={handleSaveNote}
        title={isEditing ? "Edit Note" : "Add Note"}
        initialValue={isEditing && currentNoteIndex !== null ? notes[currentNoteIndex].content : ""}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default NotesTab;
