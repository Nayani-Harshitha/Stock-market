// API Key for Alpha Vantage (You need to get your own API key from https://www.alphavantage.co)
const API_KEY = 'YOUR_API_KEY';  // Replace 'YOUR_API_KEY' with your actual API key

// Function to fetch stock data from Alpha Vantage
async function getStockData() {
    const symbol = document.getElementById("stockSymbol").value.toUpperCase();
    if (!symbol) {
        alert("Please enter a stock symbol.");
        return;
    }

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data["Error Message"]) {
            document.getElementById("stockInfo").innerHTML = `<p>Invalid stock symbol. Please try again.</p>`;
            return;
        }

        const latestData = data["Time Series (5min)"];
        const latestTime = Object.keys(latestData)[0];
        const stockInfo = latestData[latestTime];

        // Extract stock data
        const stockPrice = stockInfo["4. close"];
        const stockOpen = stockInfo["1. open"];
        const stockHigh = stockInfo["2. high"];
        const stockLow = stockInfo["3. low"];

        // Display the stock information
        document.getElementById("stockInfo").innerHTML = `
            <h2>${symbol}</h2>
            <p><strong>Price:</strong> $${parseFloat(stockPrice).toFixed(2)}</p>
            <p><strong>Open:</strong> $${parseFloat(stockOpen).toFixed(2)}</p>
            <p><strong>High:</strong> $${parseFloat(stockHigh).toFixed(2)}</p>
            <p><strong>Low:</strong> $${parseFloat(stockLow).toFixed(2)}</p>
            <p><strong>Last Updated:</strong> ${latestTime}</p>
        `;
    } catch (error) {
        console.error("Error fetching stock data:", error);
        document.getElementById("stockInfo").innerHTML = `<p>Sorry, there was an error fetching stock data. Please try again later.</p>`;
    }
}
