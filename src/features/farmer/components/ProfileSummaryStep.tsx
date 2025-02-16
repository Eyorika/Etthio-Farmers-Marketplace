import { useProfileStore } from '../../../stores/profileStore';

const ProfileSummaryStep = ({ onComplete }: { onComplete: () => void }) => {
  const { farmName, location, products } = useProfileStore();

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-header mb-6">መረጃ ማጠቃለያ</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">የግብርና ስም:</label>
          <p className="font-medium">{farmName}</p>
        </div>

        <div>
          <label className="text-sm text-gray-600">ቦታ:</label>
          <p className="font-medium">
            {location.region}, {location.zone}, {location.woreda}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-600">የምርት ዓይነቶች:</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {products.map((product) => (
              <span 
                key={product}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {product}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-dark"
      >
        መዝግብ ያጠናቅቁ
      </button>
    </div>
  );
};

export default ProfileSummaryStep;