import { useProfileStore } from '../../../stores/profileStore';
import { CROP_CATEGORIES } from '../../../data/ethiopianRegions';
import { useEffect } from 'react';


interface Category {
  value: string;
  label: string;
}

const ProductCategoriesStep = () => {
  const { products, errors, setProducts } = useProfileStore();

  const toggleCategory = (category: string) => {
    setProducts(
      products.includes(category)
        ? products.filter(c => c !== category)
        : [...products, category]
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-header mb-6">የምርት ዓይነቶች</h3>
      
      {errors.products && (
        <p className="text-error text-sm -mt-4">{errors.products}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CROP_CATEGORIES.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => toggleCategory(category.value)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              products.includes(category.value)
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-primary'
            }`}
          >
            <h4 className="font-medium">{category.label}</h4>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoriesStep;