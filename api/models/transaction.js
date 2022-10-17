const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    recipientId: { type: String, required: false },
    senderId: { type: String, required: false },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
