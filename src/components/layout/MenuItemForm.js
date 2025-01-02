import EditableImage from "../../components/layout/EditableImage";
import MenuItemPriceProps from "../../components/layout/MenuItemPriceProps";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MenuItemForm({ onSubmit, menuItem, setSelectedFile }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
  // const [link, setLink] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(categories => {
        setCategories(categories);
        if (!menuItem?.category && categories.length > 0) {
          setCategory(categories[0]._id); // Set the default category if none is set
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      });
  }, [menuItem]);

  return (
    <form
      onSubmit={async (ev) => {
        ev.preventDefault();
        try {
          await onSubmit(ev, {
            image,
            name,
            description,
            basePrice,
            sizes,
            extraIngredientPrices,
            category,
          });
          toast.success('Menu item saved successfully!');
        } catch (error) {
          console.error('Error saving menu item:', error);
          toast.error('Failed to save menu item');
        }
      }}
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} setSelectedFile={setSelectedFile} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Base price</label>
          <input
            type="number"
            value={basePrice}
            onChange={ev => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps name={'Sizes'}
                              addLabel={'Add item size'}
                              props={sizes}
                              setProps={setSizes} />
          <MenuItemPriceProps name={'Extra ingredients'}
                              addLabel={'Add ingredients prices'}
                              props={extraIngredientPrices}
                              setProps={setExtraIngredientPrices}/>
            {/* <div className="my-5"> */}
          <button className="py-2" type="submit">Save</button>
          {/* </div> */}
        </div>
      </div>
    </form>
  );
}
