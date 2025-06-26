"use strict";

import { fetchTableData } from "./utils.js";

export async function renderSearchableTable() {

  const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme_artist_info.csv'
  const data = await fetchTableData(url)

  if (!data.length) {
    return;
  }

  const gridOptions = {
    rowData: data,
    pagination: true,
    paginationPageSize: 50,
    paginationPageSizeSelector: false,
    columnDefs: [
      { headerName: "", field: "chartmetric_rank", width: 50, minWidth: 50, flex: 0, filter: false },
      { headerName: "Artist", field: "artist_name", 
        cellRenderer: params => {
          const link = document.createElement("a");
          link.href = params.data.chartmetric_url;
          link.target = "_blank";
          link.textContent = params.value;
          return link;
        }},
      { headerName: "Country", field: "country_name" },
      { headerName: "Pronouns", field: "pronouns" },
      { headerName: "Composition", field: "composition" },
      { headerName: "Career Stage", field: "career_stage" },
      { headerName: "Genre", field: "genre" }
    ],
    defaultColDef: { flex: 1, minWidth: 150, sortable: true, filter: true }
  };

  const style = document.createElement("style");
  style.innerHTML = `
    /* Remove text decoration from links */
    .ag-cell a {
      color: inherit;
    }
    
    .ag-cell a:hover {
        font-weight: bold;
      }

    /* Bold headers */
    .ag-header-cell {
      font-weight: bold;
      background-color: rgba(216,163,255,0.4)
    }

    /* Highlight rows on hover */
    .ag-row:hover {
      background-color: rgba(238,194,63,0.5) !important;
    }

    /* Hide horizontal scrollbar */
    .ag-body-horizontal-scroll {
      display: none !important;
    }
    
    .ag-body-viewport {
      overflow-x: hidden !important;
    }

    overscroll-behavior: contain;
  `;
  document.head.appendChild(style);

  // Ensure the grid container exists
  const tableElement = document.querySelector("#searchable-table");

  // Initialize the table
  agGrid.createGrid(tableElement, gridOptions);
}
