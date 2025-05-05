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
  status: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true,
  versionKey: false
});

export default model('Supplier', supplierSchema);