import { cryptoIcons } from "../helpers/cryptoIcons";
import useDataStore from "../stores/useDataStore";
import { shallow } from "zustand/shallow";
export default function CryptoCard({ selectedAsset }: { selectedAsset: CryptoListType }) {
  const [asset, setAsset] = useDataStore((state) => [state.asset, state.setAsset], shallow);

  const Icon = cryptoIcons[selectedAsset.symbol];

  return (
    //
    <div
      className={`crypto-card-container ${selectedAsset.id === asset ? "active" : ""}`}
      onClick={() => {
        if (selectedAsset.id === asset) {
          setAsset(null);
        } else {
          setAsset(selectedAsset.id);
        }
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {Icon && <Icon />}
        <h3>{selectedAsset.name}</h3>
      </div>
      <h3>{Number(selectedAsset.priceUsd).toFixed(2)}$</h3>
    </div>
  );
}
