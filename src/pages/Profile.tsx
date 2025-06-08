
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, LogOut, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, profile, signOut, updateProfile, resendVerification } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    province: profile?.province || '',
    postal_code: profile?.postal_code || '',
    date_of_birth: profile?.date_of_birth || ''
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleResendVerification = async () => {
    await resendVerification();
  };

  const getStatusBadge = (status: string, emailVerified: boolean) => {
    if (!emailVerified) {
      return <Badge variant="destructive">Email Belum Diverifikasi</Badge>;
    }
    
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Aktif</Badge>;
      case 'pending_verification':
        return <Badge variant="secondary">Menunggu Verifikasi</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Profile Saya</h1>
        <p className="text-muted-foreground text-sm">Kelola informasi akun Anda</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar_url || ''} />
              <AvatarFallback className="text-lg">
                {profile.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{profile.full_name || 'Nama Belum Diatur'}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="mt-2">
                {getStatusBadge(profile.status, profile.email_verified)}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Email Verification Alert */}
      {!profile.email_verified && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Email belum diverifikasi</p>
                <p className="text-xs text-muted-foreground">
                  Silakan verifikasi email Anda untuk mengaktifkan akun
                </p>
              </div>
              <Button size="sm" onClick={handleResendVerification}>
                Kirim Ulang
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Informasi Personal</CardTitle>
            <Button
              variant={editing ? "outline" : "default"}
              onClick={() => {
                if (editing) {
                  setFormData({
                    full_name: profile?.full_name || '',
                    phone: profile?.phone || '',
                    address: profile?.address || '',
                    city: profile?.city || '',
                    province: profile?.province || '',
                    postal_code: profile?.postal_code || '',
                    date_of_birth: profile?.date_of_birth || ''
                  });
                }
                setEditing(!editing);
              }}
            >
              {editing ? 'Batal' : 'Edit'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Nama Lengkap</Label>
              {editing ? (
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.full_name || 'Belum diatur'}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              {editing ? (
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Masukkan nomor telepon"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone || 'Belum diatur'}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
              {editing ? (
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {profile.date_of_birth 
                      ? new Date(profile.date_of_birth).toLocaleDateString('id-ID')
                      : 'Belum diatur'
                    }
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Alamat</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap</Label>
                {editing ? (
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Masukkan alamat lengkap"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.address || 'Belum diatur'}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Kota</Label>
                  {editing ? (
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Kota"
                    />
                  ) : (
                    <span>{profile.city || 'Belum diatur'}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="province">Provinsi</Label>
                  {editing ? (
                    <Input
                      id="province"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      placeholder="Provinsi"
                    />
                  ) : (
                    <span>{profile.province || 'Belum diatur'}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code">Kode Pos</Label>
                  {editing ? (
                    <Input
                      id="postal_code"
                      value={formData.postal_code}
                      onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                      placeholder="Kode Pos"
                    />
                  ) : (
                    <span>{profile.postal_code || 'Belum diatur'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {editing && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditing(false)}>
                Batal
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Akun</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={handleSignOut}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
