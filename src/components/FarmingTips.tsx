const FarmingTips = () => {
    const tips = [
      {
        title: "Crop Rotation",
        content: "Rotate your crops seasonally to maintain soil fertility and prevent pest buildup.",
        category: "Soil Management"
      },
      {
        title: "Water Conservation",
        content: "Use drip irrigation systems to optimize water usage during dry seasons.",
        category: "Irrigation"
      },
      {
        title: "Organic Fertilizers",
        content: "Apply compost and manure to improve soil structure and nutrient content.",
        category: "Fertilization"
      }
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-header">Farming Tips</h3>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="p-4 bg-background rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full p-2">
                  <span className="text-sm">🌱</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{tip.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{tip.content}</p>
                  <span className="inline-block mt-2 text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                    {tip.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FarmingTips; // Add default export