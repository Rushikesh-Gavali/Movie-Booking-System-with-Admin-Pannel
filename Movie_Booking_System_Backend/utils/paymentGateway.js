
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Function to create an order
exports.createOrder = async (amount, currency = 'INR') => {
    const options = {
        amount: amount * 100, // Razorpay amount should be in paisa
        currency,
        receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
        payment_capture: 1, // Auto capture
    };

    try {
        const order = await razorpay.orders.create(options);
        return { success: true, order };
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, message: 'Unable to create order' };
    }
};

// Function to verify payment signature
exports.verifyPayment = (paymentDetails) => {
    const { order_id, payment_id, signature } = paymentDetails;
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(order_id + '|' + payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === signature) {
        return { success: true };
    } else {
        return { success: false, message: 'Payment verification failed' };
    }
};
