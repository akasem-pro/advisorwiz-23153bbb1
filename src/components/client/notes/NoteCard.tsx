
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface NoteCardProps {
  note: {
    content: string;
    createdAt: Date;
  };
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, index, onEdit, onDelete }) => {
  return (
    <Card className="shadow-sm border-slate-200 dark:border-navy-700 hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-slate-800 dark:text-slate-200">{note.content}</p>
            <div className="text-xs text-slate-500 mt-3">
              Added on {format(note.createdAt, 'MMM dd, yyyy')}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit(index)}
              className="text-slate-600 hover:text-slate-900"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
