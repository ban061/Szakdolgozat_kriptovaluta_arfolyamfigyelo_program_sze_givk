import Graph from "../components/Graph";
import Predict from "../components/Predict";
import StockList from "../components/StockList";

export default function HomeScreen() {
  return (
    <>
      <StockList />
      <Graph />
      <Predict />
    </>
  );
}
