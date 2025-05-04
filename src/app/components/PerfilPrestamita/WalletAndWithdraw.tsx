import React from "react";
import Box from "@mui/material/Box";
import WalletOptions from "./WalletOptions";
import WithdrawOption from "./WithdrawOption";

interface WalletAndWithdrawProps {
  profileType: string;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

const WalletAndWithdraw: React.FC<WalletAndWithdrawProps> = ({
  profileType,
  accountBalance,
  setAccountBalance,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 3,
        padding: 3,
        flexWrap: "wrap", // Ensures responsiveness for smaller screens
      }}
    >
      <WalletOptions
        profileType={profileType}
        accountBalance={accountBalance}
        setAccountBalance={setAccountBalance}
      />
      <WithdrawOption
        accountBalance={accountBalance}
        setAccountBalance={setAccountBalance}
      />
    </Box>
  );
};

export default WalletAndWithdraw;
