
import { useState, useEffect } from 'react';
import { InventoryItem, WasteCategory } from '../types/inventory';

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from localStorage
    const savedItems = localStorage.getItem('inventory-items');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems).map((item: any) => ({
        ...item,
        dateAdded: new Date(item.dateAdded),
        lastUpdated: new Date(item.lastUpdated)
      }));
      setItems(parsedItems);
    }
    setLoading(false);
  }, []);

  const saveToStorage = (newItems: InventoryItem[]) => {
    localStorage.setItem('inventory-items', JSON.stringify(newItems));
    setItems(newItems);
  };

  const addItem = (item: Omit<InventoryItem, 'id' | 'dateAdded' | 'lastUpdated'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
      dateAdded: new Date(),
      lastUpdated: new Date()
    };
    const newItems = [...items, newItem];
    saveToStorage(newItems);
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    const newItems = items.map(item =>
      item.id === id
        ? { ...item, ...updates, lastUpdated: new Date() }
        : item
    );
    saveToStorage(newItems);
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    saveToStorage(newItems);
  };

  const filterByCategory = (category: WasteCategory) => {
    return items.filter(item => item.category === category);
  };

  const searchItems = (query: string) => {
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    filterByCategory,
    searchItems
  };
};
