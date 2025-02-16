import React from 'react'; // Add this import if using JSX

export const ETHIOPIAN_CROPS = [
  { value: 'vegetables', label: 'አትክልቶች (Vegetables)' },
  { value: 'teff', label: 'ጤፍ (Teff)' },
  { value: 'coffee', label: 'ቡና (Coffee)' },
  { value: 'sesame', label: 'ሰሊጥ (Sesame)' },
  { value: 'maize', label: 'በቆሎ (Maize)' },
  { value: 'chickpea', label: 'ሻምብላ (Chickpea)' },
  { value: 'honey', label: 'ማር (Honey)' },
];

export const CropList = () => {
  return (
    <div>
      {ETHIOPIAN_CROPS.map((category) => (
        <p key={category.value}>{category.label}</p>
      ))}
    </div>
  );
};