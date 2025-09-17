import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { Card } from '../../components/UI/card';
import { Layout, Container } from '../../components/UI/Layout';


export function RegisterPage() {
	const [formData, setFormData] = useState({
		nombres: '',
		apellidos: '',
		celular: '',
		email: '',
		password: '',
		confirmar: ''
	});
	const [errors, setErrors] = useState<{[key:string]: string}>({});
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const validate = () => {
		const newErrors: {[key:string]: string} = {};
		if (!formData.nombres.trim()) newErrors.nombres = 'El nombre es obligatorio.';
		if (!formData.apellidos.trim()) newErrors.apellidos = 'El apellido es obligatorio.';
		if (!formData.celular.trim()) newErrors.celular = 'El teléfono es obligatorio.';
		else if (!/^\+?\d{9,15}$/.test(formData.celular)) newErrors.celular = 'Teléfono inválido.';
		if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio.';
		else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Correo inválido.';
		if (!formData.password) newErrors.password = 'La contraseña es obligatoria.';
		else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres.';
		if (!formData.confirmar) newErrors.confirmar = 'Confirma tu contraseña.';
		else if (formData.password !== formData.confirmar) newErrors.confirmar = 'Las contraseñas no coinciden.';
		return newErrors;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
		setErrors(prev => ({ ...prev, [e.target.name]: '' }));
	};

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault();
		setMessage('');
		const validationErrors = validate();
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length === 0) {
			setMessage('¡Registro simulado exitoso!');
			setTimeout(() => navigate('/auth/login'), 2000);
		} else {
			setMessage('Corrige los errores antes de continuar.');
		}
	};

	const isError = message && !message.includes('exitoso');
	const isSuccess = message && message.includes('exitoso');

	return (
		<Layout>
			<Container size="sm" className="flex items-center justify-center min-h-screen">
				<Card className="w-full max-w-md p-8 shadow-lg">
					<h2 className="text-2xl font-bold mb-2 text-center">Crear Cuenta</h2>
					  <p className="mb-6 text-center text-gray-600">Únete a la comunidad AquaManta</p>
					<form onSubmit={handleRegister} className="space-y-5">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								type="text"
								name="nombres"
								label="Nombre"
								placeholder="Tu nombre"
								value={formData.nombres}
								onChange={handleChange}
								icon={<User size={20} />}
								error={errors.nombres}
								required
							/>
							<Input
								type="text"
								name="apellidos"
								label="Apellido"
								placeholder="Tu apellido"
								value={formData.apellidos}
								onChange={handleChange}
								icon={<User size={20} />}
								error={errors.apellidos}
								required
							/>
						</div>
						<Input
							type="tel"
							name="celular"
							label="Teléfono"
							placeholder="+593 "
							value={formData.celular}
							onChange={handleChange}
							icon={<Phone size={20} />}
							error={errors.celular}
							required
						/>
						<Input
							type="email"
							name="email"
							label="Correo electrónico"
							placeholder="@email.com"
							value={formData.email}
							onChange={handleChange}
							icon={<Mail size={20} />}
							error={errors.email}
							required
						/>
						<Input
							type="password"
							name="password"
							label="Contraseña"
							placeholder="••••••••"
							value={formData.password}
							onChange={handleChange}
							icon={<Lock size={20} />}
							error={errors.password}
							required
						/>
						<Input
							type="password"
							name="confirmar"
							label="Confirmar contraseña"
							placeholder="••••••••"
							value={formData.confirmar}
							onChange={handleChange}
							icon={<Lock size={20} />}
							error={errors.confirmar}
							required
						/>
						<Button
							type="submit"
							variant="primary"
							size="lg"
							className="w-full"
						>
							Crear Cuenta
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
						<div className="text-center text-sm text-gray-600">
							¿Ya tienes cuenta?{' '}
							<Link 
								to="/auth/login" 
								className="text-blue-600 hover:text-blue-700 font-medium"
							>
								Inicia sesión aquí
							</Link>
						</div>
					</form>
				</Card>
			</Container>
		</Layout>
	);
}
