import CryptoCard from "./CryptoCard";
import useCryptoList from "../hooks/useCryptoList";
import { useState } from "react";

export default function StockList() {
  const { cryptoList } = useCryptoList();
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div>
      <h1 className="list-title">Kriptovaluták</h1>
      <div className="list-container">
        {cryptoList.map((asset, index: number) => {
          if (asset.name.toLowerCase().includes(searchValue.toLowerCase()) || asset.symbol.toLowerCase().includes(searchValue.toLowerCase())) {
            return <CryptoCard selectedAsset={asset} key={index} />;
          }
        })}
      </div>
      <div className="search">
        <input onChange={(e) => setSearchValue(e.target.value)} placeholder="keresés" />
      </div>
    </div>
  );
}
