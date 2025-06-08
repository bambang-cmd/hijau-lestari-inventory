
import { useState, useEffect } from 'react';
import { InventoryItem, WasteCategory, wasteCategories } from '../types/inventory';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';

interface AddEditItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<InventoryItem, 'id' | 'dateAdded' | 'lastUpdated'>) => void;
  editItem?: InventoryItem | null;
}

const AddEditItemDialog = ({ isOpen, onClose, onSave, editItem }: AddEditItemDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '' as WasteCategory,
    description: '',
    quantity: 1,
    unit: 'pcs',
    condition: 'Baik' as 'Baik' | 'Rusak' | 'Perlu Diperbaiki',
    location: '',
    imageUrl: '',
    estimatedValue: 0
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        category: editItem.category,
        description: editItem.description,
        quantity: editItem.quantity,
        unit: editItem.unit,
        condition: editItem.condition,
        location: editItem.location,
        imageUrl: editItem.imageUrl || '',
        estimatedValue: editItem.estimatedValue || 0
      });
    } else {
      setFormData({
        name: '',
        category: '' as WasteCategory,
        description: '',
        quantity: 1,
        unit: 'pcs',
        condition: 'Baik',
        location: '',
        imageUrl: '',
        estimatedValue: 0
      });
    }
  }, [editItem, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) return;
    
    onSave(formData);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>
            {editItem ? 'Edit Item' : 'Tambah Item Baru'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama Item</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Kategori</Label>
            <Select
              value={formData.category}
              onValueChange={(value: WasteCategory) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {wasteCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="quantity">Jumlah</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="unit">Satuan</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pcs">pcs</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="gram">gram</SelectItem>
                  <SelectItem value="liter">liter</SelectItem>
                  <SelectItem value="m³">m³</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="condition">Kondisi</Label>
            <Select
              value={formData.condition}
              onValueChange={(value: 'Baik' | 'Rusak' | 'Perlu Diperbaiki') => 
                setFormData(prev => ({ ...prev, condition: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baik">Baik</SelectItem>
                <SelectItem value="Perlu Diperbaiki">Perlu Diperbaiki</SelectItem>
                <SelectItem value="Rusak">Rusak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Gudang A, Rak 1, dll"
            />
          </div>

          <div>
            <Label htmlFor="estimatedValue">Estimasi Nilai (Rp)</Label>
            <Input
              id="estimatedValue"
              type="number"
              min="0"
              value={formData.estimatedValue}
              onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <div>
            <Label htmlFor="image">Foto Item</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
                className="flex-1"
              >
                <Upload size={16} className="mr-2" />
                Upload Foto
              </Button>
            </div>
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              {editItem ? 'Update' : 'Simpan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditItemDialog;
