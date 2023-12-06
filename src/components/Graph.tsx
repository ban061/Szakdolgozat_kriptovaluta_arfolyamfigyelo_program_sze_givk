import useDataStore from "../stores/useDataStore";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

import { Line } from "react-chartjs-2";
import useCryptoHistory from "../hooks/useCryptoData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Árfolyamváltozás grafikon",
    },
  },
};

const Months: any = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export default function Graph() {
  const asset = useDataStore((state) => state.asset);
  const { history } = useCryptoHistory(asset);

  const labels = history.map((item: CryptoAssetType) => {
    let date = new Date(item.date);
    return `${Months[date.getMonth()]} ${date.getDate()}`;
  });

  const dataGraph = {
    labels: labels,
    datasets: [
      {
        label: asset || "No asset selected",
        data: history.map((item: CryptoAssetType) => {
          return item.priceUsd;
        }),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div
      style={{
        width: "80%",
        height: "700px",
        position: "relative",
        padding: 50,
        boxSizing: "border-box",
        backgroundColor: "rgba(0,0,0,0.3)",
        margin: 10,
        borderRadius: 10,
      }}
    >
      <Line options={options} data={dataGraph} />
    </div>
  );
}
