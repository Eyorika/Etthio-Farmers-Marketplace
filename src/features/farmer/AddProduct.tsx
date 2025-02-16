import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../stores/authStore";
import { ETHIOPIAN_CROPS } from "../../data/ethiopianCrops";
import { getFarmerId } from "../../lib/farmerUtils";

  const AddProduct = () => {
  const { user } = useAuthStore(); // Get logged-in user
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Initialize navigation



  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prevState) =>
      prevState.includes(category)
        ? prevState.filter((item) => item !== category)
        : [...prevState, category]
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
  
    const file = event.target.files[0];
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('እባክዎ JPEG, PNG ወይም WEBP ፋይል ይምረጡ');
      return;
    }
  
    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setError('የምስል ፋይሉ 5MB ከሚበልጥ አይሁን');
      return;
    }
  
    setImage(file);
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Check farmer profile exists
      const farmerId = await getFarmerId(user.id);
    } catch (error) {
      if (error instanceof Error && error.message === 'Farmer profile not found') {
        setError('እባክዎ መጀመሪያ የገበሬ መገለጫ ይፍጠሩ');
        navigate('/create-farmer');
        return;
      }
      throw error;
    }
    const priceValue = Number(productPrice);
    if (isNaN(priceValue)) {
      setError("የተሳሳተ ዋጋ ተጠቅሷል");
      return;
    }
  
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !selectedCategories.length ||
      !image
    ) {
      setError("ተሞልቶ ያላለቀ መረጃ አለ");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;
  
      const { error: uploadError } = await supabase.storage
        .from("products_images")
        .upload(filePath, image);
  
      if (uploadError) throw uploadError;
  
      const { data: urlData } = supabase.storage
        .from("products_images")
        .getPublicUrl(filePath);
  
      const { error } = await supabase.from("products").insert([
        {
          name: productName,
          description: productDescription,
          price: Number(productPrice),
          quantity: 1,
          category: selectedCategories.join(", "),
          image_url: urlData.publicUrl,
          farmer_id: await getFarmerId(user.id),        
        },
      ]);
  
      
      if (error) throw error;

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setSelectedCategories([]);
    setImage(null);

    // ✅ Show success message
    alert("ምርት ተመዝግቧል");

    // ✅ Redirect to the product list page
    navigate("/products");  
  } catch (error) {
    console.error("Error adding product:", error);
    let errorMessage = "ምርት ማስገባት አልተቻለም። እባክዎ ደግመው ይሞክሩ።";
    
    if (error instanceof Error) {
      if (error.message.includes("description")) {
        errorMessage = "የምርት መግለጫ ሜዳ አልተገኘም። እባክዎ ድጋሜ ይሞክሩ";
      }
    }
    
    setError(errorMessage);
  }
  
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-header text-center">
        የምርት መጠቀሚያ ፎርም
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-lg font-medium text-gray-700"
          >
            ስም
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="ምርት ስም"
            className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label
            htmlFor="productDescription"
            className="block text-lg font-medium text-gray-700"
          >
            መግለጫ
          </label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="ምርት መግለጫ"
            rows={4}
            className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Product Price */}
        <div>
          <label
            htmlFor="productPrice"
            className="block text-lg font-medium text-gray-700"
          >
            ዋጋ
          </label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="ዋጋ"
            className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Product Categories */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            የምርት ዓይነቶች
          </label>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {ETHIOPIAN_CROPS.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryToggle(category.value)}
                className={`px-4 py-3 rounded-lg border-2 text-left transition-all ${
                  selectedCategories.includes(category.value)
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 hover:border-primary"
                }`}
              >
                <h4 className="font-medium">{category.label}</h4>
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-lg font-medium text-gray-700"
          >
            ምርት ምስል
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
        <button
  type="submit"
  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
  disabled={isSubmitting}
>
  {isSubmitting ? (
    <span className="flex items-center">
      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        {/* Loading spinner SVG */}
      </svg>
      እየተላከ ነው...
    </span>
  ) : (
    "ምርት አስገባ"
  )}
  
</button>

        </div>
      </form>
    </div>
  );
};

export default AddProduct;
