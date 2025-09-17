import React, { forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, icon, className = '', type, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const inputId = id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={`
              w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
              ${icon ? 'pl-10' : ''}
              ${isPassword ? 'pr-10' : ''}
              ${error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                : success
                ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
              }
              focus:outline-none focus:ring-2 focus:ring-opacity-20
              disabled:bg-gray-50 disabled:cursor-not-allowed
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {success && (
          <p className="mt-1 text-sm text-green-600">{success}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
