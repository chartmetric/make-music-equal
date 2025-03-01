"use strict";

// Fetch Data and Initialize Table
async function fetchData() {
  const response = await fetch('https://share.chartmetric.com/make-music-equal/mme-data.csv');
  const csvText = await response.text();
  const rows = csvText.trim().split('\n');
  const headers = rows[0].split(',');

  const data = rows.slice(1).map(row => {
    const values = row.split(',');
    return {
      artist_name: values[1].trim(),
      chartmetric_url: values[2].trim(),
      country_name: values[3].trim(),
      pronouns: values[4].trim(),
      is_band: values[5].trim(),
      genre: values[6].trim(),
    };
  });

  return data;
}

export async function renderSearchableTable() {
  const data = await fetchData();

  const gridOptions = {
    rowData: data,
    columnDefs: [
      { headerName: "Artist", field: "artist_name", cellRenderer: params => `<a href="${params.data.chartmetric_url}" target="_blank">${params.value}</a>` },
      { headerName: "Country", field: "country_name" },
      { headerName: "Pronouns", field: "pronouns" },
      { headerName: "Composition", field: "is_band" },
      { headerName: "Genre", field: "genre" }
    ],
    defaultColDef: { flex: 1, minWidth: 150, sortable: true, filter: true }
  };

  // Ensure the grid container exists
  const tableElement = document.querySelector("#searchable-table");

  // Initialize the table
  agGrid.createGrid(tableElement, gridOptions);
}
