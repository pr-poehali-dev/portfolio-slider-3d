import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Luxury E-Commerce Platform',
    category: 'Web Development',
    description: 'Premium online shopping experience with 3D product visualization',
    image: '/placeholder.svg',
    year: '2024'
  },
  {
    id: 2,
    title: 'AI-Powered Analytics Dashboard',
    category: 'UI/UX Design',
    description: 'Real-time data visualization with predictive insights',
    image: 'https://cdn.poehali.dev/projects/209403b8-fcc2-41a4-8a4f-0142e038fe8d/files/9d2a882d-66bc-4807-8450-3f17be4f09a5.jpg',
    year: '2024'
  },
  {
    id: 3,
    title: 'Immersive Brand Experience',
    category: 'Creative Direction',
    description: 'Interactive 3D brand storytelling platform',
    image: 'https://cdn.poehali.dev/projects/209403b8-fcc2-41a4-8a4f-0142e038fe8d/files/a9af281d-2e3c-4da7-80b0-cc76116ecde2.jpg',
    year: '2023'
  },
  {
    id: 4,
    title: 'Fintech Mobile Application',
    category: 'Product Design',
    description: 'Intuitive financial management with AR features',
    image: 'https://cdn.poehali.dev/projects/209403b8-fcc2-41a4-8a4f-0142e038fe8d/files/dc83a837-cb34-4a0d-8d36-f67736755114.jpg',
    year: '2023'
  }
];

const Index = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between backdrop-blur-md bg-background/50 border-b border-border/50">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-foreground">PORT</span>
          <span className="text-gold">FOLIO</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-sm hover:text-gold transition-colors">Work</a>
          <a href="#about" className="text-sm hover:text-gold transition-colors">About</a>
          <a href="#contact" className="text-sm hover:text-gold transition-colors">Contact</a>
        </div>

        <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-background">
          Get in Touch
        </Button>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center perspective-1000">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            ref={sphereRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] transform-3d animate-float"
            style={{
              transform: `translate(-50%, -50%) rotateY(${mousePosition.x * 20}deg) rotateX(${-mousePosition.y * 20}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-gold/20 backdrop-blur-3xl bg-gradient-to-br from-gold/10 to-transparent animate-rotate-3d" />
            
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gold rounded-full animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  opacity: Math.random() * 0.5 + 0.2
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in">
          <div className="inline-block mb-6 px-4 py-2 border border-gold/30 rounded-full text-gold text-sm backdrop-blur-sm">
            Creative Developer & Designer
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            Premium
            <br />
            <span className="text-gold">Digital</span>
            <br />
            Experiences
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Crafting innovative web solutions that blend cutting-edge technology with elegant design
          </p>

          <div className="flex items-center justify-center gap-6">
            <Button size="lg" className="bg-gold text-background hover:bg-gold/90 hover:scale-105 transition-transform">
              View Projects
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="border-gold/30 hover:border-gold hover:bg-gold/10">
              About Me
            </Button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-gold/50" />
        </div>
      </section>

      <section id="work" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Featured <span className="text-gold">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground">A selection of recent work</p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div 
                className="relative group perspective-1000"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Card 
                  className="relative overflow-hidden border-2 border-border hover:border-gold transition-all duration-500 transform-3d hover:scale-105"
                  style={{
                    transform: isHovering 
                      ? `rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg) translateZ(20px)`
                      : 'none',
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-muted to-background relative">
                    <img 
                      src={projects[currentProject].image} 
                      alt={projects[currentProject].title}
                      className="w-full h-full object-cover opacity-70"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    
                    <div className="absolute top-6 right-6 px-4 py-2 bg-gold text-background rounded-full text-sm font-semibold">
                      {projects[currentProject].year}
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>

                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10 group-hover:bg-gold/10 transition-colors duration-500" />
              </div>

              <div className="space-y-8 animate-fade-in">
                <div className="inline-block px-4 py-2 border border-gold/30 rounded-full text-gold text-sm">
                  {projects[currentProject].category}
                </div>

                <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                  {projects[currentProject].title}
                </h3>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {projects[currentProject].description}
                </p>

                <div className="flex items-center gap-4">
                  <Button className="bg-gold text-background hover:bg-gold/90 group">
                    View Case Study
                    <Icon name="ExternalLink" className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                  <Button variant="ghost" className="text-gold hover:text-gold/80">
                    Live Demo
                  </Button>
                </div>

                <div className="flex items-center gap-4 pt-8">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={prevProject}
                    className="border-gold/30 hover:border-gold hover:bg-gold/10 rounded-full"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </Button>
                  
                  <div className="flex gap-2">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentProject(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentProject 
                            ? 'w-8 bg-gold' 
                            : 'w-2 bg-border hover:bg-gold/50'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={nextProject}
                    className="border-gold/30 hover:border-gold hover:bg-gold/10 rounded-full"
                  >
                    <Icon name="ChevronRight" size={24} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
            Let's Create Something
            <br />
            <span className="text-gold">Extraordinary</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in">
            Ready to bring your vision to life? Let's talk about your next project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in">
            <Button size="lg" className="bg-gold text-background hover:bg-gold/90 hover:scale-105 transition-transform">
              <Icon name="Mail" className="mr-2" size={20} />
              Start a Project
            </Button>
            
            <div className="flex items-center gap-4">
              <Button size="icon" variant="outline" className="border-gold/30 hover:border-gold hover:bg-gold/10 rounded-full">
                <Icon name="Github" size={20} />
              </Button>
              <Button size="icon" variant="outline" className="border-gold/30 hover:border-gold hover:bg-gold/10 rounded-full">
                <Icon name="Linkedin" size={20} />
              </Button>
              <Button size="icon" variant="outline" className="border-gold/30 hover:border-gold hover:bg-gold/10 rounded-full">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground">
            © 2024 Portfolio. All rights reserved.
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;