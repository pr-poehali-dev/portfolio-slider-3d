import { useState, useEffect } from 'react';
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
  const [currentProject, setCurrentProject] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const getCardPosition = (index: number) => {
    const diff = index - currentProject;
    const absShift = Math.abs(diff);
    
    if (diff === 0) {
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1.2,
        opacity: 1,
        zIndex: 50
      };
    }
    
    const direction = diff > 0 ? 1 : -1;
    return {
      x: direction * (300 + absShift * 50),
      z: -absShift * 200,
      rotateY: direction * 45,
      scale: 1 - absShift * 0.15,
      opacity: Math.max(0.3, 1 - absShift * 0.3),
      zIndex: 50 - absShift
    };
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.6 + 0.2,
              boxShadow: '0 0 20px rgba(234, 179, 8, 0.8)'
            }}
          />
        ))}
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between backdrop-blur-xl bg-background/30 border-b border-gold/20">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-foreground">PORT</span>
          <span className="text-gold" style={{ textShadow: '0 0 30px rgba(234, 179, 8, 0.6)' }}>FOLIO</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#work" className="text-sm hover:text-gold transition-colors relative group">
            Work
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.8)' }} />
          </a>
          <a href="#about" className="text-sm hover:text-gold transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.8)' }} />
          </a>
          <a href="#contact" className="text-sm hover:text-gold transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.8)' }} />
          </a>
        </div>

        <Button 
          variant="outline" 
          className="border-gold text-gold hover:bg-gold hover:text-background transition-all"
          style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)' }}
        >
          Get in Touch
        </Button>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20">
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/20 rounded-full blur-[120px] animate-pulse"
            style={{ animation: 'float 8s ease-in-out infinite' }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px] animate-pulse"
            style={{ animation: 'float 10s ease-in-out infinite reverse' }}
          />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 mb-16 animate-fade-in">
          <div className="inline-block mb-6 px-6 py-3 border-2 border-gold/50 rounded-full text-gold text-sm backdrop-blur-sm font-semibold" style={{ boxShadow: '0 0 30px rgba(234, 179, 8, 0.4)' }}>
            ✨ Creative Developer & Designer
          </div>
          
          <h1 className="text-8xl md:text-[10rem] font-bold mb-8 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Premium
            </span>
            <br />
            <span 
              className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent"
              style={{ 
                textShadow: '0 0 80px rgba(234, 179, 8, 0.5)',
                WebkitTextStroke: '1px rgba(234, 179, 8, 0.3)'
              }}
            >
              Digital
            </span>
            <br />
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>
          
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Crafting innovative web solutions that blend cutting-edge technology with elegant design
          </p>

          <div className="flex items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-gold text-background hover:bg-gold/90 hover:scale-110 transition-all text-lg px-8 py-6 font-semibold"
              style={{ boxShadow: '0 0 40px rgba(234, 179, 8, 0.6)' }}
            >
              View Projects
              <Icon name="ArrowRight" className="ml-2" size={24} />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-gold/40 hover:border-gold hover:bg-gold/10 text-lg px-8 py-6"
              style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.2)' }}
            >
              About Me
            </Button>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={40} className="text-gold" style={{ filter: 'drop-shadow(0 0 10px rgba(234, 179, 8, 0.8))' }} />
        </div>
      </section>

      <section id="work" className="relative py-32 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-32 animate-fade-in">
            <h2 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Featured{' '}
              <span 
                className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent"
                style={{ textShadow: '0 0 60px rgba(234, 179, 8, 0.4)' }}
              >
                Projects
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground">Experience my work in 3D space</p>
          </div>

          <div className="relative h-[600px] perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center">
              {projects.map((project, index) => {
                const pos = getCardPosition(index);
                const isActive = index === currentProject;
                
                return (
                  <div
                    key={project.id}
                    className="absolute transition-all duration-700 ease-out transform-3d cursor-pointer"
                    style={{
                      transform: `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.rotateY}deg) scale(${pos.scale})`,
                      opacity: pos.opacity,
                      zIndex: pos.zIndex,
                    }}
                    onClick={() => setCurrentProject(index)}
                  >
                    <Card 
                      className="w-[500px] border-2 border-border hover:border-gold transition-all duration-500 overflow-hidden backface-hidden"
                      style={{
                        boxShadow: isActive 
                          ? '0 0 60px rgba(234, 179, 8, 0.5), 0 30px 60px rgba(0, 0, 0, 0.6)' 
                          : '0 20px 40px rgba(0, 0, 0, 0.4)'
                      }}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden group">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        
                        {isActive && (
                          <div 
                            className="absolute inset-0 bg-gold/10"
                            style={{ boxShadow: 'inset 0 0 100px rgba(234, 179, 8, 0.3)' }}
                          />
                        )}
                        
                        <div 
                          className="absolute top-6 right-6 px-4 py-2 bg-gold text-background rounded-full text-sm font-bold"
                          style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.8)' }}
                        >
                          {project.year}
                        </div>
                      </div>
                    </Card>

                    {isActive && (
                      <div 
                        className="absolute -inset-8 bg-gold/10 rounded-full blur-[100px] -z-10 animate-pulse"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-24 text-center space-y-8 animate-fade-in">
            <div className="inline-block px-6 py-3 border-2 border-gold/40 rounded-full text-gold text-lg font-semibold" style={{ boxShadow: '0 0 30px rgba(234, 179, 8, 0.3)' }}>
              {projects[currentProject].category}
            </div>

            <h3 className="text-5xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
              {projects[currentProject].title}
            </h3>

            <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {projects[currentProject].description}
            </p>

            <div className="flex items-center justify-center gap-6 pt-6">
              <Button 
                className="bg-gold text-background hover:bg-gold/90 group text-lg px-8 py-6"
                style={{ boxShadow: '0 0 40px rgba(234, 179, 8, 0.5)' }}
              >
                View Case Study
                <Icon name="ExternalLink" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button 
                variant="ghost" 
                className="text-gold hover:text-gold/80 hover:bg-gold/10 text-lg px-8 py-6"
              >
                Live Demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-12">
              <Button
                size="icon"
                variant="outline"
                onClick={prevProject}
                className="border-2 border-gold/40 hover:border-gold hover:bg-gold/20 rounded-full w-16 h-16"
                style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)' }}
              >
                <Icon name="ChevronLeft" size={32} />
              </Button>
              
              <div className="flex gap-3">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProject(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === currentProject 
                        ? 'w-12 bg-gold' 
                        : 'w-3 bg-border hover:bg-gold/50'
                    }`}
                    style={index === currentProject ? { boxShadow: '0 0 20px rgba(234, 179, 8, 0.8)' } : {}}
                  />
                ))}
              </div>

              <Button
                size="icon"
                variant="outline"
                onClick={nextProject}
                className="border-2 border-gold/40 hover:border-gold hover:bg-gold/20 rounded-full w-16 h-16"
                style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)' }}
              >
                <Icon name="ChevronRight" size={32} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 border-t border-gold/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-bold mb-10 animate-fade-in leading-tight">
            Let's Create Something
            <br />
            <span 
              className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent"
              style={{ textShadow: '0 0 60px rgba(234, 179, 8, 0.4)' }}
            >
              Extraordinary
            </span>
          </h2>
          
          <p className="text-2xl text-muted-foreground mb-16 animate-fade-in leading-relaxed">
            Ready to bring your vision to life? Let's talk about your next project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in mb-12">
            <Button 
              size="lg" 
              className="bg-gold text-background hover:bg-gold/90 hover:scale-110 transition-all text-xl px-12 py-8"
              style={{ boxShadow: '0 0 50px rgba(234, 179, 8, 0.6)' }}
            >
              <Icon name="Mail" className="mr-3" size={24} />
              Start a Project
            </Button>
            
            <div className="flex items-center gap-6">
              <Button 
                size="icon" 
                variant="outline" 
                className="border-2 border-gold/40 hover:border-gold hover:bg-gold/20 rounded-full w-16 h-16"
                style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)' }}
              >
                <Icon name="Github" size={24} />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="border-2 border-gold/40 hover:border-gold hover:bg-gold/20 rounded-full w-16 h-16"
                style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)' }}
              >
                <Icon name="Linkedin" size={24} />
              </Button>
              <Button 
                size="icon" 
                variant="outline" 
                className="border-2 border-gold/40 hover:border-gold hover:bg-gold/20 rounded-full w-16 h-16"
                style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)' }}
              >
                <Icon name="Twitter" size={24} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-12 px-6 border-t border-gold/20">
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
