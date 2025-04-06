
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClientData } from '@/types/clientTypes';

interface NotesTabProps {
  client: ClientData;
}

const NotesTab: React.FC<NotesTabProps> = ({ client }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Client Notes</h3>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Add Note</Button>
      </div>
      
      <div className="space-y-4">
        {client?.notes?.map((note, index) => (
          <Card key={index} className="shadow-sm border-slate-200 dark:border-navy-700">
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-slate-800 dark:text-slate-200">{note}</p>
                  <div className="text-xs text-slate-500 mt-3">
                    Added on {new Date().toLocaleDateString()}
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default NotesTab;
