import axios from "axios";

interface CryptoData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

const fetchCryptoData = async (
  coinId: string,
  days: number = 30
): Promise<CryptoData | undefined> => {
  try {
    const response = await axios.get(
      `https://api.coincap.io/v2/assets/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days.toString(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

interface BollingerBands {
  upperBand: number;
  movingAverage: number;
  lowerBand: number;
}

const calculateMovingAverage = (data: number[], period: number): number => {
  return data.slice(-period).reduce((a, b) => a + b, 0) / period;
};

const calculateStandardDeviation = (
  data: number[],
  period: number,
  movingAverage: number
): number => {
  return Math.sqrt(
    data
      .slice(-period)
      .reduce((a, b) => a + Math.pow(b - movingAverage, 2), 0) / period
  );
};

const calculateBollingerBands = (
  prices: number[],
  period: number = 60
): BollingerBands => {
  const movingAverage = calculateMovingAverage(prices, period);
  const stdDev = calculateStandardDeviation(prices, period, movingAverage);

  return {
    upperBand: movingAverage + 2 * stdDev,
    movingAverage: movingAverage,
    lowerBand: movingAverage - 2 * stdDev,
  };
};

const calculateEMA = (data: number[], period: number): number => {
  const k = 2 / (period + 1);
  return data.reduce((prev, curr, index) => {
    return index === 0 ? curr : curr * k + prev * (1 - k);
  }, 0);
};

const calculateSignalLine = (
  macdValues: number[],
  period: number = 9
): number => {
  return calculateEMA(macdValues, period);
};

const calculateMACD = (
  prices: number[],
  shortPeriod: number = 12,
  longPeriod: number = 26
): [number, number] => {
  const shortEMA = calculateEMA(prices, shortPeriod);
  const longEMA = calculateEMA(prices, longPeriod);
  const macdValue = shortEMA - longEMA;

  const macdValues = prices
    .map((_, index, array) => {
      if (index < longPeriod) return null;
      return (
        calculateEMA(array.slice(0, index + 1), shortPeriod) -
        calculateEMA(array.slice(0, index + 1), longPeriod)
      );
    })
    .filter((value) => value !== null) as number[];

  const signalLine = calculateSignalLine(macdValues);

  return [macdValue, signalLine];
};

const calculateRSI = (prices: number[], period: number = 14): number => {
  let gains = 0;
  let losses = 0;

  for (let i = 1; i < prices.length; i++) {
    const difference = prices[i] - prices[i - 1];
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }

  const averageGain = gains / period;
  const averageLoss = losses / period;
  const relativeStrength =
    averageLoss === 0 ? Infinity : averageGain / averageLoss;

  return 100 - 100 / (1 + relativeStrength);
};

const makeAdvancedPricePrediction = (
  data: number[],
  rsi: number,
  bollingerBands: BollingerBands,
  macd: number,
  signalLine: number
): string => {
  const latestPrice = data[data.length - 1];
  const isMacdCrossingAboveSignal = macd > signalLine;
  const isMacdCrossingBelowSignal = macd < signalLine;

  const shortTermMa = calculateMovingAverage(data, 20);
  const longTermMa = calculateMovingAverage(data, 50);

  if (
    latestPrice > bollingerBands.upperBand &&
    isMacdCrossingAboveSignal &&
    rsi < 70 &&
    shortTermMa > longTermMa
  ) {
    return "Erőteljes emelkedő trend várható";
  } else if (
    latestPrice < bollingerBands.lowerBand &&
    isMacdCrossingBelowSignal &&
    rsi > 30 &&
    shortTermMa < longTermMa
  ) {
    return "Erőteljes csökkenő trend várható";
  } else {
    return "Stabil piaci kondíciók vagy oldalazó trend várható";
  }
};

interface PriceData {
  priceUsd: string;
}

export function calculate(data: PriceData[]): string {
  const prices = data.map((item) => Number(item.priceUsd));

  const rsi = calculateRSI(prices);
  const bollingerBands = calculateBollingerBands(prices);
  const [macd, signalLine] = calculateMACD(prices);
  const prediction = makeAdvancedPricePrediction(
    prices,
    rsi,
    bollingerBands,
    macd,
    signalLine
  );

  console.log(bollingerBands);
  console.log(macd);
  console.log(signalLine);
  console.log(prediction);
  console.log(rsi);

  return prediction;
}
