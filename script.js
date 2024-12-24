const inventory = [];

function scanTag() {
    const rfidInput = document.getElementById("rfidInput");
    const rfidValue = rfidInput.value.trim();
    if (rfidValue === "") {
        alert("Please enter an RFID Tag value!");
        return;
    }

    const itemName = prompt("Enter item name for the scanned tag:");
    if (!itemName) {
        alert("Item name is required!");
        return;
    }

    const timestamp = new Date().toLocaleString();
    inventory.push({ rfidTag: rfidValue, itemName, timestamp });
    rfidInput.value = "";
    updateTable();
}

function updateTable() {
    const tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = "";

    inventory.forEach((item, index) => {
        const row = document.createElement("tr");

        const rfidCell = document.createElement("td");
        rfidCell.textContent = item.rfidTag;
        row.appendChild(rfidCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.itemName;
        row.appendChild(nameCell);

        const timestampCell = document.createElement("td");
        timestampCell.textContent = item.timestamp;
        row.appendChild(timestampCell);

        tableBody.appendChild(row);
    });
}

function filterInventory() {
    const filterInput = document.getElementById("filterInput").value.toLowerCase();
    const tableBody = document.querySelector("#inventoryTable tbody");

    tableBody.innerHTML = "";

    inventory
        .filter(item => item.itemName.toLowerCase().includes(filterInput))
        .forEach(item => {
            const row = document.createElement("tr");

            const rfidCell = document.createElement("td");
            rfidCell.textContent = item.rfidTag;
            row.appendChild(rfidCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = item.itemName;
            row.appendChild(nameCell);

            const timestampCell = document.createElement("td");
            timestampCell.textContent = item.timestamp;
            row.appendChild(timestampCell);

            tableBody.appendChild(row);
        });
}

function sortTable(columnIndex) {
    const isAscending = document.querySelector(`th:nth-child(${columnIndex + 1})`).classList.toggle("ascending");

    inventory.sort((a, b) => {
        const valueA = Object.values(a)[columnIndex].toLowerCase();
        const valueB = Object.values(b)[columnIndex].toLowerCase();

        if (valueA < valueB) return isAscending ? -1 : 1;
        if (valueA > valueB) return isAscending ? 1 : -1;
        return 0;
    });

    updateTable();
}

function exportToCSV() {
    if (inventory.length === 0) {
        alert("No data to export!");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,RFID Tag,Item Name,Timestamp\n";
    inventory.forEach(item => {
        csvContent += `${item.rfidTag},${item.itemName},${item.timestamp}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
