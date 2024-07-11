// import 'tailwindcss/tailwind.css';

export const SaveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Save
    </button>
  );
};