const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    customerName: {type: String, required: true},
    productName: {type: String, required: true},
    budget: {type: Number, required: true},
    location: {type: String, required: true},
    deliveryDate: {type: String, required: true}
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;






