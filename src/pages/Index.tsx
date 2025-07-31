import { useNavigate } from 'react-router-dom';
import { condoProjects } from '@/data/condoData';
import { ProjectCard } from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Building2, MapPin, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = condoProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.developer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProjects = condoProjects.length;
  const totalUnits = condoProjects.reduce((sum, project) => sum + project.totalUnits, 0);
  const availableUnits = condoProjects.reduce((sum, project) => sum + project.availableUnits, 0);

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
              ค้นหาคอนโดในฝัน
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-up">
              เปรียบเทียบราคาและรายละเอียดคอนโดมิเนียมจากโครงการต่างๆ ในกรุงเทพมหานคร
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 animate-fade-up">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="ค้นหาตามชื่อโครงการ สถานที่ หรือผู้พัฒนา..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-4 text-lg bg-white/95 backdrop-blur border-white/20 focus:border-white/40"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center animate-fade-up">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Building2 className="w-8 h-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold">{totalProjects}</div>
                <div className="text-white/80">โครงการ</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold">{totalUnits}</div>
                <div className="text-white/80">ยูนิตทั้งหมด</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-white" />
                <div className="text-3xl font-bold">{availableUnits}</div>
                <div className="text-white/80">ยูนิตว่าง</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            โครงการคอนโดมิเนียม
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            เลือกดูโครงการที่สนใจ เพื่อดูรายละเอียดยูนิตและราคาอย่างละเอียด
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => navigate(`/project/${project.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              ไม่พบโครงการที่ค้นหา
            </h3>
            <p className="text-muted-foreground mb-6">
              ลองใช้คำค้นหาอื่น หรือดูโครงการทั้งหมด
            </p>
            <Button onClick={() => setSearchTerm('')} variant="outline">
              แสดงโครงการทั้งหมด
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
