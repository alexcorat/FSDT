import React, { useState } from "react";
import TronWeb from "tronweb";
import "./App.css";

// TronWeb configuration for Nile Test Network
const tronWeb = new TronWeb({
  fullHost: "https://api.nile.trongrid.io",
  privateKey: "d6012f4258d163dcd92199d065b1aa467b2bc96848867cc6e1009da21d980eff", // Replace with your wallet's private key
});

function App() {
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
  });
  const [transactionHash, setTransactionHash] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendUSDT = async (e) => {
    e.preventDefault();
    const { receiver, amount } = formData;

    if (!receiver || !amount) {
      alert("لطفاً همه فیلدها را پر کنید!");
      return;
    }

    try {
      // USDT contract address on Nile Test Network
      const usdtContract = "TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf";

      // Interact with the USDT contract
      const contract = await tronWeb.contract().at(usdtContract);
      const transaction = await contract
        .transfer(receiver, tronWeb.toSun(amount))
        .send();

      setTransactionHash(transaction);
      alert("تراکنش با موفقیت ارسال شد!");
    } catch (error) {
      console.error("خطا در ارسال تراکنش:", error);
      alert("ارسال تراکنش با خطا مواجه شد.");
    }
  };

  return (
    <div className="App">
      <h1>انتقال USDT در شبکه نیل</h1>
      <form onSubmit={sendUSDT}>
        <div>
          <label>آدرس دریافت‌کننده:</label>
          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={handleInputChange}
            placeholder="آدرس مقصد را وارد کنید"
          />
        </div>
        <div>
          <label>مقدار (USDT):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="مقدار انتقال را وارد کنید"
          />
        </div>
        <button type="submit">ارسال تتر</button>
      </form>
      {transactionHash && (
        <div>
          <h3>هش تراکنش:</h3>
          <p>{transactionHash}</p>
        </div>
      )}
    </div>
  );
}

export default App;
