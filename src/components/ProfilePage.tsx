import React, { useState } from 'react';
import { User, Edit, Camera, Award, Target, Calendar, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate about productivity and personal development. Always striving to improve and achieve my goals.',
    avatar: '/placeholder.svg',
    joinDate: '2024-01-15',
    timezone: 'UTC-5',
  });

  const achievements = [
    { id: 1, title: 'First Task', description: 'Completed your first task', icon: Target, earned: true },
    { id: 2, title: 'Week Warrior', description: 'Completed tasks for 7 consecutive days', icon: Calendar, earned: true },
    { id: 3, title: 'Goal Getter', description: 'Achieved 10 tasks in a month', icon: Star, earned: true },
    { id: 4, title: 'Master Planner', description: 'Created 50 tasks', icon: Trophy, earned: false },
    { id: 5, title: 'Consistency King', description: '30-day streak', icon: Award, earned: false },
  ];

  const stats = [
    { label: 'Tasks Completed', value: '127', icon: Target },
    { label: 'Current Streak', value: '12 days', icon: Calendar },
    { label: 'Longest Streak', value: '21 days', icon: Star },
    { label: 'Achievement Rate', value: '85%', icon: Award },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <User className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                </div>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-lg hover:bg-gray-50"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-100"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              <p className="text-gray-600 mb-2">{profile.email}</p>
              <p className="text-gray-600">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>

              {isEditing && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-pink-500">
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/70 rounded-2xl shadow-xl border border-white/30 backdrop-blur-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-100 to-pink-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="h-6 w-6 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200 shadow-lg'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      achievement.earned ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        achievement.earned ? 'text-white' : 'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${
                        achievement.earned ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl shadow-2xl border border-blue-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About Me</h3>
          <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
        </div>

        {/* Activity Summary */}
        <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Completed "Morning Exercise" task</span>
              <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Created new task "Read Chapter 5"</span>
              <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Achieved "Week Warrior" badge</span>
              <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;