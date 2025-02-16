import { useProfileStore } from '../../../stores/profileStore';
import { ETHIOPIAN_REGIONS } from '../../../data/ethiopianRegions';

const FarmLocationStep = () => {
  const { farmName, location, errors, setFarmName, setLocation } = useProfileStore();

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-header mb-6">የግብርና ቦታዎን ይግለጹ</h3>

      {/* Farm Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          የግብርና ስም
        </label>
        <input
          type="text"
          value={farmName}
          onChange={(e) => setFarmName(e.target.value)}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.farmName ? 'border-error' : 'border-gray-300'
          } focus:ring-2 focus:ring-primary`}
          placeholder="እንደ እርሻ ሀብታም"
        />
        {errors.farmName && (
          <p className="text-error text-sm mt-1">{errors.farmName}</p>
        )}
      </div>

      {/* Location Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Region Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ክልል
          </label>
          <select
            value={location.region}
            onChange={(e) => setLocation({ ...location, region: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.region ? 'border-error' : 'border-gray-300'
            } focus:ring-2 focus:ring-primary`}
          >
            <option value="">ክልል ይምረጡ</option>
            {ETHIOPIAN_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-error text-sm mt-1">{errors.region}</p>
          )}
        </div>

        {/* Zone Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ዞን
          </label>
          <input
            type="text"
            value={location.zone}
            onChange={(e) => setLocation({ ...location, zone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary"
            placeholder="ዞን"
          />
        </div>

        {/* Woreda Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ወረዳ
          </label>
          <input
            type="text"
            value={location.woreda}
            onChange={(e) => setLocation({ ...location, woreda: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary"
            placeholder="ወረዳ"
          />
        </div>
      </div>
    </div>
  );
};

export default FarmLocationStep;