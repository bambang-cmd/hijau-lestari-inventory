
import { InventoryItem, categoryColors } from '../types/inventory';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

interface ItemCardProps {
  item: InventoryItem;
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

const ItemCard = ({ item, onEdit, onDelete }: ItemCardProps) => {
  return (
    <Card className="item-card">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
          </div>
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg ml-3"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={categoryColors[item.category]}>
            {item.category}
          </Badge>
          <Badge variant="outline">
            {item.quantity} {item.unit}
          </Badge>
          <Badge variant="outline">
            {item.condition}
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground mb-3">
          <div>📍 {item.location}</div>
          <div>📅 {item.dateAdded.toLocaleDateString('id-ID')}</div>
          {item.estimatedValue && (
            <div>💰 Rp {item.estimatedValue.toLocaleString('id-ID')}</div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="flex-1"
          >
            <Pencil size={14} className="mr-1" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="flex-1"
          >
            <Trash size={14} className="mr-1" />
            Hapus
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
