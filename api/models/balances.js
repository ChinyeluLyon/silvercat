const mongoose = require("mongoose");
const { Schema } = mongoose;

const balanceSchema = new Schema(
  {
    userId: { type: String, required: true },
    balance: number,
  },
  { timestamps: true }
);

const Balance = mongoose.model("Balance", balanceSchema);

module.exports = Balance;
