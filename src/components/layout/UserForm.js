'use client';
import AddressInputs from "../../components/layout/AddressInputs";
import EditableImage from "../../components/layout/EditableImage";
import { useProfile } from "../../components/UseProfile";
import { useState } from "react";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Image Section */}
      <div className="flex justify-center md:justify-start">
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>

      {/* Form Section */}
      <form
        className="grow"
        onSubmit={ev =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
        {/* Name Input */}
        <label className="block text-sm font-medium text-gray-700">First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={ev => setUserName(ev.target.value)}
          className="w-full px-3 py-2 border rounded-lg mt-1 mb-4"
        />

        {/* Email Input */}
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          disabled={true}
          value={user?.email || ''}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-lg mt-1 mb-4 bg-gray-100"
        />

        {/* Address Inputs */}
        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />

        {/* Admin Checkbox */}
        {loggedInUserData.admin && (
          <div className="mt-4">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm text-gray-700">Admin</span>
            </label>
          </div>
        )}

        {/* Save Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg mt-6 hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
}