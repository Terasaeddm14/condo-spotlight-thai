import { useParams, useNavigate } from 'react-router-dom';
import { condoProjects, condoUnits } from '@/data/condoData';
import { UnitCard } from '@/components/UnitCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building2, MapPin, Users, Calendar } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = condoProjects.find(p => p.id === id);
  const projectUnits = condoUnits.filter(unit => unit.projectId === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบโครงการที่ต้องการ</h1>
          <Button onClick={() => navigate('/')}>กลับหน้าหลัก</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const availableUnits = projectUnits.filter(unit => unit.status === 'available');
  const reservedUnits = projectUnits.filter(unit => unit.status === 'reserved');
  const soldUnits = projectUnits.filter(unit => unit.status === 'sold');

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับหน้าหลัก
          </Button>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project Image */}
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {project.name}
                </h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{project.location}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">ผู้พัฒนา</div>
                    <div className="font-medium">{project.developer}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">ปีที่แล้วเสร็จ</div>
                    <div className="font-medium">{project.completionDate}</div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/30 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-2">ช่วงราคา</div>
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(project.priceRange.min)} - {formatPrice(project.priceRange.max)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  สถิติยูนิต
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ทั้งหมด</span>
                  <Badge variant="outline">{project.totalUnits} ยูนิต</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ว่าง</span>
                  <Badge className="bg-success text-success-foreground">
                    {availableUnits.length} ยูนิต
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">จอง</span>
                  <Badge variant="secondary">{reservedUnits.length} ยูนิต</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ขายแล้ว</span>
                  <Badge variant="destructive">{soldUnits.length} ยูนิต</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>สิ่งอำนวยความสะดวก</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {project.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {facility}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Units Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                รายการยูนิต ({projectUnits.length} ยูนิต)
              </h2>
              <p className="text-muted-foreground">
                เลือกดูรายละเอียดยูนิตที่สนใจ
              </p>
            </div>

            {projectUnits.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projectUnits.map((unit) => (
                  <UnitCard key={unit.id} unit={unit} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    ไม่มีข้อมูลยูนิต
                  </h3>
                  <p className="text-muted-foreground">
                    ขออภัย ยังไม่มีข้อมูลยูนิตสำหรับโครงการนี้
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;