import { CondoProject } from '@/types/condo';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, Calendar } from 'lucide-react';

interface ProjectCardProps {
  project: CondoProject;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-medium hover:scale-[1.02] bg-card border-border animate-fade-up"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden bg-gradient-surface">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{project.location}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Building2 className="w-4 h-4 mr-1" />
              <span>{project.developer}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{project.completionDate}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">ช่วงราคา</span>
              <span className="font-semibold text-primary">
                {formatPrice(project.priceRange.min)} - {formatPrice(project.priceRange.max)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-1" />
                <span>ว่าง {project.availableUnits} / {project.totalUnits} ยูนิต</span>
              </div>
              <Badge 
                variant={project.availableUnits > 0 ? "default" : "secondary"}
                className={project.availableUnits > 0 ? "bg-success text-success-foreground" : ""}
              >
                {project.availableUnits > 0 ? 'มีห้องว่าง' : 'เต็ม'}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {project.facilities.slice(0, 3).map((facility, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {facility}
              </Badge>
            ))}
            {project.facilities.length > 3 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{project.facilities.length - 3} อื่นๆ
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};