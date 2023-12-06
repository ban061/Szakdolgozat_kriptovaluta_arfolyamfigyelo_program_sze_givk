import { useEffect, useState } from "react";
import useCryptoHistory from "../hooks/useCryptoData";
import { calculate } from "../predict/pricepredict";
import useDataStore from "../stores/useDataStore";
import { StagnateIcon, IncreaseIcon, DecreaseIcon } from "../assets/Icons";

const ICON_SIZE = 80;
export default function Predict() {
  const asset = useDataStore((state) => state.asset);
  const { history } = useCryptoHistory(asset);

  const [prediction, setPrediction] = useState<string>("");

  useEffect(() => {
    if (history) {
      setPrediction(calculate(history));
    }
  }, [history]);

  function getIcon(prediction: string) {
    switch (prediction) {
      case "Stabil piaci kondíciók vagy oldalazó trend várható":
        return <StagnateIcon width={ICON_SIZE} height={ICON_SIZE} fill="cyan" filter="drop-shadow(3px 5px 2px rgba(0,0,0,0.5)" />;
      case "Erőteljes csökkenő trend várható":
        return <DecreaseIcon width={ICON_SIZE} height={ICON_SIZE} fill="cyan" filter="drop-shadow(3px 5px 2px rgba(0,0,0,0.5)" />;
      case "Erőteljes emelkedő trend várható":
        return <IncreaseIcon width={ICON_SIZE} height={ICON_SIZE} fill="cyan" filter="drop-shadow(3px 5px 2px rgba(0,0,0,0.5)" />;
    }
    return <></>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className="list-title">Előrejelzés</h1>
      <h3 className="predict-container">{prediction}</h3>
      {getIcon(prediction)}
    </div>
  );
}
