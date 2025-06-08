
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import AddEditItemDialog from '../components/AddEditItemDialog';
import { InventoryItem } from '../types/inventory';
import { useToast } from '@/hooks/use-toast';

const AddItem = () => {
  const navigate = useNavigate();
  const { addItem } = useInventory();
  const { toast } = useToast();

  const handleAddItem = (itemData: Omit<InventoryItem, 'id' | 'dateAdded' | 'lastUpdated'>) => {
    addItem(itemData);
    toast({
      title: "Item berhasil ditambahkan",
      description: `${itemData.name} telah ditambahkan ke inventory`,
    });
    navigate('/');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Tambah Item</h1>
        <p className="text-muted-foreground text-sm">Tambahkan item baru ke inventory</p>
      </div>

      <AddEditItemDialog
        isOpen={true}
        onClose={handleClose}
        onSave={handleAddItem}
      />
    </div>
  );
};

export default AddItem;
