interface AuthButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
  }
  
  const AuthButton = ({ children, disabled }: AuthButtonProps) => {
    return (
      <button
        type="submit"
        disabled={disabled}
        className={`w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors ${
          disabled ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {children}
      </button>
    );
  };
  
  export default AuthButton;