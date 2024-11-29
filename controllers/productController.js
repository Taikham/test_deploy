import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body; //de-stucture ข้อมูลใน 

    const image1 = req.files.image1 && req.files.image1[0]; // คุม logic การจัดเก็บรูปไปที่ cloundinary ยังไง
    const image2 = req.files.image2 && req.files.image2[0]; // เข้าไปที่ file ดุว่ามีรุปอยู่เปล่า ถ้ามีก็ให้ไปหยิบ image ใน index 0 มา
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(  //รับรูปเข้ามา ซึ่งรูปจะต้องไม่เป็น undefined(ไม่มีรูป) ถ้า undefined จะถูก filter ออกไป
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { //ส่งข้อมูลไปที่ cloundinary
          resource_type: "image", // บอกว่าของสิ่งนี้คืออะไีร (image)
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData); //ข้อมูล product มาใส่ไว้ที่ productModel และ mongoose ติดต่อ MongoDB
    await product.save(); // และ save เข้าไปที่ MongoDB

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };