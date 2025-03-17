import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, ConsumerProfile, ServiceCategory } from '../context/UserContext';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Create a constant for default profile image instead of importing from @/constants
const DEFAULT_PROFILE_IMAGE = '/placeholder.svg';

const communicationOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'video', label: 'Video Call' },
  { value: 'inPerson', label: 'In-Person' },
];

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'cantonese', label: 'Cantonese' },
];

const employmentStatusOptions = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'student', label: 'Student' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Unemployed' },
];

const timelineOptions = [
  { value: 'immediately', label: 'Immediately' },
  { value: 'next_3_months', label: 'Next 3 Months' },
  { value: 'next_6_months', label: 'Next 6 Months' },
  { value: 'not_sure', label: 'Not Sure' },
];

const riskToleranceOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const serviceOptions = [
  { value: 'retirement', label: 'Retirement Planning' },
  { value: 'investment', label: 'Investment Management' },
  { value: 'tax', label: 'Tax Planning' },
  { value: 'estate', label: 'Estate Planning' },
  { value: 'insurance', label: 'Insurance Planning' },
  { value: 'business', label: 'Business Planning' },
  { value: 'education', label: 'Education Planning' },
  { value: 'philanthropic', label: 'Philanthropic Planning' },
];

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  age: z.string().optional(),
  employmentStatus: z.string().optional(),
  investableAssets: z.string().optional(),
  riskTolerance: z.string().optional(),
  preferredCommunication: z.array(z.string()).optional(),
  preferredLanguage: z.array(z.string()).optional(),
  startTimeline: z.string().optional(),
  serviceNeeds: z.array(z.string()).optional(),
  profilePicture: z.string().optional(),
  onlineStatus: z.string().optional(),
  phone: z.string().optional(),
})

interface ProfileFormValues extends z.infer<typeof profileFormSchema> {}

