//Kết nối collection category
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//khai báo các field
const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: { type: Schema.ObjectId, ref: "category" },
});

module.exports =
  mongoose.models.category || mongoose.model("category", categorySchema); //kiểm tra xem có category chưa
