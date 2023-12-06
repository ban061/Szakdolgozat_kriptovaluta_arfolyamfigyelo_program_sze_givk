import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "2538356d-8311-4d87-8225-21e2125e9244";

const ids: string[] = [
  "bitcoin",
  "ethereum",
  "litecoin",
  "tether",
  "dogecoin",
  "cardano",
  "polkadot",
  "toncoin",
  "uniswap",
  "trueusd",
  "gas",
  "solana",
  "chainlink",
];

export default function useCryptoList() {
  const [cryptoList, setCryptoList] = useState<CryptoListType[]>([]);

  async function fetchData() {
    let config: any = {
      method: "get",
      url: `https://api.coincap.io/v2/assets?ids=${String(ids)}`,
      headers: {
        Authorization: apiKey,
      },
    };
    axios(config)
      .then((response: any) => {
        setCryptoList(response.data.data);
        console.log(response.data.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { cryptoList };
}
