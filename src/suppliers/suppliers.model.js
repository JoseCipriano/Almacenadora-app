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
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
    
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