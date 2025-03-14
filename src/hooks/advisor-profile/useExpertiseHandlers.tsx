
import { ServiceCategory } from '../../context/UserContext';
import { ExtendedAdvisorProfileForm } from '../../types/advisorTypes';

export const useExpertiseHandlers = (
  formData: ExtendedAdvisorProfileForm,
  setFormData: React.Dispatch<React.SetStateAction<ExtendedAdvisorProfileForm>>
) => {
  const handleExpertiseChange = (expertise: ServiceCategory) => {
    setFormData(prev => {
      const currentExpertise = prev.expertise || [];
      if (currentExpertise.includes(expertise)) {
        return {
          ...prev,
          expertise: currentExpertise.filter(e => e !== expertise)
        };
      } else {
        return {
          ...prev,
          expertise: [...currentExpertise, expertise]
        };
      }
    });
  };

  const isExpertiseSelected = (expertise: ServiceCategory) => {
    return formData.expertise?.includes(expertise) || false;
  };

  const handleLanguageChange = (language: string) => {
    setFormData(prev => {
      const currentLanguages = prev.languages || [];
      if (currentLanguages.includes(language)) {
        return {
          ...prev,
          languages: currentLanguages.filter(l => l !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...currentLanguages, language]
        };
      }
    });
  };

  return {
    handleExpertiseChange,
    isExpertiseSelected,
    handleLanguageChange
  };
};
