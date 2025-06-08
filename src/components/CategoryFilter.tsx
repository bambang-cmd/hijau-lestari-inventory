
import { WasteCategory, wasteCategories, categoryColors } from '../types/inventory';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryFilterProps {
  selectedCategory: WasteCategory | null;
  onCategorySelect: (category: WasteCategory | null) => void;
}

const CategoryFilter = ({ selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Filter Kategori</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer shrink-0"
            onClick={() => onCategorySelect(null)}
          >
            Semua
          </Badge>
          {wasteCategories.map((category) => (
            <Badge
              key={category}
              className={`cursor-pointer shrink-0 ${
                selectedCategory === category
                  ? categoryColors[category]
                  : 'bg-background text-foreground border-border hover:bg-accent'
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
