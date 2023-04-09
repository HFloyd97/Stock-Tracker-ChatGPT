const apiKey = "LZFHA0JSPT0ZX5XA"; // Replace with your actual Alpha Vantage API key
const searchButton = document.getElementById("search-button");
const symbolInput = document.getElementById("symbol-input");
const resultContainer = document.querySelector(".result-container");

searchButton.addEventListener("click", () => {
  const symbol = symbolInput.value;
  if (symbol) {
    resultContainer.innerHTML = '<div class="loader"></div>';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then(data => {
        const globalQuote = data["Global Quote"];
        if (globalQuote) {
          resultContainer.innerHTML = `
            <table>
              <tr>
                <th>Symbol</th>
                <td>${globalQuote["01. symbol"]}</td>
              </tr>
              <tr>
                <th>Open</th>
                <td>${globalQuote["02. open"]}</td>
              </tr>
              <tr>
                <th>High</th>
                <td>${globalQuote["03. high"]}</td>
              </tr>
              <tr>
                <th>Low</th>
                <td>${globalQuote["04. low"]}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>${globalQuote["05. price"]}</td>
              </tr>
              <tr>
                <th>Change</th>
                <td>${globalQuote["09. change"]}</td>
              </tr>
              <tr>
                <th>% Change</th>
                <td>${globalQuote["10. change percent"]}</td>
              </tr>
            </table>
          `;
        } else {
          resultContainer.innerHTML = "<p>No data available for the specified symbol.</p>";
        }
      })
      .catch(error => {
        resultContainer.innerHTML = `<p>${error.message}</p>`;
      });
  }
});
