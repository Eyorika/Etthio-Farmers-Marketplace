const WeatherWidget = () => {
    // Implement weather API integration here
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-header">Weather Update</h3>
        <div className="flex items-center gap-4">
          <div className="text-4xl">☀️</div>
          <div>
            <p className="text-2xl font-bold">28°C</p>
            <p className="text-gray-600">Addis Ababa</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default WeatherWidget;