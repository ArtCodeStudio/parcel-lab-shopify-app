import { Schema } from 'mongoose';

export const ParcelLabSettingsSchema = new Schema({
  user: { type: Number, required: true },
  token: {
    type: String,
    trim: true,
    required: true,
    minlength: 30,
    // maxlength: 30,
  },
  shop_domain: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  customFields: {
    'no-notify': {
      type: Boolean,
      required: false,
      unique: false,
    },
  },
});
