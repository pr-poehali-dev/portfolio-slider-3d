import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Modern online store with real-time inventory and AI recommendations',
    image: 'https://cdn.poehali.dev/projects/209403b8-fcc2-41a4-8a4f-0142e038fe8d/files/069141fb-6195-401b-9f74-0d236cbdcfa8.jpg',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description: 'Secure financial management with biometric authentication',
    image: 'https://cdn.poehali.dev/projects/209403b8-fcc2-41a4-8a4f-0142e038fe8d/files/6f7a862a-8559-4ba0-9269-76eb26788f2a.jpg',
    tech: ['React Native', 'Firebase', 'Stripe'],
    link: '#'
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization with predictive insights',
    image: 'https://cdn.poehali.dev/projects/209403b8-fcc2-41a4-8a4f-0142e038fe8d/files/9d2a882d-66bc-4807-8450-3f17be4f09a5.jpg',
    tech: ['Vue.js', 'D3.js', 'Python'],
    link: '#'
  },
  {
    id: 4,
    title: 'Social Network',
    description: 'Community platform with live messaging and content sharing',
    image: 'https://cdn.poehali.dev/projects/209403b8-fcc2-41a4-8a4f-0142e038fe8d/files/a9af281d-2e3c-4da7-80b0-cc76116ecde2.jpg',
    tech: ['Next.js', 'GraphQL', 'PostgreSQL'],
    link: '#'
  }
];

