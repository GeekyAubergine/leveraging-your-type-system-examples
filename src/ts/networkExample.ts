import { Err, Result } from "./core";

type ApiErrorWithStatus = {
  type: "api_error_with_status";
  status: number;
};

type UnknownApiError = {
  type: "unknown_api_error";
  message: string;
};

type ApiError = ApiErrorWithStatus | UnknownApiError;

async function api<D>(url: string): Promise<Result<D, ApiError>> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        ok: false,
        error: {
          type: "api_error_with_status",
          status: response.status,
        },
      };
    }

    const data = await response.json();

    return {
      ok: true,
      value: data,
    };
  } catch (error) {
    return {
      ok: false,
      error: {
        type: "unknown_api_error",
        message: error.message,
      },
    };
  }
}

type Trade = {
  instrument: string;
};

type Instrument = {
  name: string;
  price: number;
};

type TradeWithPrice = Trade & {
  price: number;
};

type FetchTradeInstrumentNotFoundError = {
  type: "fetch_trade_instrument_not_found_error";
  instrument: string;
};

type FetchTradeError = ApiError | FetchTradeInstrumentNotFoundError;

async function fetchTradesWithPrices(): Promise<
  Result<TradeWithPrice[], FetchTradeError>
> {
  const trades = await api<Trade[]>("/api/trades");

  if (!trades.ok) {
    return trades;
  }

  const instrumentNames = trades.value.map((trade) => trade.instrument);

  const prices = await api<Instrument[]>(
    `/api/prices?instruments=${instrumentNames.join(",")}`
  );

  if (!prices.ok) {
    return prices;
  }

  const tradesWithPrices: TradeWithPrice[] = [];

  for (const trade of trades.value) {
    const instrument = prices.value.find(
      (instrument) => instrument.name === trade.instrument
    );

    if (!instrument) {
      return Err({
        type: "fetch_trade_instrument_not_found_error",
        instrument: trade.instrument,
      });
    }

    tradesWithPrices.push({
      ...trade,
      price: instrument.price,
    });
  }

  return {
    ok: true,
    value: tradesWithPrices,
  };
}
