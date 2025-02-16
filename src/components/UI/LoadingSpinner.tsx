const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      <span>በመጫን ላይ...</span>
    </div>
  );
};

export default LoadingSpinner;