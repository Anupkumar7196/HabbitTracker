import React, { useState } from 'react';
import { Settings, Moon, Sun, Bell, User, Palette, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SettingsPageProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ theme, setTheme }) => {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState('en');

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto', icon: Settings },
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
  ];

  const settingsSections = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          label: 'Theme',
          type: 'select',
          value: theme,
          onChange: setTheme,
          options: themes,
        },
        {
          label: 'Language',
          type: 'select',
          value: language,
          onChange: setLanguage,
          options: languages,
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          label: 'Enable Notifications',
          type: 'switch',
          value: notifications,
          onChange: setNotifications,
        },
        {
          label: 'Sound Effects',
          type: 'switch',
          value: soundEffects,
          onChange: setSoundEffects,
        },
      ],
    },
    {
      title: 'Data & Privacy',
      icon: Shield,
      settings: [
        {
          label: 'Auto Save',
          type: 'switch',
          value: autoSave,
          onChange: setAutoSave,
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
          <div className="flex items-center space-x-4 mb-6">
            <Settings className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h2>
          </div>
          <p className="text-gray-600">Customize your experience and manage your preferences.</p>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;

          return (
            <div key={sectionIndex} className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <SectionIcon className="h-6 w-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
              </div>

              <div className="space-y-6">
                {section.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-1">
                      <Label className="text-base font-medium text-gray-900">{setting.label}</Label>
                      {setting.description && (
                        <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                      )}
                    </div>

                    <div className="ml-4">
                      {setting.type === 'switch' && (
                        <Switch
                          checked={setting.value}
                          onCheckedChange={setting.onChange}
                          className="data-[state=checked]:bg-blue-500"
                        />
                      )}

                      {setting.type === 'select' && (
                        <Select value={setting.value} onValueChange={setting.onChange}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {setting.options?.map((option) => {
                              const OptionIcon = option.icon;
                              return (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center space-x-2">
                                    {OptionIcon && <OptionIcon className="h-4 w-4" />}
                                    <span>{option.label}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Quick Actions */}
        <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-100"
            >
              <User className="h-6 w-6" />
              <span>Export Data</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-100"
            >
              <Shield className="h-6 w-6" />
              <span>Privacy Settings</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-100"
            >
              <HelpCircle className="h-6 w-6" />
              <span>Help & Support</span>
            </Button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl shadow-2xl border border-blue-200 p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About TaskFlow</h3>
            <p className="text-gray-700 mb-4">
              Version 1.0.0 • Built with React & TypeScript
            </p>
            <p className="text-sm text-gray-600">
              TaskFlow helps you build better habits and achieve your goals through intelligent task management and progress tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;