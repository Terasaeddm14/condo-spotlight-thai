import { CondoUnit } from '@/types/condo';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Square, Eye, DollarSign, Building } from 'lucide-react';

interface UnitCardProps {
  unit: CondoUnit;
}

export const UnitCard = ({ unit }: UnitCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-success text-success-foreground">ว่าง</Badge>;
      case 'reserved':
        return <Badge variant="secondary">จอง</Badge>;
      case 'sold':
        return <Badge variant="destructive">ขายแล้ว</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 bg-card border-border animate-scale-in">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                ห้อง {unit.unitNumber}
              </h3>
              <div className="flex items-center text-muted-foreground mt-1">
                <Building className="w-4 h-4 mr-1" />
                <span className="text-sm">ชั้น {unit.floor}</span>
              </div>
            </div>
            {getStatusBadge(unit.status)}
          </div>

          {/* Price */}
          <div className="bg-accent/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(unit.price)}
                </span>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <DollarSign className="w-3 h-3 mr-1" />
                  <span>{formatPrice(unit.pricePerSqm)}/ตร.ม.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-2 text-muted-foreground" />
              <div>
                <span className="font-medium">{unit.size}</span>
                <span className="text-sm text-muted-foreground ml-1">ตร.ม.</span>
              </div>
            </div>
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-2 text-muted-foreground" />
              <div>
                <span className="font-medium">{unit.bedrooms}</span>
                <span className="text-sm text-muted-foreground ml-1">ห้องนอน</span>
              </div>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-2 text-muted-foreground" />
              <div>
                <span className="font-medium">{unit.bathrooms}</span>
                <span className="text-sm text-muted-foreground ml-1">ห้องน้ำ</span>
              </div>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{unit.view}</span>
            </div>
          </div>

          {/* Unit Type & Balcony */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {unit.type}
            </Badge>
            {unit.balconySize && (
              <span className="text-sm text-muted-foreground">
                ระเบียง {unit.balconySize} ตร.ม.
              </span>
            )}
          </div>

          {/* Features */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">สิ่งอำนวยความสะดวก</span>
            <div className="flex flex-wrap gap-1">
              {unit.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};