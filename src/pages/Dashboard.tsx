
import { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { InventoryItem, WasteCategory } from '../types/inventory';
import ItemCard from '../components/ItemCard';
import CategoryFilter from '../components/CategoryFilter';
import AddEditItemDialog from '../components/AddEditItemDialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { items, loading, addItem, updateItem, deleteItem, searchItems } = useInventory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const { toast } = useToast();

  const filteredItems = () => {
    let result = items;
    
    if (searchQuery) {
      result = searchItems(searchQuery);
    }
    
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    return result;
  };

  const handleAddItem = (itemData: Omit<InventoryItem, 'id' | 'dateAdded' | 'lastUpdated'>) => {
    addItem(itemData);
    toast({
      title: "Item berhasil ditambahkan",
      description: `${itemData.name} telah ditambahkan ke inventory`,
    });
  };

  const handleUpdateItem = (itemData: Omit<InventoryItem, 'id' | 'dateAdded' | 'lastUpdated'>) => {
    if (editItem) {
      updateItem(editItem.id, itemData);
      toast({
        title: "Item berhasil diupdate",
        description: `${itemData.name} telah diperbarui`,
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    const item = items.find(i => i.id === id);
    deleteItem(id);
    toast({
      title: "Item berhasil dihapus",
      description: `${item?.name} telah dihapus dari inventory`,
      variant: "destructive",
    });
  };

  const handleEdit = (item: InventoryItem) => {
    setEditItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditItem(null);
  };

  const getTotalValue = () => {
    return filteredItems().reduce((total, item) => total + (item.estimatedValue || 0), 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Memuat inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">EcoInventory</h1>
        <p className="text-muted-foreground text-sm">Kelola limbah dan barang bekas dengan bijak</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-primary">{filteredItems().length}</div>
          <div className="text-xs text-muted-foreground">Total Item</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-primary">
            Rp {getTotalValue().toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-muted-foreground">Estimasi Nilai</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Cari item inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Add Button */}
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-full"
        size="lg"
      >
        <Plus size={16} className="mr-2" />
        Tambah Item Baru
      </Button>

      {/* Items List */}
      <div className="space-y-3">
        {filteredItems().length === 0 ? (
          <div className="text-center py-8">
            <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Belum ada item</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory
                ? 'Tidak ada item yang cocok dengan pencarian'
                : 'Mulai tambahkan item pertama Anda'}
            </p>
            {!searchQuery && !selectedCategory && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus size={16} className="mr-2" />
                Tambah Item
              </Button>
            )}
          </div>
        ) : (
          filteredItems().map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDeleteItem}
            />
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      <AddEditItemDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={editItem ? handleUpdateItem : handleAddItem}
        editItem={editItem}
      />
    </div>
  );
};

export default Dashboard;