const ConsumerProfilePage: React.FC = () => {
  const { consumerProfile, setConsumerProfile, updateOnlineStatus } = useUser();
  const [formData, setFormData] = useState<ProfileFormValues>({
    name: consumerProfile?.name || '',
    email: consumerProfile?.email || '',
    age: consumerProfile?.age?.toString() || '',
    employmentStatus: consumerProfile?.status || '',
    investableAssets: consumerProfile?.investableAssets?.toString() || '',
    riskTolerance: consumerProfile?.riskTolerance || '',
    preferredCommunication: consumerProfile?.preferredCommunication || [],
    preferredLanguage: consumerProfile?.preferredLanguage || [],
    startTimeline: consumerProfile?.startTimeline || '',
    serviceNeeds: consumerProfile?.serviceNeeds || [],
    profilePicture: consumerProfile?.profilePicture || '',
    onlineStatus: consumerProfile?.onlineStatus || 'online',
    phone: consumerProfile?.phone || '',
  });
  const [selectedCommunication, setSelectedCommunication] = useState<string[]>(consumerProfile?.preferredCommunication || []);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(consumerProfile?.preferredLanguage || []);
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>(consumerProfile?.serviceNeeds || []);
  const [profileImage, setProfileImage] = useState<string | null>(consumerProfile?.profilePicture || null);
  const [onlineStatus, setOnlineStatus] = useState<string>(consumerProfile?.onlineStatus || 'online');
  const navigate = useNavigate();

  useEffect(() => {
    if (consumerProfile) {
      setFormData({
        name: consumerProfile.name || '',
        email: consumerProfile.email || '',
        age: consumerProfile.age?.toString() || '',
        employmentStatus: consumerProfile.status || '',
        investableAssets: consumerProfile.investableAssets?.toString() || '',
        riskTolerance: consumerProfile.riskTolerance || '',
        preferredCommunication: consumerProfile.preferredCommunication || [],
        preferredLanguage: consumerProfile.preferredLanguage || [],
        startTimeline: consumerProfile.startTimeline || '',
        serviceNeeds: consumerProfile.serviceNeeds || [],
        profilePicture: consumerProfile.profilePicture || '',
        onlineStatus: consumerProfile.onlineStatus || 'online',
        phone: consumerProfile.phone || '',
      });
      setSelectedCommunication(consumerProfile.preferredCommunication || []);
      setSelectedLanguages(consumerProfile.preferredLanguage || []);
      setSelectedServices(consumerProfile.serviceNeeds || []);
      setProfileImage(consumerProfile.profilePicture || null);
      setOnlineStatus(consumerProfile.onlineStatus || 'online');
    }
  }, [consumerProfile]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: consumerProfile?.name || '',
      email: consumerProfile?.email || '',
      age: consumerProfile?.age?.toString() || '',
      employmentStatus: consumerProfile?.status || '',
      investableAssets: consumerProfile?.investableAssets?.toString() || '',
      riskTolerance: consumerProfile?.riskTolerance || '',
      preferredCommunication: consumerProfile?.preferredCommunication || [],
      preferredLanguage: consumerProfile?.preferredLanguage || [],
      startTimeline: consumerProfile?.startTimeline || '',
      serviceNeeds: consumerProfile?.serviceNeeds || [],
      profilePicture: consumerProfile?.profilePicture || '',
      onlineStatus: consumerProfile?.onlineStatus || 'online',
      phone: consumerProfile?.phone || '',
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string, isChecked: boolean, fieldName: 'preferredCommunication' | 'preferredLanguage' | 'serviceNeeds') => {
    let updatedValues: string[] | ServiceCategory[];

    if (isChecked) {
      updatedValues = [...(formData[fieldName] || []), option];
    } else {
      updatedValues = (formData[fieldName] || []).filter(item => item !== option);
    }

    setFormData(prev => ({ ...prev, [fieldName]: updatedValues }));

    if (fieldName === 'preferredCommunication') {
      setSelectedCommunication(updatedValues as string[]);
    } else if (fieldName === 'preferredLanguage') {
      setSelectedLanguages(updatedValues as string[]);
    } else if (fieldName === 'serviceNeeds') {
      setSelectedServices(updatedValues as ServiceCategory[]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnlineStatusChange = (status: string) => {
    setOnlineStatus(status);
    updateOnlineStatus(status as 'online' | 'offline' | 'away');
  };

  const saveProfile = () => {
    // Create a copy of the current profile with updated fields
    const updatedProfile: ConsumerProfile = {
      ...consumerProfile,
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age || '0'),
      status: formData.employmentStatus,
      investableAssets: parseInt(formData.investableAssets.replace(/,/g, '') || '0'),
      riskTolerance: formData.riskTolerance as 'low' | 'medium' | 'high',
      preferredCommunication: selectedCommunication,
      preferredLanguage: selectedLanguages,
      startTimeline: formData.startTimeline,
      serviceNeeds: selectedServices,
      profilePicture: profileImage || '',
      onlineStatus: onlineStatus,
      phone: formData.phone || '',
    };

    // Update the consumer profile in the UserContext
    setConsumerProfile(updatedProfile);

    // Show a toast notification
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });

    // Redirect to the index page
    navigate('/');
  };

  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle>Consumer Profile</CardTitle>
          <CardDescription>Update your profile information here.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Picture Section */}
            <div>
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <div className="flex items-center space-x-4 mt-2">
                <Avatar className="h-12 w-12">
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt="Profile Image" />
                  ) : (
                    <AvatarFallback>{formData.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  )}
                </Avatar>
                <div className="space-y-1">
                  <Input
                    id="profilePicture"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Label
                    htmlFor="profilePicture"
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md text-sm font-medium cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    Upload Image
                  </Label>
                  <p className="text-xs text-slate-500">
                    Recommended size: 150x150 pixels.
                  </p>
                </div>
              </div>
            </div>

            {/* Online Status Section */}
            <div>
              <Label>Online Status</Label>
              <div className="flex items-center space-x-4 mt-2">
                <Button
                  variant={onlineStatus === 'online' ? 'default' : 'outline'}
                  onClick={() => handleOnlineStatusChange('online')}
                >
                  Online
                </Button>
                <Button
                  variant={onlineStatus === 'away' ? 'default' : 'outline'}
                  onClick={() => handleOnlineStatusChange('away')}
                >
                  Away
                </Button>
                <Button
                  variant={onlineStatus === 'offline' ? 'default' : 'outline'}
                  onClick={() => handleOnlineStatusChange('offline')}
                >
                  Offline
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employment Status */}
            <div>
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select value={formData.employmentStatus} onValueChange={(value) => {
                setFormData(prev => ({ ...prev, employmentStatus: value }));
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {employmentStatusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Investable Assets */}
            <div>
              <Label htmlFor="investableAssets">Investable Assets</Label>
              <Input
                type="text"
                id="investableAssets"
                name="investableAssets"
                value={formData.investableAssets}
                onChange={handleInputChange}
                placeholder="e.g., 500,000"
              />
            </div>
          </div>

          {/* Risk Tolerance */}
          <div>
            <Label htmlFor="riskTolerance">Risk Tolerance</Label>
            <Select value={formData.riskTolerance} onValueChange={(value) => {
              setFormData(prev => ({ ...prev, riskTolerance: value }));
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select risk tolerance" />
              </SelectTrigger>
              <SelectContent>
                {riskToleranceOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Communication */}
          <div>
            <Label>Preferred Communication</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {communicationOptions.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`communication-${option.value}`}
                    checked={selectedCommunication.includes(option.value)}
                    onCheckedChange={(checked) => handleCheckboxChange(option.value, !!checked, 'preferredCommunication')}
                  />
                  <Label htmlFor={`communication-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <Label>Preferred Language</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {languageOptions.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${option.value}`}
                    checked={selectedLanguages.includes(option.value)}
                    onCheckedChange={(checked) => handleCheckboxChange(option.value, !!checked, 'preferredLanguage')}
                  />
                  <Label htmlFor={`language-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Start Timeline */}
          <div>
            <Label htmlFor="startTimeline">Start Timeline</Label>
            <Select value={formData.startTimeline} onValueChange={(value) => {
              setFormData(prev => ({ ...prev, startTimeline: value }));
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                {timelineOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service Needs */}
          <div>
            <Label>Service Needs</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {serviceOptions.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${option.value}`}
                    checked={selectedServices.some(service => service === option.value)}
                    onCheckedChange={(checked) => handleCheckboxChange(option.value, !!checked, 'serviceNeeds')}
                  />
                  <Label htmlFor={`service-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveProfile}>Update Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConsumerProfilePage;
