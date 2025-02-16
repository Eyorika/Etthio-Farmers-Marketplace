const ProductReviews = ({ reviews }: { reviews: any[] }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Product Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="p-4 border-b last:border-b-0">
          <p className="font-semibold">{review.products.name}</p>
          <p>{review.comment}</p>
          <p className="text-sm text-gray-500">Rating: {review.rating}/5</p>
        </div>
      ))}
    </div>
  );
  
  export default ProductReviews; // Add this line