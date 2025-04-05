import React, { useState } from 'react';
import { 
  BookText, 
  Clock, 
  PlusCircle, 
  Trash2, 
  Save,
  CheckCircle,
  X,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { AppointmentCategory, useUser } from '../../context/UserContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AppointmentCategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_CATEGORIES: Omit<AppointmentCategory, 'id'>[] = [
  {
    label: 'Free Consultation',
    description: 'A short introductory call to discuss your financial needs.',
    duration: 30,
    enabled: true
  },
  {
    label: 'Discovery Call',
    description: 'An in-depth discussion to understand your financial situation.',
    duration: 60,
    enabled: true
  },
  {
    label: 'Investment Strategy',
    description: 'Review and discuss your investment portfolio and strategies.',
    duration: 60,
    enabled: true
  },
  {
    label: 'Tax Planning',
    description: 'Consultation for tax optimization strategies.',
    duration: 60,
    enabled: true
  },
  {
    label: 'Business & Entrepreneurship',
    description: 'Financial advice for business owners and entrepreneurs.',
    duration: 90,
    enabled: true
  }
];

const AppointmentCategoryManager: React.FC<AppointmentCategoryManagerProps> = ({
  isOpen,
  onClose
}) => {
  const { advisorProfile, setAdvisorProfile } = useUser();
  const [categories, setCategories] = useState<AppointmentCategory[]>(
    advisorProfile?.appointmentCategories || 
    DEFAULT_CATEGORIES.map(cat => ({
      ...cat,
      id: `cat-${cat.label.toLowerCase().replace(/ /g, '_')}`
    }))
  );
  const [saved, setSaved] = useState(false);

  const handleToggleCategory = (categoryId: string) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, enabled: !cat.enabled } 
          : cat
      )
    );
  };

  const handleUpdateCategoryField = (
    categoryId: string, 
    field: keyof Omit<AppointmentCategory, 'id'>, 
    value: string | number | boolean
  ) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, [field]: field === 'duration' ? Number(value) : value } 
          : cat
      )
    );
  };

  const resetToDefaults = () => {
    const defaultCats = DEFAULT_CATEGORIES.map(cat => ({
      ...cat,
      id: `cat-${cat.label.toLowerCase().replace(/ /g, '_')}`
    }));
    
    setCategories(defaultCats);
    
    toast("Reset to defaults", {
      description: 'Appointment categories have been reset to default values.'
    });
  };

  const handleSaveCategories = () => {
    if (advisorProfile) {
      setAdvisorProfile({
        ...advisorProfile,
        appointmentCategories: categories
      });
      
      setSaved(true);
      toast("Categories saved", {
        description: 'Your appointment categories have been updated.'
      });
      
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BookText className="h-5 w-5 mr-2" />
            Manage Appointment Categories
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <p className="text-sm text-slate-600">
            Enable or disable appointment categories and customize their details. Clients will only be able to book appointments from enabled categories.
          </p>
          
          <div className="space-y-4">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={cn(
                  "border rounded-lg p-4 transition-colors",
                  category.enabled ? "bg-white" : "bg-slate-50"
                )}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <h3 className={cn(
                      "font-medium",
                      !category.enabled && "text-slate-500"
                    )}>
                      {category.label}
                    </h3>
                    <div className="ml-2 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {category.duration} mins
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "hover:bg-transparent p-1 h-auto",
                      category.enabled ? "text-teal-600" : "text-slate-400"
                    )}
                    onClick={() => handleToggleCategory(category.id)}
                  >
                    {category.enabled ? (
                      <ToggleRight className="h-6 w-6" />
                    ) : (
                      <ToggleLeft className="h-6 w-6" />
                    )}
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Category Name
                    </label>
                    <Input
                      value={category.label}
                      onChange={(e) => handleUpdateCategoryField(category.id, 'label', e.target.value)}
                      className={cn(
                        !category.enabled && "bg-slate-100 text-slate-500"
                      )}
                      disabled={!category.enabled}
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Description
                    </label>
                    <Textarea
                      value={category.description}
                      onChange={(e) => handleUpdateCategoryField(category.id, 'description', e.target.value)}
                      className={cn(
                        !category.enabled && "bg-slate-100 text-slate-500",
                        "min-h-[60px]"
                      )}
                      disabled={!category.enabled}
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      min={15}
                      step={15}
                      value={category.duration}
                      onChange={(e) => handleUpdateCategoryField(category.id, 'duration', e.target.value)}
                      className={cn(
                        !category.enabled && "bg-slate-100 text-slate-500",
                        "w-24"
                      )}
                      disabled={!category.enabled}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              className="text-slate-700"
              onClick={resetToDefaults}
            >
              <div className="flex items-center">
                <X className="h-4 w-4 mr-1" />
                Reset to Defaults
              </div>
            </Button>
            
            <Button 
              onClick={handleSaveCategories}
              disabled={saved}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {saved ? (
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Saved!
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="h-4 w-4 mr-1" />
                  Save Categories
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentCategoryManager;
