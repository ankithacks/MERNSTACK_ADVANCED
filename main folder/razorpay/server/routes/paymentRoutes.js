import express from 'express'
import { checkout,paymentVerification } from '../controllers/paymentController.js';

const router=express.Router();

// api wuld be http://localhost:4000/api/checkout
router.route("/checkout").post(checkout)

router.route("/paymentVerification").post(paymentVerification)

export default router;