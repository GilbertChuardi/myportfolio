"use client";

import DraggableCurrency from "./components/DraggableCurrency";
import Chart from "./components/Chart";
import { useState } from "react";

export default function Page() {
  const [firstCurrency, setFirstCurrency] = useState("init");
  const [secondCurrency, setSecondCurrency] = useState("init");

  return (
    <div className="w-full 2xl:h-[85vh] h-[80vh]">
      <title>TradingView Integration</title>
      <DraggableCurrency
        setFirstCurrency={setFirstCurrency}
        setSecondCurrency={setSecondCurrency}
      />

      <Chart firstCurrency={firstCurrency} secondCurrency={secondCurrency} />
    </div>
  );
}
