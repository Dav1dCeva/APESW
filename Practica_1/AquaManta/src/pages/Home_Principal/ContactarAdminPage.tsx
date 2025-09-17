import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Waves, Mail, Phone, MapPin, Send, CheckCircle, Star, Users, Calendar } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/UI/card';
import { Container } from '../../components/UI/Layout';
import { Input } from '../../components/UI/Input';
import { Textarea } from '../../components/UI/textarea';
import { Label } from '../../components/UI/label';
import { useToast } from '../../hooks/use-toast';

export function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingrese un correo válido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast({
        title: "Mensaje enviado exitosamente",
        description: "Te responderemos en un plazo máximo de 24 horas.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error al enviar mensaje",
        description: "Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Same as HomePage */}
      <header className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">AquaManta</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/#experiencias" className="text-muted-foreground hover:text-foreground transition-colors">
                Experiencias
              </Link>
              <Link to="/#testimonios" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonios
              </Link>
              <Link to="/contact" className="text-foreground font-medium">
                Contacto
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/auth/login">
                  <Button variant="ghost">Iniciar Sesión</Button>
                </Link>
                <Link to="/auth/register">
                  <Button>Registrarse</Button>
                </Link>
              </div>
            </nav>

            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-border py-4 space-y-4">
              <Link to="/#experiencias" className="block px-4 py-2 text-muted-foreground hover:bg-accent">
                Experiencias
              </Link>
              <Link to="/#testimonios" className="block px-4 py-2 text-muted-foreground hover:bg-accent">
                Testimonios
              </Link>
              <Link to="/contact" className="block px-4 py-2 text-foreground font-medium">
                Contacto
              </Link>
              <div className="px-4 space-y-2">
                <Link to="/auth/login" className="block">
                  <Button variant="ghost" className="w-full">Iniciar Sesión</Button>
                </Link>
                <Link to="/auth/register" className="block">
                  <Button className="w-full">Registrarse</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20 lg:py-32 overflow-hidden">
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20">
                <Mail className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              ¡Contáctanos!
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed font-light">
              ¿Tienes alguna pregunta sobre nuestras experiencias acuáticas? Estamos aquí para ayudarte.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 inline-block">
              <div className="text-lg text-blue-100 space-y-2">
                <p className="flex items-center justify-center gap-2">
                  <span className="text-2xl">📧</span>
                  <span className="font-medium">Tiempo de respuesta: máximo 24 horas</span>
                </p>
                <p className="text-blue-200">Solo solicita la información necesaria para brindarte la mejor atención</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Efectos de fondo sutil */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <CardHeader className="pb-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                      Formulario de Contacto
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  {isSubmitted && (
                    <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl flex items-center space-x-4 shadow-lg">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-green-800 font-semibold text-lg">¡Mensaje enviado correctamente!</p>
                        <p className="text-green-700">Te responderemos pronto.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Nombre completo *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`h-12 px-4 border-2 rounded-xl transition-all duration-300 focus:border-blue-500 focus:shadow-lg ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-blue-300'}`}
                        placeholder="Ingresa tu nombre completo"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        required
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        Correo electrónico *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`h-12 px-4 border-2 rounded-xl transition-all duration-300 focus:border-teal-500 focus:shadow-lg ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-teal-300'}`}
                        placeholder="tu@email.com"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        required
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="subject" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Asunto *
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className={`h-12 px-4 border-2 rounded-xl transition-all duration-300 focus:border-purple-500 focus:shadow-lg ${errors.subject ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-purple-300'}`}
                        placeholder="¿Sobre qué quieres consultar?"
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        required
                      />
                      {errors.subject && (
                        <p id="subject-error" className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        Mensaje *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`min-h-[140px] p-4 border-2 rounded-xl transition-all duration-300 focus:border-indigo-500 focus:shadow-lg resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-indigo-300'}`}
                        placeholder="Describe tu consulta con el mayor detalle posible..."
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        required
                      />
                      {errors.message && (
                        <p id="message-error" className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 h-14 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-3" />
                            Enviar Mensaje
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="flex-1 h-14 border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                      >
                        Cancelar
                      </Button>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-xl border border-blue-200">
                      <p className="text-xs text-gray-600 text-center leading-relaxed">
                        * Campos obligatorios. Al enviar este formulario aceptas que procesemos tu información 
                        para responder a tu consulta.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl mb-6 shadow-xl">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Otras formas de contacto
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  También puedes contactarnos directamente a través de los siguientes medios. 
                  Nuestro equipo está disponible para resolver todas tus dudas sobre nuestras 
                  experiencias acuáticas.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm group">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-3 text-xl">Correo Electrónico</h3>
                        <p className="text-muted-foreground mb-2 font-semibold text-lg">info@aquamanta.com</p>
                        <p className="text-sm text-muted-foreground bg-blue-50 px-3 py-1 rounded-full inline-block">
                          Respuesta en máximo 24 horas
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm group">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-3 text-xl">Teléfono</h3>
                        <p className="text-muted-foreground mb-2 font-semibold text-lg">+593 96 272 0681</p>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground bg-teal-50 px-3 py-1 rounded-full inline-block">
                            Lunes a Viernes: 9:00 AM - 6:00 PM
                          </p>
                          <br />
                          <p className="text-sm text-muted-foreground bg-teal-50 px-3 py-1 rounded-full inline-block">
                            Sábados: 9:00 AM - 2:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm group">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-3 text-xl">Ubicación</h3>
                        <p className="text-muted-foreground mb-2 font-semibold">
                          Marina AquaManta<br />
                          Manta, Playa Murcielago Km 9.5<br />
                          Zona Hotelera, Manta
                        </p>
                        <p className="text-sm text-muted-foreground bg-green-50 px-3 py-1 rounded-full inline-block">
                          Visita nuestra marina para información presencial
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
                      <Phone className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <h3 className="font-bold text-foreground mb-4 text-xl">¿Necesitas ayuda inmediata?</h3>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      Para emergencias o consultas urgentes sobre reservas del mismo día, 
                      contáctanos por teléfono directamente.
                    </p>
                    <Link to="tel:+593962720681" className="block">
                      <Button 
                        variant="outline" 
                        className="w-full h-14 bg-white hover:bg-blue-50 border-2 border-blue-300 hover:border-blue-400 text-blue-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <Phone className="w-5 h-5 mr-3" />
                        Llamar Ahora
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Fondo con efectos */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl mb-6 shadow-xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Encuentra respuestas rápidas a las consultas más comunes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-4 text-lg">¿Cómo puedo hacer una reserva?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Puedes reservar directamente en nuestra página web, por teléfono o visitando nuestra marina. 
                      Te recomendamos reservar con al menos 24 horas de anticipación.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-4 text-lg">¿Qué incluyen las experiencias?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Todas nuestras experiencias incluyen equipo profesional, instructor certificado, 
                      seguro y briefing de seguridad. Consulta cada experiencia para detalles específicos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-4 text-lg">¿Cuál es la política de cancelación?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Cancelaciones con 24 horas de anticipación: reembolso completo. Cancelaciones el mismo día 
                      por condiciones climáticas: se reagenda sin costo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-4 text-lg">¿Necesito experiencia previa?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      ¡No! Ofrecemos experiencias para todos los niveles. Nuestros instructores certificados 
                      te guiarán paso a paso para que vivas una experiencia segura y memorable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
                  <Link to="/#experiencias" className="hover:text-teal-300 transition-colors duration-300 flex items-center gap-2 group">
                    <span>Experiencias</span>
                    <Waves className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
                <li>
                  <Link to="/#testimonios" className="hover:text-teal-300 transition-colors duration-300 flex items-center gap-2 group">
                    <span>Testimonios</span>
                    <Star className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
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
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>info@aquamanta.com</span>
                </li>
                <li className="flex items-center gap-3 hover:text-teal-300 transition-colors duration-300">
                  <div className="w-8 h-8 bg-teal-600/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+593 96 272 0681</span>
                </li>
                <li className="flex items-center gap-3 hover:text-teal-300 transition-colors duration-300">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Manta, Playa Murcielago Km 9.5</span>
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