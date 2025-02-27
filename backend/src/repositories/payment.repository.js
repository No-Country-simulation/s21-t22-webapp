import Payment from "../models/payment.model.js";

export const createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  return await payment.save();
};
