const { useState, useEffect } = React;

// --- CLOSURE CONCEPT ---
const createRateFetcher = () => {
    const cache = {};
    return async (baseCurrency) => {
        if (cache[baseCurrency]) return cache[baseCurrency];

        try {
            const response = await fetch("https://open.er-api.com/v6/latest/" + baseCurrency);
            const data = await response.json();
            if (data && data.rates) cache[baseCurrency] = data.rates;
            return data.rates || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
};

const fetchRates = createRateFetcher();

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [exchangeRate, setExchangeRate] = useState(null);

    // Specifically exactly 10 currencies requested
    const currencies = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY', 'CNY', 'SGD', 'CHF'];

    useEffect(() => {
        const loadRate = async () => {
            if (fromCurrency === toCurrency) {
                setExchangeRate(1);
                return;
            }
            const rates = await fetchRates(fromCurrency);
            if (rates && rates[toCurrency]) {
                setExchangeRate(rates[toCurrency]);
            }
        };
        loadRate();
    }, [fromCurrency, toCurrency]);

    const handleAmountChange = (e) => {
        if (e.target.value >= 0) setAmount(e.target.value);
    };

    const convertedAmount = exchangeRate !== null ? (amount * exchangeRate).toFixed(2) : "...";

    // IMPORTANT: Absolutely no <div /> tags are used below per your instruction.
    // Instead using strictly semantic basic HTML5 elements: section, header, article, fieldset, p, input, select
    return (
        <section>
            <h2>Currency Converter</h2>

            <header>
                <p className="result-text">{convertedAmount} <span>{toCurrency}</span></p>
                <p className="from-label">{amount} {fromCurrency} equals</p>
                <p className="date-label">Value Fetch</p>
            </header>

            <article>
                <fieldset>
                    <input type="number" value={amount} onChange={handleAmountChange} min="0" />
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </fieldset>

                <fieldset>
                    <input type="text" value={convertedAmount} readOnly style={{ color: '#70757a' }} />
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </fieldset>
            </article>
        </section>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CurrencyConverter />);
