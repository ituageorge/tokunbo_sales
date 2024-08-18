import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function AddToCartButton({
  hasSizesOrExtras, onClick, basePrice,
}) {
  const { status } = useSession(); // Get the user's authentication status
  const isAuthenticated = status === "authenticated"; // Determine if the user is authenticated

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.success("items added to my cart.");
      onClick();
    } else {
    // toast.success("Added to cart")
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick} // Handle click to show toast if not authenticated
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      {hasSizesOrExtras ? (
        <span>Add to cart (from ${basePrice})</span>
      ) : (
        <span>Add to cart ${basePrice}</span>
      )}
    </button>
  );
}
