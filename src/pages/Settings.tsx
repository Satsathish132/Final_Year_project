import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, GraduationCap, Bell, Shield, LogOut } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { userKey } from '@/lib/userStorage';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface AdzunaJob {
  title: string;
  company: { display_name: string };
  location: { display_name: string };
  redirect_url: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
}

const ADZUNA_APP_ID = '0bc48e50';
const ADZUNA_APP_KEY = '0c9564d8b4e3cb94ebd9a6d33a8fdec8';

const Settings = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Student');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    email: true,
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('pathlytics_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser: UserProfile = JSON.parse(storedUser);
    setUser(parsedUser);
    setName(parsedUser.name || '');
    setEmail(parsedUser.email || '');
    setRole(parsedUser.role || 'Student');

    // Load profile image from user-specific key
    const profileImageKey = userKey('profile_image');
    const storedProfileImage = localStorage.getItem(profileImageKey);
    setProfileImage(storedProfileImage || null);
  }, [navigate]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(file);

    // Reset the file input to allow re-selection of the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImage(null);
  };

  const handleSave = () => {
    if (!user) return;

    const updatedUser: UserProfile = {
      ...user,
      name,
      email,
      role,
    };

    // Only add profileImage if it exists
    if (profileImage) {
      updatedUser.profileImage = profileImage;
    } else {
      // Remove profileImage if it was previously set
      delete updatedUser.profileImage;
    }

    localStorage.setItem('pathlytics_user', JSON.stringify(updatedUser));

    // Save profile image to user-specific key
    const profileImageKey = userKey('profile_image');
    if (profileImage) {
      localStorage.setItem(profileImageKey, profileImage);
    } else {
      localStorage.removeItem(profileImageKey);
    }

    setUser(updatedUser);
    window.dispatchEvent(new Event('pathlytics_user:updated'));

    toast({
      title: 'Settings saved',
      description: 'Your profile and preferences have been updated.',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('pathlytics_user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences.</p>
        </div>

        <div className="space-y-8">
          {/* Profile Section */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Profile Information</h2>
                <p className="text-sm text-muted-foreground">Update your personal details</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[160px_1fr]">
              <div className="space-y-3">
                <div className="rounded-3xl border border-border bg-muted/70 p-4 text-center">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile photo"
                      className="mx-auto h-32 w-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 text-5xl font-bold text-primary-foreground">
                      {name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageChange}
                  />
                  <label htmlFor="profileImage" className="inline-flex cursor-pointer items-center justify-center rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    Upload photo
                  </label>
                  {profileImage && (
                    <button
                      type="button"
                      onClick={handleRemoveProfileImage}
                      className="text-sm text-destructive underline-offset-4 hover:underline"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} className="pl-10" disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Notifications</h2>
                <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add a second verification step for your account</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/two-factor-auth')}>
                  Manage 2FA
                </Button>
              </div>
              <Separator />
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Security</h2>
                <p className="text-sm text-muted-foreground">Manage your account security</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/change-password')}>
                Change Password
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90 flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleLogout} className="text-destructive hover:text-destructive gap-2">
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
