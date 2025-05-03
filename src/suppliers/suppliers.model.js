import { Schema, model } from 'mongoose';

const supplierSchema = Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  productsSupplied: {
    type: [String],
    default: []
  },
  client: {
    type: Boolean,
    default: false
=======
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
    
>>>>>>> jcipriano-2020359
  },
  status: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  versionKey: false
});

export default model('Supplier', supplierSchema);