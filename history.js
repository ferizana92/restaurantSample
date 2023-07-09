//display purchase history table

function displayPurchaseHistory() {
  const historyTable = document.getElementById("history-table");
  console.log(historyTable);
  const storedcardItems = JSON.parse(sessionStorage.getItem("cardItems"));
  storedcardItems.forEach((item) => {
    const newRow = historyTable.insertRow();
    const nameCell = newRow.insertCell();
    const priceCell = newRow.insertCell();
    const quantityCell = newRow.insertCell();

    nameCell.textContent = item.name;
    priceCell.textContent = "$" + item.price;
    quantityCell.textContent = item.quantity;
  });
}

window.onload = function () {
  displayPurchaseHistory();
};

