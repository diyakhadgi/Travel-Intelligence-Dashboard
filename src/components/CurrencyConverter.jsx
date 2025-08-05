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

    const fetchExchangeRate = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const localCurrency = countries[countryCode];
        if (!localCurrency) {
          throw new Error("Currency not found");
        }

        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${api_key}/pair/${baseCurrency}/${localCurrency}`
        );

        setExchangeRate(response.data.conversion_rate);
        setConvertedAmount(amount * response.data.conversion_rate);
      } catch (err) {
        setError("Failed to fetch currency data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [countryCode, baseCurrency, amount, api_key]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-3">Currency Converter</h3>

      {isLoading ? (
        <div className="text-center py-4">Loading..</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          <div className="flex flex-row justify-evenly">
            <select
              value={baseCurrency}
              onChange={handleCurrencyChange}
              className="mr-2"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min="0"
              className="outline-gray-400"
            />
          </div>
          <div className="flex flex-row justify-evenly mt-2">
            <input
              type="text"
              readOnly
              value={convertedAmount.toFixed(2)}
              className="outline-gray-400"
            />
            <span>{countries[countryCode]}</span>
          </div>
          {exchangeRate && (
            <div className="mt-2 text-sm text-gray-600">
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
