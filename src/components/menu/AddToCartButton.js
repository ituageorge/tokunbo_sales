
export default function AddToCartButton({
  hasSizesOrExtras, onClick, basePrice, 
}) {
  if (!hasSizesOrExtras) {
    return (
      // <div className="flying-button-parent mt-4">
      <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
            Add to cart ${basePrice}
          </button>
      // </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (from ${basePrice})</span>
    </button>
  );
}