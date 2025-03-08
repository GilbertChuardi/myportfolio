"use client";

import React, { useEffect, useRef, memo, useState } from "react";

function Chart({ firstCurrency, secondCurrency }) {
  const container = useRef();
  const iframeRef = useRef(null);
  const [lastValidSymbol, setLastValidSymbol] = useState("NASDAQ:AAPL");

  useEffect(() => {
    let newSymbol = lastValidSymbol;

    if (firstCurrency === "init" && secondCurrency === "init") {
      newSymbol = "NASDAQ:AAPL";
    } else if (
      firstCurrency !== "init" &&
      firstCurrency &&
      secondCurrency !== "init" &&
      secondCurrency
    ) {
      newSymbol = `FX:${firstCurrency}${secondCurrency}`;
    }

    if (newSymbol !== lastValidSymbol) {
      setLastValidSymbol(newSymbol);
    }
  }, [firstCurrency, secondCurrency]);

  useEffect(() => {
    // Remove the existing iframe if it exists

    if (container) {
      if (iframeRef.current && container.current.contains(iframeRef.current)) {
        container.current.removeChild(iframeRef.current);
        iframeRef.current = null;
      }
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${lastValidSymbol}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;

    container.current.appendChild(script);

    // Store the iframe reference once it's created
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const iframe = container.current.querySelector("iframe");
          if (iframe && !iframeRef.current) {
            iframeRef.current = iframe; // Store the iframe reference
          }
        }
      });
    });

    // Observe the container for changes
    observer.observe(container.current, { childList: true });

    return () => {
      // Stop observing
      observer.disconnect();

      if (container.current) {
        if (container.current.contains(script)) {
          container.current.removeChild(script);
        }

        if (
          iframeRef.current &&
          container.current.contains(iframeRef.current)
        ) {
          container.current.removeChild(iframeRef.current);
          iframeRef.current = null;
        }
      }
    };
  }, [lastValidSymbol]);

  return <div className="tradingview-widget-container" ref={container}></div>;
}

export default memo(Chart);
