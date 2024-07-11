// import { Alert, Input } from "@nextui-org/react";

{/* <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input type="email" id="email" name="email" className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Enter your email" required />
          </div>
          <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Send Reset Link</button>
        */}

const InputField = ({onClick, newBalance, deleteHistory, label, value, onChange, disabled, alertMessage, className, type}) => {
  return (
    <div className={`${className} my-5 ${newBalance ? 'text-white-500' : 'text-black-500'} ${deleteHistory ? 'hidden' : 'block'} `}>
      <label className="block text-gray-700 font-bold mb-1">{label}</label>
      <input
      onClick={onClick}
        type={type}
        // name={label.toLowerCase()}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${disabled ? 'bg-gray-200' : 'bg-white'} focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"`}
      />
      {alertMessage && (
        <p className="text-red-500 text-xs italic mt-1">{alertMessage}</p>
      )}
    </div>
  );
};

// function InputField () {
//   const [amountPaid, setAmountPaid] = useState(0);

//   return (
//     <div>
//       <InputField
//         label="Amount Paid"
//         value={amountPaid}
//         onChange={(e) => setAmountPaid(e.target.value)}
//         disabled={false}
//         alertMessage={
//           amountPaid > 0
//             ? "This will reduce your debt. Make sure you have enough balance."
//             : ""
//         }
//         className="w-full"
//       />
//     </div>
//   );
// }

export default InputField
