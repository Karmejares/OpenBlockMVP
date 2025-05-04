import React, { useState } from "react";
import { repayLoan } from "@/app/web3Functions/loanContract";

interface Props {
  loanId: number;
  amount: number;
  onSettleAccount: () => void;
}

const SettleAccount: React.FC<Props> = ({ loanId, amount, onSettleAccount }) => {
  const [loading, setLoading] = useState(false);

  const handleSettle = async () => {
    try {
      setLoading(true);
      await repayLoan(loanId, amount);
      onSettleAccount();
    } catch (err) {
      console.error("Error al pagar préstamo:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={handleSettle}>
      {loading ? "Pagando..." : "Pagar"}
    </button>
  );
};

export default SettleAccount;
