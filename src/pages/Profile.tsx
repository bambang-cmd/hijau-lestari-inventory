
import { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { wasteCategories } from '../types/inventory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Package, TrendingUp, Trash, Settings, Download } from 'lucide-react';

const Profile = () => {
  const { items } = useInventory();

  const getStatistics = () => {
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => sum + (item.estimatedValue || 0), 0);
    const categoryStats = wasteCategories.map(category => ({
      category,
      count: items.filter(item => item.category === category).length
    })).filter(stat => stat.count > 0);

    const conditionStats = {
      'Baik': items.filter(item => item.condition === 'Baik').length,
      'Perlu Diperbaiki': items.filter(item => item.condition === 'Perlu Diperbaiki').length,
      'Rusak': items.filter(item => item.condition === 'Rusak').length,
    };

    return { totalItems, totalValue, categoryStats, conditionStats };
  };

  const stats = getStatistics();

  const exportData = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `eco-inventory-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={32} className="text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-primary mb-2">Profil Pengguna</h1>
        <p className="text-muted-foreground text-sm">Kelola akun dan lihat statistik inventory</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="mx-auto h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold text-primary">{stats.totalItems}</div>
            <div className="text-xs text-muted-foreground">Total Item</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-bold text-primary">
              Rp {stats.totalValue.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-muted-foreground">Total Nilai</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statistik Kategori</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.categoryStats.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Belum ada item dalam inventory
              </p>
            ) : (
              stats.categoryStats.map(({ category, count }) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm">{category}</span>
                  <Badge variant="outline">{count} item</Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Condition Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kondisi Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(stats.conditionStats).map(([condition, count]) => (
              <div key={condition} className="flex justify-between items-center">
                <span className="text-sm">{condition}</span>
                <Badge 
                  variant={condition === 'Baik' ? 'default' : condition === 'Perlu Diperbaiki' ? 'secondary' : 'destructive'}
                >
                  {count} item
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={exportData}
          disabled={items.length === 0}
        >
          <Download size={16} className="mr-2" />
          Export Data
        </Button>
        
        <Button variant="outline" className="w-full">
          <Settings size={16} className="mr-2" />
          Pengaturan
        </Button>
      </div>

      {/* App Info */}
      <Card className="mt-8">
        <CardContent className="p-4 text-center">
          <div className="text-sm text-muted-foreground">
            <div className="mb-2">EcoInventory v1.0</div>
            <div>Aplikasi manajemen limbah dan barang bekas</div>
            <div className="mt-2 text-xs">
              Dibuat dengan ❤️ untuk kelestarian lingkungan
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
