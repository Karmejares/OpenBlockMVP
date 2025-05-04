import React, { useState } from "react";
import { depositFunds } from "@/app/web3Functions/loanContract";

interface WalletOptionsProps {
  profileType: string;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

const WalletOptions: React.FC<WalletOptionsProps> = ({
  profileType,
  accountBalance,
  setAccountBalance,
}) => {
  const [amount, setAmount] = useState<number>(0);

  const handleDeposit = async () => {
    try {
      await depositFunds(amount);
      setAccountBalance(accountBalance + amount);
    } catch (err) {
      console.error("Error al depositar:", err);
    }
  };

  return (
    <>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Monto a depositar"
      />
      <button onClick={handleDeposit}>Depositar</button>
    </>
  );
};

export default WalletOptions;
