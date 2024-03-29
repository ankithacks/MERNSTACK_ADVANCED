import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
export const checkout=async (req,res)=>{
    const options={
        // amount: 50000,
        amount: Number(req.body.amount*100),
        currency: 'INR'
    };
    const order= await instance.orders.create(options)

    console.log(order)
    res.status(200).json({
        success: true,
        order
    })
};

// the o/p of above code comes out as:- http://localhost:4000/api/checkout in POST option
// {
//   id: 'order_NVFmBZdBmxFEkj',
//   entity: 'order',
//   amount: 50000,
//   amount_paid: 0,
//   amount_due: 50000,
//   currency: 'INR',
//   receipt: null,
//   offer_id: null,
//   status: 'created',
//   attempts: 0,
//   notes: [],
//   created_at: 1706711495
// }


export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      // Database comes here
  
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  };