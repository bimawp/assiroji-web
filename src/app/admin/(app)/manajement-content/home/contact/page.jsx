'use client';

import { useState } from 'react';
import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';

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
    instagram: 'https://instagram.com/madrasahaliyah',
    facebook: 'https://facebook.com/madrasahaliyah',
    whatsapp: 'https://wa.me/6281234567890',
    tiktok: 'https://tiktok.com/@madrasahaliyah',
    youtube: 'https://youtube.com/@madrasahaliyah',
  });

  const [isSaving, setIsSaving] = useState(false);

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

    try {
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Saving social media links:', socialLinks);
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
      name: 'whatsapp',
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
  ];

  return (
    <div className="space-y-6 mt-2">
      <div className="bg-white p-2 rounded-lg shadow">
        <div className=" mt-3">
          <h1 className="text-xl font-semibold mb-4">Social Media Links</h1>
          <form onSubmit={handleSubmit} className="px-2 flex flex-col gap-4 ">
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
                  <input
                    id={field.name}
                    name={field.name}
                    type="url"
                    placeholder={field.placeholder}
                    value={socialLinks[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F4D3D] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => window.open(socialLinks[field.name], '_blank')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F4D3D]"
                  >
                    Visit
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className={`px-4 py-2 text-sm font-medium text-white bg-[#1F4D3D] rounded-md hover:bg-[#006D5B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F4D3D] ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSaving}
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
