import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "2538356d-8311-4d87-8225-21e2125e9244";

export default function useCryptoHistory(id: string) {
  const [history, setHistory] = useState<CryptoAssetType[]>([]);

  async function fetchData(id: string) {
    let config: any = {
      method: "get",
      url: `https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
      headers: {
        Authorization: apiKey,
      },
    };
    axios(config)
      .then((response: any) => {
        setHistory(response.data.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (id !== null) {
      fetchData(id);
    } else {
      setHistory([]);
    }
  }, [id]);

  return { history };
}
