// // components/DeleteButton.jsx
// import { Button } from "@nextui-org/react";

// export const DeleteButton = ({ onClick }) => {
//   return (
//     <Button color="error" onClick={onClick} ghost>
//       Delete
//     </Button>
//   );
// };

import 'tailwindcss/tailwind.css';

export const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Delete
    </button>
  );
};