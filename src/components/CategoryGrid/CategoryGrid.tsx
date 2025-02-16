interface Category {
    name: string;
    amharic: string;
    icon: string;
    color: string;
  }
  
  export default function CategoryGrid() {
    const categories: Category[] = [
      { 
        name: 'Vegetables', 
        amharic: 'አትክልቶች', 
        icon: '🥦',
        color: 'bg-success'
      },
      { 
        name: 'Grains', 
        amharic: 'እህሎች', 
        icon: '🌾',
        color: 'bg-warning'
      },
      { 
        name: 'Coffee', 
        amharic: 'ቡና', 
        icon: '☕',
        color: 'bg-accent'
      },
      { 
        name: 'Dairy', 
        amharic: 'የወተት ምርቶች', 
        icon: '🥛',
        color: 'bg-primary'
      },
      { 
        name: 'Spices', 
        amharic: 'ቅመሞች', 
        icon: '🌶️',
        color: 'bg-error'
      },
      { 
        name: 'Fruits', 
        amharic: 'ፍራፍሬዎች', 
        icon: '🍎',
        color: 'bg-cta-btn'
      },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className={`${category.color} p-6 text-center aspect-square flex flex-col items-center justify-center`}>
              <span className="text-4xl mb-4">{category.icon}</span>
              <h3 className="font-semibold text-text">{category.name}</h3>
              <p className="text-sm text-text/80">{category.amharic}</p>
            </div>
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    );
  }