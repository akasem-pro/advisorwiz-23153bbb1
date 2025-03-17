import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { toast } from "@/hooks/use-toast";

interface FirmRegistrationFormProps {
  // No props needed for now
}

const FirmRegistrationForm: React.FC<FirmRegistrationFormProps> = () => {
  const { addFirm, userType, advisorProfile } = useUser();
  const navigate = useNavigate();
  const currentUserId = userType === 'advisor' ? advisorProfile?.id : '';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    website: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when input changes
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = 'Firm name is required';
      isValid = false;
    } else {
      newErrors.name = '';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else {
      newErrors.description = '';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
      isValid = false;
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL';
      isValid = false;
    } else {
      newErrors.website = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  // Fix the addFirm function call to include required properties
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add the firm with proper fields
      addFirm({
        name: formData.name,
        description: formData.description,
        website: formData.website,
        adminId: currentUserId || '',
        advisorIds: [],
        status: 'pending', // Add required status
        updatedAt: new Date().toISOString(), // Add required updatedAt
      });
      
      navigate('/firm-profile');
      toast({
        title: "Firm Registration Submitted",
        description: "Your firm registration has been submitted for review.",
      });
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Firm Registration</div>
            <p className="mt-2 text-gray-500">Fill in the details to register your financial firm.</p>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Firm Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Firm Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  placeholder="A brief description of your firm"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                  Website
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="website"
                  name="website"
                  type="text"
                  placeholder="Your Firm's Website URL"
                  value={formData.website}
                  onChange={handleChange}
                />
                {errors.website && <p className="text-red-500 text-xs italic">{errors.website}</p>}
              </div>

              <div className="flex items-center justify-between">
                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Register Firm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirmRegistrationForm;
