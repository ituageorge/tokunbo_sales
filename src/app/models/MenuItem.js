import mongoose, {model, models, Schema} from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema({
  image: {type: String},
  name: {type: String},
  description: {type: String},
  category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        validate: {
          validator: (v) => {
            return mongoose.Types.ObjectId.isValid(v);
          },
          message: 'Invalid ObjectId for category',
        },
      },
  // category: {type: mongoose.Types.ObjectId},
  basePrice: {type: Number},
  totalPriceOfProduct: {type: Number},
  totalProductQty: {type: Number},
  sizes: {type:[ExtraPriceSchema]},
  extraIngredientPrices: {type:[ExtraPriceSchema]},
  quantity: {type: Number, default: 1},
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);

// const MenuItemSchema = new Schema({
//   image: {type: String},
//   name: {type: String},
//   description: {type: String},
//   category: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required: true,
//     validate: {
//       validator: (v) => {
//         return mongoose.Types.ObjectId.isValid(v);
//       },
//       message: 'Invalid ObjectId for category',
//     },
//   },
//   basePrice: {type: Number},
//   sizes: {type:[ExtraPriceSchema]},
//   extraIngredientPrices: [{type:ExtraPriceSchema}],
//   quantity: {type: Number, default: 1},
// }, {timestamps: true});