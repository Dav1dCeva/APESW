import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Waves, Users, Calendar, Award, Star } from 'lucide-react';
import { Container } from '../../components/UI/Layout';
import { Button } from '../../components/UI/Button';
import { Card, CardBody } from '../../components/UI/Layout';

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const experiences = [
    {
      title: 'Buceo Profesional',
      description: 'Sumérgete en las profundidades del océano con nuestros instructores certificados y descubre un mundo submarino fascinante.',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Buceo bajo el agua',
      level: 'Todos los niveles',
      duration: '2-3 horas'
    },
    {
      title: 'Clases de Surf',
      description: 'Aprende a dominar las olas con nuestras clases de surf para todos los niveles, desde principiantes hasta avanzados.',
      image: 'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Clase de surf en la playa',
      level: 'Principiante a Avanzado',
      duration: '1.5-2 horas'
    },
    {
      title: 'Paseos en Lancha',
      description: 'Disfruta de la velocidad y el viento en el rostro con nuestros emocionantes paseos en lancha por la costa.',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Paseo en lancha',
      level: 'Familiar',
      duration: '1 hora'
    },
    {
      title: 'Snorkel en Arrecifes',
      description: 'Explora arrecifes de coral llenos de vida marina con nuestro equipo de snorkel de alta calidad.',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Snorkel con peces',
      level: 'Principiante',
      duration: '2 horas'
    },
  ];

  const testimonials = [
    {
      name: 'María González',
      location: 'Ciudad de México',
      rating: 5,
      comment: 'Una experiencia increíble. Los instructores son muy profesionales y el equipo de primera calidad.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Carlos Rodríguez',
      location: 'Guadalajara',
      rating: 5,
      comment: 'El buceo fue espectacular. Pude ver especies marinas que nunca había visto antes.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Ana Martínez',
      location: 'Monterrey',
      rating: 5,
      comment: 'Las clases de surf superaron mis expectativas. Ahora soy adicta a este deporte.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <Container>
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">AquaManta</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#experiencias" className="text-gray-600 hover:text-gray-900 transition-colors">
                Experiencias
              </a>
              <a href="#testimonios" className="text-gray-600 hover:text-gray-900 transition-colors">
                Testimonios
              </a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contacto
              </a>
              <div className="flex items-center space-x-4">
                <Link to="/auth/login">
                  <Button variant="ghost">Iniciar Sesión</Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="primary">Registrarse</Button>
                </Link>
                {/* Botón de traducción */}
              </div>
            </nav>

            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
              <a href="#experiencias" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                Experiencias
              </a>
              <a href="#testimonios" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                Testimonios
              </a>
              <Link to="/contact" className="block">
                <Button variant="ghost" className="w-full">Contacto</Button>
              </Link>
              <div className="px-4 space-y-2">
                <Link to="/auth/login" className="block">
                  <Button variant="ghost" className="w-full">Iniciar Sesión</Button>
                </Link>
                <Link to="/auth/register" className="block">
                  <Button variant="primary" className="w-full">Registrarse</Button>
                </Link>
                {/* Botón de traducción en menú móvil */}
                <div className="flex justify-center">
                </div>
              </div>
            </div>
          )}
        </Container>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight transform transition-all duration-1000 ease-out">
                ¡Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300 animate-pulse">AquaManta</span>!
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-300 to-cyan-300 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-xl lg:text-2xl mb-12 text-blue-50 leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
              Sumérgete en una aventura acuática inolvidable. Explora, siente, respira mar y vive experiencias únicas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/auth/register" className="transform transition-all duration-300 hover:scale-105">
                <Button variant="primary" size="lg" className="shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 border border-blue-400/30">
                  <span className="flex items-center gap-2">
                    Comenzar Aventura
                    <Waves className="w-5 h-5" />
                  </span>
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/80 text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm bg-white/10 transform transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Ver Experiencias
                  <Calendar className="w-5 h-5" />
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Experiences Section */}
      <section id="experiencias" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        
        <Container>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Waves className="w-4 h-4" />
              Experiencias Destacadas
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Explora nuestras experiencias
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                destacadas
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre actividades únicas diseñadas para todos los niveles de experiencia
            </p>
          </div>

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className={`group flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="lg:w-1/2 relative">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700 transform group-hover:scale-105">
                    <img
                      src={exp.image}
                      alt={exp.alt}
                      className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating badge */}
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {exp.level}
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200/40 to-teal-200/40 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
                </div>
                
                <div className="lg:w-1/2 space-y-8">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-6 mb-8">
                      <div className="flex items-center space-x-3 bg-gray-100/80 px-4 py-3 rounded-xl backdrop-blur-sm border border-gray-200/50 hover:bg-gray-200/80 transition-colors duration-300">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-700">{exp.level}</span>
                      </div>
                      <div className="flex items-center space-x-3 bg-gray-100/80 px-4 py-3 rounded-xl backdrop-blur-sm border border-gray-200/50 hover:bg-gray-200/80 transition-colors duration-300">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-teal-600" />
                        </div>
                        <span className="font-medium text-gray-700">{exp.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/auth/register" className="transform transition-all duration-300 hover:scale-105">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transform transition-all duration-300 hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-600"
                    >
                      <span className="flex items-center gap-2">
                        Reservar Ahora
                        <Calendar className="w-5 h-5" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-teal-100/80 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Award className="w-4 h-4" />
              ¿Por qué nosotros?
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              ¿Por qué elegir
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                AquaManta?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Nos especializamos en crear momentos inolvidables en el agua. Actividades personalizadas, 
              guías expertos, seguridad garantizada y un entorno natural incomparable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hover className="text-center group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardBody className="p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">
                    Instructores Certificados
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Nuestro equipo cuenta con certificaciones internacionales y años de experiencia.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card hover className="text-center group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardBody className="p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Users className="w-10 h-10 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-teal-600 transition-colors duration-300">
                    Grupos Pequeños
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Mantenemos grupos reducidos para garantizar atención personalizada y seguridad.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card hover className="text-center group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
              <CardBody className="p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Waves className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-green-600 transition-colors duration-300">
                    Equipo Premium
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Utilizamos equipos de última generación, mantenidos y renovados constantemente.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-24 bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-teal-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-100/80 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4" />
              Testimonios
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Lo que dicen nuestros
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                clientes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experiencias reales de personas que han vivido la aventura AquaManta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                hover 
                className="group transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl"
              >
                <CardBody className="p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500 font-medium">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300" 
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 text-6xl text-blue-200/50 font-serif leading-none">"</div>
                      <p className="text-gray-600 italic leading-relaxed text-lg relative z-10">
                        {testimonial.comment}
                      </p>
                      <div className="absolute -bottom-4 -right-2 text-6xl text-blue-200/50 font-serif leading-none rotate-180">"</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
                <Waves className="w-4 h-4" />
                ¡Tu aventura te espera!
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 leading-tight">
                ¿Listo para tu próxima
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                  aventura?
                </span>
              </h2>
              
              <div className="w-32 h-1 bg-gradient-to-r from-teal-300 to-cyan-300 mx-auto rounded-full mb-8"></div>
            </div>
            
            <p className="text-xl lg:text-2xl mb-12 text-blue-50 leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
              Únete a miles de aventureros que han descubierto la magia del océano con nosotros.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/auth/register" className="transform transition-all duration-300 hover:scale-105">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl shadow-blue-900/25 hover:shadow-3xl hover:shadow-blue-900/40 border border-white/30 px-8 py-4"
                >
                  <span className="flex items-center gap-3 text-lg font-semibold">
                    Reservar Mi Experiencia
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  </span>
                </Button>
              </Link>
              
              <div className="flex items-center gap-4 text-blue-100">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-teal-500 rounded-full border-2 border-white"></div>
                  <div className="w-10 h-10 bg-cyan-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm font-medium">+2,500 aventureros</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">AquaManta</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg max-w-md">
                Creando experiencias acuáticas inolvidables desde 2020. 
                Tu aventura en el océano comienza aquí.
              </p>
              
              {/* Social proof */}
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>2,500+ clientes felices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 calificación</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-lg text-white">Enlaces</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#experiencias" className="hover:text-teal-300 transition-colors duration-300 flex items-center gap-2 group">
                    <span>Experiencias</span>
                    <Waves className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
                <li>
                  <a href="#testimonios" className="hover:text-teal-300 transition-colors duration-300 flex items-center gap-2 group">
                    <span>Testimonios</span>
                    <Star className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
                <li>
                  <Link to="/auth/login" className="hover:text-teal-300 transition-colors duration-300 flex items-center gap-2 group">
                    <span>Iniciar Sesión</span>
                    <Users className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="hover:text-teal-300 transition-colors duration-300 flex items-center gap-2 group">
                    <span>Registrarse</span>
                    <Calendar className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-lg text-white">Contacto</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3 hover:text-teal-300 transition-colors duration-300">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs">✉</span>
                  </div>
                  <span>info@aquamanta.com</span>
                </li>
                <li className="flex items-center gap-3 hover:text-teal-300 transition-colors duration-300">
                  <div className="w-8 h-8 bg-teal-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs">📞</span>
                  </div>
                  <span>+52 998 123 4567</span>
                </li>
                <li className="flex items-center gap-3 hover:text-teal-300 transition-colors duration-300">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs">📍</span>
                  </div>
                  <span>Cancún, Quintana Roo</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700/50 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left">
                © 2024 AquaManta. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-teal-300 transition-colors duration-300">Privacidad</a>
                <a href="#" className="hover:text-teal-300 transition-colors duration-300">Términos</a>
                <a href="#" className="hover:text-teal-300 transition-colors duration-300">Cookies</a>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}