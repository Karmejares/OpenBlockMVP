// src/app/web3Functions/loanContract.ts

import { BrowserProvider, Contract, parseEther } from "ethers";
import abi from "../constans/abis/AseguradoraContract.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

// ✅ Crea instancia del contrato con signer
async function getContract(): Promise<Contract> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask no está disponible.");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new Contract(CONTRACT_ADDRESS, abi, signer);
}

// ✅ Solicita préstamo
export async function requestLoan(amount: number, prestamista: string, classTasa: number) {
  const contract = await getContract();
  const tx = await contract.borrow(
    parseEther(amount.toString()),
    prestamista,
    classTasa
  );
  await tx.wait();
  return tx;
}

// ✅ Paga préstamo
export async function repayLoan(loanId: number, amount: number) {
  const contract = await getContract();
  const tx = await contract.payLoan(loanId, {
    value: parseEther(amount.toString()),
  });
  await tx.wait();
  return tx;
}

// ✅ Deposita fondos
export async function depositFunds(amount: number) {
  const contract = await getContract();
  const tx = await contract.deposit({
    value: parseEther(amount.toString()),
  });
  await tx.wait();
  return tx;
}

// ✅ Retira fondos
export async function withdrawFunds() {
  const contract = await getContract();
  const tx = await contract.withdraw();
  await tx.wait();
  return tx;
}
