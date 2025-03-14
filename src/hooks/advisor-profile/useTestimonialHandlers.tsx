
import { ExtendedAdvisorProfileForm } from '../../types/advisorTypes';

export const useTestimonialHandlers = (
  formData: ExtendedAdvisorProfileForm,
  setFormData: React.Dispatch<React.SetStateAction<ExtendedAdvisorProfileForm>>,
  newTestimonial: { client: string; text: string },
  setNewTestimonial: React.Dispatch<React.SetStateAction<{ client: string; text: string }>>
) => {
  const handleTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTestimonial = () => {
    if (newTestimonial.client && newTestimonial.text) {
      setFormData(prev => ({
        ...prev,
        testimonials: [...(prev.testimonials || []), newTestimonial]
      }));
      setNewTestimonial({ client: '', text: '' });
    }
  };

  const removeTestimonial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((_, i) => i !== index)
    }));
  };

  return {
    handleTestimonialChange,
    addTestimonial,
    removeTestimonial
  };
};
