import userModel from "../models/userModel.js";

// add products to user cart
const addToCart = async (req, res) => {  //ใช้ async/await เพื่อติดต่อกับ database 
  try { //ใช้ try / catch 
    const { userId, itemId, size } = req.body; //ขอข้อมูล userId, idสินค้า, ตัวเลือกสินค้า

    const userData = await userModel.findById(userId); //ดึงข้อมูล user
    let cartData = await userData.cartData; //ดึงข้อมูลสินค้าในตะกร้า ที่ตรงกับ userId แล้วเก็บไว้ที่ cartData

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else { //แต่ถ้า
        cartData[itemId][size] = 1;
      }
    } else { //แต่ถ้าไม่มีของอยู่เลย
      cartData[itemId] = {}; //ให้เป็น emthy opject
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData }); //ติดต่อ mongoDB เพื่อไปหา doc ที่มี userId แล้ว update ข้อมูลใน cartData

    res.json({ success: true, message: "Added To Cart" }); // ถ้าสำเร็จ ให้้แสดงข้อความนี้
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body; //ขอข้อมูล

    const userData = await userModel.findById(userId);// ติดต่อ mongoDB หา userId ที่ตรงกัน และเก็บไว้ที่ userData
    let cartData = await userData.cartData; //ดึงข้อมูล userData ไปหา cartData เพื่อดูข้อมูลในตะกร้า เตรียมนำไปใช้

    cartData[itemId][size] = quantity; //เพิ่ม / ลด สินค้าในตะกร้า

    await userModel.findByIdAndUpdate(userId, { cartData }); // ติดต่อฐานข้อมูลเพื่อ update จัดเก็บข้อมูลใน cartData ใหม่
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// get user cart data ติดต่อเอาข้อมูลออกมาจากฐานข้อมูล
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body; // ขอข้อมมูล userId เพื่อเตรียมใช้งาน

    const userData = await userModel.findById(userId); // ติดต่อ mongpDb 
    let cartData = await userData.cartData; //นำมาเก็บไว้ที่ cartData        

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };