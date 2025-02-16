import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '../../stores/profileStore';
import FarmLocationStep from './components/FarmLocationStep';
import ProductCategoriesStep from './components/ProductCategoriesStep';
import ProfileSummaryStep from './components/ProfileSummaryStep';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';

const ProfileWizard = () => {
  const { user } = useAuthStore();
  const { step, farmName, location, products, nextStep, prevStep } = useProfileStore();
  const navigate = useNavigate();

  const handleProfileComplete = async () => {
    if (!user) return;
  
    const { error } = await supabase
      .from('farmers')
      .insert({
        farm_name: farmName,
        location,
        products,
        user_id: user.id,
        status: 'pending'
      });
  
    if (error) {
      console.error('Profile save failed:', error);
      return;
    }
  
    navigate('/dashboard');
  };

  const steps = [
    <FarmLocationStep key="location" />,
    <ProductCategoriesStep key="products" />,
    <ProfileSummaryStep key="summary" onComplete={handleProfileComplete} />
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`h-2 w-full mx-1 rounded-full ${index < step ? 'bg-primary' : 'bg-gray-200'}`}
            />
          ))}
        </div>
        <p className="text-center mt-2 text-gray-600">
          Step {step} of 3
        </p>
      </div>

      {/* Current Step Content */}
      {steps[step - 1]}

      {/* Navigation Controls */}
      <div className="mt-8 flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            ወደ ኋላ ተመለስ
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={nextStep}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark ml-auto"
          >
            ቀጣይ ደረጃ
          </button>
        ) : (
          <button
            onClick={handleProfileComplete}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 ml-auto"
          >
            Finish Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileWizard;
