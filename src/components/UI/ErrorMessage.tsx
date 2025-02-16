// src/components/ui/ErrorMessage.tsx
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex items-center gap-2 p-3 text-sm text-error bg-error/10 rounded-lg">
      <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

// Add default export
export default ErrorMessage;