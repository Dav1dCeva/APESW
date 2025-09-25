import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { Card } from '../../components/UI/card';
import { Layout, Container } from '../../components/UI/Layout';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key:string]: string}>({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: {[key:string]: string} = {};
    if (!email.trim()) newErrors.email = 'El correo es obligatorio.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Correo inválido.';
    if (!password) newErrors.password = 'La contraseña es obligatoria.';
    else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres.';
    return newErrors;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setMessage('¡Bienvenido! Redirigiendo...');
      setTimeout(() => navigate('/'), 1500);
    } else {
      setMessage('Corrige los errores antes de continuar.');
    }
  };

  const isError = message && !message.includes('Bienvenido');
  const isSuccess = message && message.includes('Bienvenido');

  return (
    <Layout>
      <Container size="sm" className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-2 text-center">Iniciar Sesión</h2>
          <p className="mb-6 text-center text-gray-600">Accede a tu cuenta de AquaManta</p>
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              type="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
              error={errors.email}
              required
            />
            <Input
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={20} />}
              error={errors.password}
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Iniciar Sesión
            </Button>
            {message && (
              <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                isError ? 'bg-red-50 text-red-700' : 
                isSuccess ? 'bg-green-50 text-green-700' : 
                'bg-blue-50 text-blue-700'
              }`}>
                {isError ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                <span className="text-sm">{message}</span>
              </div>
            )}
            <div className="space-y-4 text-center">
              <Link 
                to="/auth/forgot-password" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <div className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link 
                  to="/auth/register" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Regístrate aquí
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </Container>
    </Layout>
  );
}
