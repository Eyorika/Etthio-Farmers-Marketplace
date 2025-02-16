import EmailSignupForm from '../features/auth/EmailSignupForm';

const SignupPage = () => {
    
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <EmailSignupForm />

      </div>
    </div>
  );
  
};

export default SignupPage;