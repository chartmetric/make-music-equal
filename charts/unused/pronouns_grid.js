// "use strict";

// async function fetchData() {
//   const response = await fetch('https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/pronoun_grid_data.csv');
//   const csvText = await response.text();
//   const rows = csvText.trim().split('\n');
//   const data = rows.slice(1).map(row => {
//     const values = row.split(',');
//     return {
//       x: +values[0],
//       y: +values[1],
//       point: values[2]
//     };
//   });
//   return data;
// }

// function getColor(point) {
//   switch (point) {
//     case 'he/him': return '#C0E7F4';
//     case 'she/her': return '#F0899A';
//     case 'they/them': return '#B7A7F9';
//     default: return '#CECECE';
//   }
// }

// export async function renderPronounGridChart() {
//   const fetchedData = await fetchData();
//   const data = {
//     datasets: [{
//       data: fetchedData,
//       backgroundColor({ raw }) {
//         return getColor(raw.point);
//       },
//       borderWidth: 0,
//       width: ({ chart }) => (chart.chartArea || {}).width / 10 - 1,
//       height: ({ chart }) => (chart.chartArea || {}).width / 10 - 1,
//     }]
//   };

//   const config = {
//     type: 'matrix',
//     data,
//     options: {
//       aspectRatio: 1,
//       plugins: {
//         legend: {
//           display: false
//         },
//         tooltip: {
//           enabled: true,
//           callbacks: {
//             label: function(context) {
//               const dataPoint = context.raw;
//               const pronounCount = fetchedData.filter(d => d.point === dataPoint.point).length;
//               return `${pronounCount}% of artists use ${dataPoint.point} pronouns`;
//             },
//             title: function(context) {
//               return '';
//             },
//             }
//         }
//       }, 
//       scales: {
//         x: {
//           display: false,
//           min: 0.5,
//           max: 10.5,
//           offset: false
//         },
//         y: {
//           display: false,
//           min: 0.5,
//           max: 10.5,
//           offset: false
//         }
//       }
//     }
//   };

//   new Chart(
//     document.getElementById('pronoun-grid-chart'),
//     config
//   );

//   new Chart(
//     document.getElementById('modal-pronoun-grid-chart'),
//     config
//   )
// }