import React from "react";
import { withdrawFunds } from "@/app/web3Functions/loanContract";

interface WithdrawOptionProps {
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

const WithdrawOption: React.FC<WithdrawOptionProps> = ({
  accountBalance,
  setAccountBalance,
}) => {
  const handleWithdraw = async () => {
    try {
      await withdrawFunds();
      setAccountBalance(0); // o consulta de nuevo el saldo
    } catch (err) {
      console.error("Error al retirar:", err);
    }
  };

  return (
    <button onClick={handleWithdraw}>Retirar</button>
  );
};

export default WithdrawOption;
