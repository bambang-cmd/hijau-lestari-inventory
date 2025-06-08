
import { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { WasteCategory } from '../types/inventory';
import ItemCard from '../components/ItemCard';
import CategoryFilter from '../components/CategoryFilter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Filter } from 'lucide-react';

const Search = () => {
  const { items, searchItems } = useInventory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WasteCategory | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const getFilteredItems = () => {
    let result = searchQuery ? searchItems(searchQuery) : items;
    
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    return result;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Pencarian</h1>
        <p className="text-muted-foreground text-sm">Temukan item inventory dengan mudah</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Cari nama item, kategori, atau deskripsi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-12"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-card border border-border rounded-lg p-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className="w-full"
          >
            Reset Filter
          </Button>
        </div>
      )}

      {/* Search Results */}
      <div className="space-y-3">
        {searchQuery || selectedCategory ? (
          <>
            <div className="text-sm text-muted-foreground">
              Ditemukan {filteredItems.length} item
              {searchQuery && ` untuk "${searchQuery}"`}
              {selectedCategory && ` dalam kategori ${selectedCategory}`}
            </div>
            
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <SearchIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Tidak ada hasil</h3>
                <p className="text-muted-foreground">
                  Coba ubah kata kunci atau filter pencarian
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <SearchIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Mulai Pencarian</h3>
            <p className="text-muted-foreground">
              Ketik kata kunci untuk mencari item inventory
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
