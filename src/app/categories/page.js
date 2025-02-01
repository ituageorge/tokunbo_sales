'use client';
import DeleteButton from "../../components/DeleteButton";
import { useProfile } from "../../components/UseProfile";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const response = await fetch('/api/categories');
    const categories = await response.json();
    setCategories(categories);
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    try {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success(editedCategory ? 'Category updated' : 'Category created');
      } else {
        toast.error('Error, sorry...');
      }
      setCategoryName('');
      fetchCategories();
      setEditedCategory(null);
    } catch (error) {
      console.error(error);
      toast.error('Error, sorry...');
    }
  }

  async function handleDeleteClick(_id) {
    try {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Deleted');
      } else {
        toast.error('Error');
      }
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error('Error');
    }
  }

  if (profileLoading) {
    return <div className="text-center text-gray-500">Loading user info...</div>;
  }

  if (profileData && !profileData.admin) {
    return <div className="text-center text-gray-500">Not an admin</div>;
  }

  return (
    <section className="mt-8 px-4 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="grow w-full">
            <label className="block text-sm font-medium text-gray-700">
              {editedCategory ? 'Update category' : 'New category name'}
              {editedCategory && (
                <>: <b>{editedCategory.name}</b></>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 pb-2 w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              {editedCategory ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}
              className="w-full sm:w-auto bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-sm text-gray-500 mb-2">Existing categories</h2>
        {categories?.length > 0 ? (
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-center mb-2"
            >
              <div className="grow">
                {c.name}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No categories found.</div>
        )}
      </div>
    </section>
  );
}