import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object }
}, { minimize: false, timestamps: true }
);

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;