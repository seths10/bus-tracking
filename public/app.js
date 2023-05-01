const dataContainer = document.querySelector('#data-container');

function getData() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            renderData(data);
        })
        .catch(error => {
            console.error(error);
            dataContainer.innerHTML = '<p class="error">Error fetching data</p>';
        });
}

function renderData(data) {
    const table = document.createElement('table');
    table.classList.add('table');

    const headerRow = document.createElement('tr');
    const headers = ['Device ID', 'Altitude', 'Latitude', 'Longitude', 'Satellites', 'Timestamp'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    data.forEach(dataItem => {
        const row = document.createElement('tr');

        Object.values(dataItem).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });

        table.appendChild(row);
    });

    dataContainer.innerHTML = '';
    dataContainer.appendChild(table);
}

getData();
setInterval(getData, 1000);
