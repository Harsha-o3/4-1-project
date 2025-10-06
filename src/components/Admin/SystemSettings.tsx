import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Database, Shield, Bell, Globe, Server, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Nabha Health',
      siteDescription: 'Rural Healthcare Made Simple',
      maintenanceMode: false,
      registrationEnabled: true,
      maxAppointmentsPerDay: 50,
      appointmentSlotDuration: 30
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      appointmentReminders: true,
      lowStockAlerts: true,
      systemAlerts: true
    },
    security: {
      passwordMinLength: 8,
      requireSpecialChars: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorAuth: false,
      ipWhitelist: ''
    },
    integrations: {
      twilioEnabled: true,
      twilioSid: 'AC*********************',
      smtpEnabled: true,
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      backupEnabled: true,
      backupFrequency: 'daily'
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Globe }
  ];

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  const handleReset = (section: string) => {
    toast.success(`${section} settings reset to defaults`);
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReset('general')}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => handleSave('general')}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Appointments/Day</label>
                    <input
                      type="number"
                      value={settings.general.maxAppointmentsPerDay}
                      onChange={(e) => updateSetting('general', 'maxAppointmentsPerDay', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                  <textarea
                    value={settings.general.siteDescription}
                    onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Slot Duration (minutes)</label>
                    <select
                      value={settings.general.appointmentSlotDuration}
                      onChange={(e) => updateSetting('general', 'appointmentSlotDuration', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Maintenance Mode</h3>
                      <p className="text-sm text-gray-600">Temporarily disable access to the platform</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.general.maintenanceMode}
                        onChange={(e) => updateSetting('general', 'maintenanceMode', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">User Registration</h3>
                      <p className="text-sm text-gray-600">Allow new users to register on the platform</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.general.registrationEnabled}
                        onChange={(e) => updateSetting('general', 'registrationEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReset('notifications')}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => handleSave('notifications')}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {key === 'emailNotifications' && 'Send notifications via email'}
                        {key === 'smsNotifications' && 'Send notifications via SMS'}
                        {key === 'pushNotifications' && 'Send push notifications to mobile devices'}
                        {key === 'appointmentReminders' && 'Send appointment reminders to patients'}
                        {key === 'lowStockAlerts' && 'Alert pharmacies about low stock items'}
                        {key === 'systemAlerts' && 'Send system maintenance and update alerts'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value as boolean}
                        onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReset('security')}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => handleSave('security')}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
                    <input
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist (one per line)</label>
                  <textarea
                    value={settings.security.ipWhitelist}
                    onChange={(e) => updateSetting('security', 'ipWhitelist', e.target.value)}
                    rows={4}
                    placeholder="192.168.1.1&#10;10.0.0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Require Special Characters</h3>
                      <p className="text-sm text-gray-600">Passwords must contain special characters</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.requireSpecialChars}
                        onChange={(e) => updateSetting('security', 'requireSpecialChars', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Settings */}
          {activeTab === 'integrations' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Integration Settings</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReset('integrations')}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => handleSave('integrations')}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Twilio SMS */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Twilio SMS Service</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.twilioEnabled}
                        onChange={(e) => updateSetting('integrations', 'twilioEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  {settings.integrations.twilioEnabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account SID</label>
                      <input
                        type="text"
                        value={settings.integrations.twilioSid}
                        onChange={(e) => updateSetting('integrations', 'twilioSid', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>

                {/* SMTP Email */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">SMTP Email Service</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.smtpEnabled}
                        onChange={(e) => updateSetting('integrations', 'smtpEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  {settings.integrations.smtpEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                        <input
                          type="text"
                          value={settings.integrations.smtpHost}
                          onChange={(e) => updateSetting('integrations', 'smtpHost', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                        <input
                          type="number"
                          value={settings.integrations.smtpPort}
                          onChange={(e) => updateSetting('integrations', 'smtpPort', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Backup Settings */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Automated Backups</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.integrations.backupEnabled}
                        onChange={(e) => updateSetting('integrations', 'backupEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  {settings.integrations.backupEnabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                      <select
                        value={settings.integrations.backupFrequency}
                        onChange={(e) => updateSetting('integrations', 'backupFrequency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;