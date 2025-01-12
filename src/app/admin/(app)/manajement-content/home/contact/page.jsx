'use client';

import { useState, useEffect } from 'react';
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';
import { useSession } from 'next-auth/react';

function TikTokIcon() {
  return <BrandTiktok className="h-4 w-4" />;
}

function BrandTiktok({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export default function SocialMediaSettings() {
  const [socialLinks, setSocialLinks] = useState({
    id_contact: '',
    instagram: '',
    facebook: '',
    whatsApp: '',
    tiktok: '',
    youtube: '',
    address: '',
    email: '',
    phone: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/v1.0.0/auth/contact', {
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch initial data');
        }
        const data = await response.json();
        setSocialLinks(data[0] || {});
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.access_token) fetchInitialData();
  }, [session?.user?.access_token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    Object.entries(socialLinks).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const method = socialLinks.id_contact ? 'PUT' : 'POST';
      const url = socialLinks.id_contact
        ? `/api/v1.0.0/auth/contact/${socialLinks.id_contact}`
        : '/api/v1.0.0/auth/contact';

      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update social media links');
      }

      alert('Social media links updated successfully!');
    } catch (error) {
      console.error('Error saving social media links:', error);
      alert('Failed to update social media links');
    } finally {
      setIsSaving(false);
    }
  };

  const socialMediaFields = [
    {
      name: 'instagram',
      label: 'Instagram URL',
      icon: Instagram,
      placeholder: 'https://instagram.com/youraccount',
    },
    {
      name: 'facebook',
      label: 'Facebook URL',
      icon: Facebook,
      placeholder: 'https://facebook.com/yourpage',
    },
    {
      name: 'whatsApp',
      label: 'WhatsApp URL',
      icon: MessageCircle,
      placeholder: 'https://wa.me/yourphonenumber',
    },
    {
      name: 'tiktok',
      label: 'TikTok URL',
      icon: TikTokIcon,
      placeholder: 'https://tiktok.com/@youraccount',
    },
    {
      name: 'youtube',
      label: 'YouTube URL',
      icon: Youtube,
      placeholder: 'https://youtube.com/@yourchannel',
    },
    {
      name: 'address',
      label: 'Address',
      icon: MapPin,
      placeholder: 'Enter your address',
      type: 'textarea',
    },
    {
      name: 'email',
      label: 'Email',
      icon: Mail,
      placeholder: 'Enter your email',
    },
    {
      name: 'phone',
      label: 'Phone',
      icon: Phone,
      placeholder: 'Enter your phone number',
    },
  ];

  return (
    <div className="space-y-6 mt-2">
      <div className="bg-white p-2 rounded-lg shadow">
        <div className="mt-3">
          <h1 className="text-xl font-semibold mb-4">Social Media Links</h1>
          <form onSubmit={handleSubmit} className="px-2 flex flex-col gap-4">
            {socialMediaFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700"
                >
                  <field.icon className="h-4 w-4" />
                  {field.label}
                </label>
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md"></div>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={socialLinks[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F4D3D] focus:border-transparent"
                      rows={3}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={
                        field.name === 'email' ? 'email' : field.name === 'phone' ? 'tel' : 'text'
                      }
                      placeholder={field.placeholder}
                      value={socialLinks[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F4D3D] focus:border-transparent"
                    />
                  )}
                  {['instagram', 'facebook', 'whatsapp', 'tiktok', 'youtube'].includes(
                    field.name
                  ) &&
                    !isLoading && (
                      <button
                        type="button"
                        onClick={() => window.open(socialLinks[field.name], '_blank')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F4D3D]"
                      >
                        Visit
                      </button>
                    )}
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className={`px-4 py-2 text-sm font-medium text-white bg-[#1F4D3D] rounded-md hover:bg-[#006D5B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F4D3D] ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSaving || isLoading}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
