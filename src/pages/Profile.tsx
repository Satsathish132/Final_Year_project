import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, GraduationCap, Calendar, Compass, Map, MessageCircle, Bookmark, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getActivities, formatTimeAgo } from '@/lib/activityTracker';
import { getSavedCareers } from '@/lib/savedCareers';
import { userKey } from '@/lib/userStorage';

const Profile = () => {
  const [user, setUser] = useState<{ name: string; email: string; role: string; profileImage?: string } | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('pathlytics_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // Load profile image from user-specific key
        const profileImageKey = userKey('profile_image');
        const storedProfileImage = localStorage.getItem(profileImageKey);
        if (storedProfileImage) {
          parsedUser.profileImage = storedProfileImage;
        }

        setUser(parsedUser);
      }
    };

    loadUser();
    window.addEventListener('pathlytics_user:updated', loadUser);
    return () => window.removeEventListener('pathlytics_user:updated', loadUser);
  }, []);

  if (!user) return null;

  const activities = getActivities();
  const savedCount = getSavedCareers().length;
  const joinDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const stats = [
    { icon: Bookmark, label: 'Saved Careers', value: savedCount, color: 'bg-success/10 text-success' },
    { icon: Compass, label: 'Recommendations', value: activities.filter(a => a.action.includes('recommendation')).length || 0, color: 'bg-primary/10 text-primary' },
    { icon: Map, label: 'Roadmaps Viewed', value: activities.filter(a => a.action.includes('roadmap') || a.action.includes('Viewed')).length || 0, color: 'bg-accent/10 text-accent' },
    { icon: MessageCircle, label: 'Chat Sessions', value: activities.filter(a => a.action.includes('chat')).length || 0, color: 'bg-warning/10 text-warning' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24 shadow-lg">
              {user.profileImage ? (
                <AvatarImage src={user.profileImage} alt={`${user.name}'s profile`} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-3xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">{user.name || 'User'}</h1>
              <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> {user.email}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" /> {user.role || 'Student'}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Joined {joinDate}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings">Edit Profile</Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-5 text-center">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Your Activity</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard" className="text-primary">
                Dashboard <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          {activities.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No activity yet. Start exploring careers!</p>
          ) : (
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.action}</span> {activity.item}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{formatTimeAgo(activity.time)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