const socialLinks = [
  { name: 'GitHub', icon: 'Github', url: 'https://github.com', color: 'hover:text-neon-purple' },
  { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com', color: 'hover:text-red-500' },
  { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com', color: 'hover:text-neon-pink' },
  { name: 'Send', icon: 'Send', url: 'https://telegram.org', color: 'hover:text-neon-cyan' },
];

const Index = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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

  const getCardTransform = (index: number) => {
    const diff = index - currentProject;
    const absShift = Math.abs(diff);
    
    if (diff === 0) {
      return {
        x: 0,
        y: 0,
        z: 100,
        rotateY: 0,
        rotateX: mousePosition.y * -10,
        scale: 1,
        opacity: 1,
        zIndex: 50
      };
    }
    
    const direction = diff > 0 ? 1 : -1;
    return {
      x: direction * (400 + absShift * 100),
      y: absShift * 50,
      z: -absShift * 300,
      rotateY: direction * 55,
      rotateX: 0,
      scale: 1 - absShift * 0.2,
      opacity: Math.max(0.2, 1 - absShift * 0.4),
      zIndex: 50 - absShift
    };
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-neon-purple rounded-full blur-[150px] opacity-20 animate-pulse"
          style={{ 
            animation: 'float 15s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-cyan rounded-full blur-[120px] opacity-20 animate-pulse"
          style={{ 
            animation: 'float 12s ease-in-out infinite reverse',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-neon-pink rounded-full blur-[100px] opacity-10 animate-pulse"
          style={{ 
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />

        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full animate-glow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              boxShadow: '0 0 10px hsl(var(--neon-purple))'
            }}
          />
        ))}
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/40 border-b border-neon-purple/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-wider">
            <span className="text-neon-purple" style={{ textShadow: '0 0 20px hsl(var(--neon-purple))' }}>
              DEV
            </span>
            <span className="text-neon-cyan" style={{ textShadow: '0 0 20px hsl(var(--neon-cyan))' }}>
              .SPACE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg border border-border/50 ${social.color} transition-all hover:scale-110 hover:border-current`}
                style={{ 
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                <Icon name={social.icon} size={20} />
              </a>
            ))}
          </div>

          <Button 
            variant="outline"
            className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-background transition-all"
            style={{ 
              boxShadow: '0 0 20px hsla(var(--neon-purple), 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Contact
          </Button>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'slice-animation' : 'opacity-0'}`}>
          <div className="relative group perspective-2000">
            <div
              className="relative z-10 transform-3d transition-transform duration-300"
              style={{
                transform: `rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg)`
              }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-neon-purple to-neon-cyan rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"
                style={{ transform: 'translateZ(-50px) scale(1.1)' }}
              />
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-neon-purple/50 group-hover:border-neon-purple transition-all">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-cyan/20"
                  style={{ 
                    boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(2px)'
                  }}
                />
                
                <img
                  src="https://cdn.poehali.dev/projects/209403b8-fcc2-41a4-8a4f-0142e038fe8d/files/5fee3921-4f87-433f-88a9-a665249a46d4.jpg"
                  alt="Developer Portrait"
                  className="w-full aspect-[3/4] object-cover relative z-10"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse"
                      style={{ boxShadow: '0 0 20px hsl(var(--neon-cyan))' }}
                    />
                    <span className="text-sm text-muted-foreground">Available for projects</span>
                  </div>
                </div>
              </div>

              <div 
                className="absolute -right-8 -top-8 w-32 h-32 border-2 border-neon-cyan rounded-full opacity-30"
                style={{ transform: 'translateZ(20px)' }}
              />
              <div 
                className="absolute -left-8 -bottom-8 w-24 h-24 border-2 border-neon-pink rounded-full opacity-30"
                style={{ transform: 'translateZ(30px)' }}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full border border-neon-purple/50 text-neon-purple text-sm font-semibold backdrop-blur-sm">
                Full-Stack Developer
              </div>

              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                Building The
                <br />
                <span 
                  className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent"
                  style={{ 
                    WebkitTextStroke: '1px rgba(167, 139, 250, 0.3)',
                  }}
                >
                  Future
                </span>
                <br />
                of Web
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Crafting exceptional digital experiences with cutting-edge technologies. 
                Specialized in creating immersive 3D interfaces and scalable web applications.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-neon-purple hover:bg-neon-purple/90 text-white font-semibold text-lg px-8 py-6 rounded-2xl group"
                style={{ boxShadow: '0 0 30px hsla(var(--neon-purple), 0.5)' }}
              >
                View Projects
                <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background font-semibold text-lg px-8 py-6 rounded-2xl"
                style={{ boxShadow: '0 0 20px hsla(var(--neon-cyan), 0.3)' }}
              >
                Download CV
                <Icon name="Download" size={20} />
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-neon-purple to-neon-cyan"
                  />
                ))}
              </div>
              <div>
                <div className="font-semibold">50+ Projects</div>
                <div className="text-sm text-muted-foreground">Delivered worldwide</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <Icon name="ChevronDown" size={32} className="text-neon-purple" />
        </div>
      </section>

      <section className="relative py-32 px-6 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-block px-4 py-2 rounded-full border border-neon-cyan/50 text-neon-cyan text-sm font-semibold backdrop-blur-sm mb-4">
              Portfolio
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold">
              Featured{' '}
              <span 
                className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent"
                style={{ WebkitTextStroke: '1px rgba(34, 211, 238, 0.3)' }}
              >
                Projects
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground">Explore my work in 3D space</p>
          </div>

          <div className="relative h-[700px] perspective-2000">
            <div className="absolute inset-0 flex items-center justify-center">
              {projects.map((project, index) => {
                const transform = getCardTransform(index);
                const isActive = index === currentProject;
                
                return (
                  <div
                    key={project.id}
                    className="absolute transition-all duration-700 ease-out transform-3d cursor-pointer"
                    style={{
                      transform: `
                        translateX(${transform.x}px) 
                        translateY(${transform.y}px) 
                        translateZ(${transform.z}px) 
                        rotateY(${transform.rotateY}deg) 
                        rotateX(${transform.rotateX}deg) 
                        scale(${transform.scale})
                      `,
                      opacity: transform.opacity,
                      zIndex: transform.zIndex,
                    }}
                    onClick={() => setCurrentProject(index)}
                  >
                    <Card 
                      className="w-[550px] border-2 border-border hover:border-neon-purple transition-all duration-500 overflow-hidden backface-hidden rounded-3xl"
                      style={{
                        boxShadow: isActive 
                          ? '0 0 60px hsla(var(--neon-purple), 0.5), 0 40px 80px rgba(0, 0, 0, 0.6)' 
                          : '0 20px 60px rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(10px)',
                        background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.8) 100%)'
                      }}
                    >
                      <div className="relative aspect-video overflow-hidden group">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                        
                        {isActive && (
                          <>
                            <div 
                              className="absolute inset-0"
                              style={{ 
                                background: 'linear-gradient(135deg, hsla(var(--neon-purple), 0.2) 0%, hsla(var(--neon-cyan), 0.1) 100%)',
                                boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.5)'
                              }}
                            />
                            <div 
                              className="absolute top-4 right-4 w-16 h-16 border-2 border-neon-purple rounded-full animate-ping"
                              style={{ animationDuration: '2s' }}
                            />
                          </>
                        )}
                      </div>

                      <div className="p-6 space-y-4">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <p className="text-muted-foreground">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span 
                              key={tech}
                              className="px-3 py-1 text-xs rounded-full border border-neon-cyan/30 text-neon-cyan backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>

                    {isActive && (
                      <>
                        <div 
                          className="absolute -inset-12 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full blur-[100px] opacity-30 -z-10 animate-pulse"
                        />
                        <div 
                          className="absolute -right-12 top-1/2 -translate-y-1/2 w-32 h-32 border-2 border-neon-cyan rounded-full opacity-20"
                          style={{ transform: 'translateZ(-50px) translateY(-50%)' }}
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mt-20">
            <Button
              size="icon"
              variant="outline"
              onClick={prevProject}
              className="w-16 h-16 rounded-full border-2 border-neon-purple hover:bg-neon-purple hover:text-background transition-all"
              style={{ boxShadow: '0 0 20px hsla(var(--neon-purple), 0.3)' }}
            >
              <Icon name="ChevronLeft" size={28} />
            </Button>
            
            <div className="flex gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentProject 
                      ? 'w-12 bg-neon-purple' 
                      : 'w-2 bg-border hover:bg-neon-purple/50'
                  }`}
                  style={index === currentProject ? { boxShadow: '0 0 20px hsl(var(--neon-purple))' } : {}}
                />
              ))}
            </div>

            <Button
              size="icon"
              variant="outline"
              onClick={nextProject}
              className="w-16 h-16 rounded-full border-2 border-neon-purple hover:bg-neon-purple hover:text-background transition-all"
              style={{ boxShadow: '0 0 20px hsla(var(--neon-purple), 0.3)' }}
            >
              <Icon name="ChevronRight" size={28} />
            </Button>
          </div>

          <div className="text-center mt-16 space-y-6">
            <h3 className="text-3xl font-bold">{projects[currentProject].title}</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {projects[currentProject].description}
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button
                className="bg-neon-purple hover:bg-neon-purple/90 text-white font-semibold px-6 py-5 rounded-xl group"
                style={{ boxShadow: '0 0 30px hsla(var(--neon-purple), 0.4)' }}
              >
                View Details
                <Icon name="ExternalLink" className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
              </Button>
              
              <Button
                variant="outline"
                className="border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-background font-semibold px-6 py-5 rounded-xl"
                style={{ boxShadow: '0 0 20px hsla(var(--neon-cyan), 0.3)' }}
              >
                <Icon name="Github" className="mr-2" size={18} />
                Source Code
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 border-t border-neon-purple/20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-6xl md:text-7xl font-bold mb-6">
              Let's Build
              <br />
              <span 
                className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent"
                style={{ WebkitTextStroke: '1px rgba(34, 211, 238, 0.3)' }}
              >
                Together
              </span>
            </h2>
            
            <p className="text-2xl text-muted-foreground">
              Have a project in mind? Let's create something amazing!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-white font-bold text-xl px-12 py-8 rounded-2xl group"
              style={{ boxShadow: '0 0 40px hsla(var(--neon-purple), 0.6)' }}
            >
              <Icon name="Mail" className="mr-3 group-hover:scale-110 transition-transform" size={24} />
              Get In Touch
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border hover:border-current transition-all group"
                style={{ 
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                <Icon name={social.icon} size={20} className={`${social.color} group-hover:scale-110 transition-transform`} />
                <span className="font-semibold">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative py-8 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 Dev.Space • Built with passion and code
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-neon-purple transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-neon-purple transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
