
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { ClientData } from '@/types/clientTypes';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

interface NotesTabProps {
  client: ClientData;
}

const NotesTab: React.FC<NotesTabProps> = ({ client }) => {
  const [notes, setNotes] = useState(client?.notes || []);
  const { toast } = useToast();
  
  const handleAddNote = () => {
    // In a real application, this would call an API to add a note
    toast("Add note feature will be implemented soon");
  };
  
  const handleEditNote = (index: number) => {
    // In a real application, this would open an edit modal
    toast("Edit note feature will be implemented soon");
  };
  
  const handleDeleteNote = (index: number) => {
    // In a real application, this would call an API to delete a note
    toast("Delete note feature will be implemented soon");
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
      
      {notes && notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note, index) => (
            <Card key={index} className="shadow-sm border-slate-200 dark:border-navy-700 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-slate-800 dark:text-slate-200">{note}</p>
                    <div className="text-xs text-slate-500 mt-3">
                      Added on {format(new Date(), 'MMM dd, yyyy')}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditNote(index)}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteNote(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-navy-800/50 rounded-lg">
          <div className="p-3 bg-slate-100 dark:bg-navy-700 rounded-full mb-4">
            <PlusCircle className="h-8 w-8 text-slate-400" />
          </div>
          <h4 className="text-lg font-medium mb-2">No Notes Yet</h4>
          <p className="text-slate-500 mb-4 max-w-sm">
            Add notes about client interactions, preferences, and follow-up items.
          </p>
          <Button 
            variant="outline" 
            onClick={handleAddNote}
            className="flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Note
          </Button>
        </div>
      )}
    </>
  );
};

export default NotesTab;
