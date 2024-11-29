import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} } // เป็น defaul ของ mongoose ถ้าไม่เจอ object จะเป็น undefinded
}, { minimize: false }) //กัน undefinded minimize ข้อมูลที่ไม่จำเป็น เช่นข้อมูลที่ไม่มีของ

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel