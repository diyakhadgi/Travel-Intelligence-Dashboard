import React, { useEffect, useState } from "react";
import axios from "axios";
import countries from "../countries.js";

const CurrencyConverter = ({ countryCode }) => {
  const api_key = import.meta.env.VITE_CURRENCY_API;
  const [exchangeRate, setExchangeRate] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryCode) return;

    const localCurrency = countries[countryCode];
    if (!localCurrency) {
      setError("Currency not found");
      return;
    }

    const storageKey = `currency_${baseCurrency}_${localCurrency}`;

    const fetchExchangeRate = async () => {
      setIsLoading(true);
      setError(null);

      if (!navigator.onLine) {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          const cachedRate = JSON.parse(cached);
          setExchangeRate(cachedRate.rate);
          setConvertedAmount(amount * cachedRate.rate);
        } else {
          setError("You're offline and no cached exchange data found.");
        }
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${api_key}/pair/${baseCurrency}/${localCurrency}`
        );

        const rate = response.data.conversion_rate;
        setExchangeRate(rate);
        setConvertedAmount(amount * rate);

        localStorage.setItem(storageKey, JSON.stringify({ rate }));
      } catch (err) {
        setError("Failed to fetch currency data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [countryCode, baseCurrency, api_key]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount(amount * exchangeRate);
    }
  }, [amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-center">Currency Converter</h3>

      {isLoading ? (
        <div className="text-center py-4 text-blue-500 font-medium">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4">
            <select
              value={baseCurrency}
              onChange={handleCurrencyChange}
              className="border border-gray-300 rounded-xl p-2 text-sm w-24 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min="0"
              className="border border-gray-300 rounded-xl p-2 w-28 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Amount"
            />

            <input
              type="text"
              readOnly
              value={convertedAmount.toFixed(2)}
              className="border border-gray-300 rounded-xl p-2 w-28 text-center bg-gray-100"
            />

            <span className="font-semibold">{countries[countryCode]}</span>
          </div>

          {/* Conversion rate */}
          {exchangeRate && (
            <div className="mt-4 text-sm text-gray-600 text-center">
              Rate: 1 {baseCurrency} = {exchangeRate.toFixed(4)}{" "}
              {countries[countryCode]}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrencyConverter;
