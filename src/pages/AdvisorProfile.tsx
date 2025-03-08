import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedRoute } from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useUser, AdvisorProfile as AdvisorProfileType, TimeSlot } from '../context/UserContext';
import { ArrowRight, Save, CheckCircle, Plus, Trash2, Clock } from 'lucide-react';
import ProfilePictureUpload from '../components/profile/ProfilePictureUpload';
import AvailabilityScheduler from '../components/advisor/AvailabilityScheduler';

const expertiseOptions = [
  { value: 'retirement', label: 'Retirement Planning' },
  { value: 'investment', label: 'Investment Management' },
  { value: 'tax', label: 'Tax Planning' },
  { value: 'estate', label: 'Estate Planning' },
  { value: 'insurance', label: 'Insurance Planning' },
  { value: 'education', label: 'Education Planning' },
  { value: 'business', label: 'Business Planning' },
  { value: 'philanthropic', label: 'Philanthropic Planning' }
];

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'cantonese', label: 'Cantonese' },
  { value: 'punjabi', label: 'Punjabi' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'arabic', label: 'Arabic' }
];

const AdvisorProfile: React.FC = () => {
  const { advisorProfile, setAdvisorProfile } = useUser();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ client: '', text: '' });
  
  const [formData, setFormData] = useState<Partial<AdvisorProfileType>>({
    id: 'advisor-1',
    name: advisorProfile?.name || '',
    organization: advisorProfile?.organization || '',
    isAccredited: advisorProfile?.isAccredited || false,
    website: advisorProfile?.website || '',
    testimonials: advisorProfile?.testimonials || [],
    languages: advisorProfile?.languages || [],
    pricing: {
      hourlyRate: advisorProfile?.pricing?.hourlyRate || undefined,
      portfolioFee: advisorProfile?.pricing?.portfolioFee || undefined
    },
    assetsUnderManagement: advisorProfile?.assetsUnderManagement || 0,
    expertise: advisorProfile?.expertise || [],
    profilePicture: advisorProfile?.profilePicture || '',
    matches: [],
    chats: [],
    availability: advisorProfile?.availability || []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'hourlyRate' || name === 'portfolioFee') {
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [name]: value ? Number(value) : undefined
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'assetsUnderManagement' ? Number(value) : value
      }));
    }
  };

  const handleExpertiseChange = (expertise: string) => {
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

  const handlePictureChange = (imageBase64: string) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: imageBase64
    }));
  };

  const handleAvailabilityChange = (newAvailability: TimeSlot[]) => {
    setFormData(prev => ({
      ...prev,
      availability: newAvailability
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdvisorProfile(formData as AdvisorProfileType);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleContinue = () => {
    navigate('/matches');
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                    Your Advisor Profile
                  </h1>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Complete your profile to connect with potential clients who match your expertise.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                  <div className="flex justify-center mb-8">
                    <ProfilePictureUpload 
                      currentPicture={formData.profilePicture}
                      onPictureChange={handlePictureChange}
                      size="lg"
                    />
                  </div>

                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">Personal Information</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="organization" className="block text-sm font-medium text-navy-800 mb-1">
                            Organization/Firm
                          </label>
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Your company or firm"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="website" className="block text-sm font-medium text-navy-800 mb-1">
                            Website (optional)
                          </label>
                          <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isAccredited"
                            name="isAccredited"
                            checked={formData.isAccredited}
                            onChange={handleChange}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                          />
                          <label htmlFor="isAccredited" className="ml-2 block text-sm text-slate-700">
                            I am an accredited/certified financial advisor
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div>
                      <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">Professional Information</h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="hourlyRate" className="block text-sm font-medium text-navy-800 mb-1">
                            Hourly Rate (CAD, optional)
                          </label>
                          <input
                            type="number"
                            id="hourlyRate"
                            name="hourlyRate"
                            value={formData.pricing?.hourlyRate || ''}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., 150"
                            min={0}
                          />
                        </div>
                        <div>
                          <label htmlFor="portfolioFee" className="block text-sm font-medium text-navy-800 mb-1">
                            Portfolio Fee (%, optional)
                          </label>
                          <input
                            type="number"
                            id="portfolioFee"
                            name="portfolioFee"
                            value={formData.pricing?.portfolioFee || ''}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., 1.5"
                            min={0}
                            max={100}
                            step={0.1}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label htmlFor="assetsUnderManagement" className="block text-sm font-medium text-navy-800 mb-1">
                          Assets Under Management (CAD)
                        </label>
                        <input
                          type="number"
                          id="assetsUnderManagement"
                          name="assetsUnderManagement"
                          value={formData.assetsUnderManagement || ''}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="Total amount in CAD"
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    {/* Expertise and Languages */}
                    <div>
                      <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">Expertise & Languages</h2>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-navy-800 mb-2">
                          Areas of Expertise (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {expertiseOptions.map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`expertise-${option.value}`}
                                checked={(formData.expertise || []).includes(option.value)}
                                onChange={() => handleExpertiseChange(option.value)}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                              />
                              <label htmlFor={`expertise-${option.value}`} className="ml-2 block text-sm text-slate-700">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-navy-800 mb-2">
                          Languages Spoken (Select all that apply)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {languageOptions.map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`lang-${option.value}`}
                                checked={(formData.languages || []).includes(option.value)}
                                onChange={() => handleLanguageChange(option.value)}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                              />
                              <label htmlFor={`lang-${option.value}`} className="ml-2 block text-sm text-slate-700">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Availability Schedule */}
                    <div>
                      <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">
                        <Clock className="inline-block mr-2 h-5 w-5" />
                        Weekly Availability
                      </h2>
                      <p className="text-slate-600 mb-4">
                        Set your weekly availability for consultations and meetings. Clients will be able to book time slots based on this schedule.
                      </p>
                      
                      <AvailabilityScheduler 
                        availability={formData.availability || []}
                        onChange={handleAvailabilityChange}
                      />
                    </div>

                    {/* Testimonials */}
                    <div>
                      <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">Client Testimonials</h2>
                      
                      {(formData.testimonials || []).length > 0 && (
                        <div className="mb-6 space-y-4">
                          {formData.testimonials?.map((testimonial, index) => (
                            <div key={index} className="bg-slate-50 p-4 rounded-lg relative">
                              <p className="text-slate-700 italic">"{testimonial.text}"</p>
                              <p className="mt-2 text-sm font-medium text-navy-700">- {testimonial.client}</p>
                              <button
                                type="button"
                                onClick={() => removeTestimonial(index)}
                                className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors"
                                aria-label="Remove testimonial"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <label htmlFor="client" className="block text-sm font-medium text-navy-800 mb-1">
                            Client Name
                          </label>
                          <input
                            type="text"
                            id="client"
                            name="client"
                            value={newTestimonial.client}
                            onChange={handleTestimonialChange}
                            className="input-field"
                            placeholder="Client's name"
                          />
                        </div>
                        <div>
                          <label htmlFor="text" className="block text-sm font-medium text-navy-800 mb-1">
                            Testimonial Text
                          </label>
                          <textarea
                            id="text"
                            name="text"
                            value={newTestimonial.text}
                            onChange={handleTestimonialChange}
                            className="input-field min-h-[100px]"
                            placeholder="What did the client say about your services?"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={addTestimonial}
                          disabled={!newTestimonial.client || !newTestimonial.text}
                          className={`inline-flex items-center text-teal-600 font-medium ${
                            !newTestimonial.client || !newTestimonial.text
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:text-teal-700'
                          }`}
                        >
                          <Plus className="mr-1 w-4 h-4" />
                          Add Testimonial
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="submit"
                      className="btn-primary inline-flex items-center"
                    >
                      {saved ? (
                        <>
                          <CheckCircle className="mr-2 w-5 h-5" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 w-5 h-5" />
                          Save Profile
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleContinue}
                      className="btn-secondary inline-flex items-center"
                    >
                      Find Clients
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default AdvisorProfile;
