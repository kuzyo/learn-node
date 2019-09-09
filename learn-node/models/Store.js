const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a store name."
  },
  description: {
    type: String,
    trim: true
  },
  slug: String,
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: "point"
    },
    coordinates: [
      {
        type: Number,
        required: "You must supply coordinates"
      }
    ],
    address: {
      type: String,
      require: "You must supply an address"
    }
  },
  photo: String
});

storeSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    return next();
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model("Store", storeSchema);
