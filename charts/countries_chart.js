"use strict";

async function fetchData() {
    const response = await fetch('https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/country-breakdown.csv');
    const csvText = await response.text();

    const rows = csvText.trim().split('\n');

    if (rows.length < 2) {
        return []; // Return empty array if no data is available
    }

    const values = rows[1].split(',').map(value => value.trim());
    const data = [{
        country_name: values[0],
        he_him: Number(values[1]) || 0,
        she_her: Number(values[2]) || 0,
        they_them: Number(values[3]) || 0
    }];

    return data;
}

export async function renderCountryChart() {
    const data = await fetchData();
    if (data.length === 0) {
        return; // No data to render
    }

    const countryData = data[0]; // Only use the first row of data
    const container = document.getElementById('donut-countries-container');

    // Create a canvas for the country
    const canvas = document.createElement('canvas');
    canvas.id = `doughnut-chart-0`;
    canvas.style.width = '300px';
    canvas.style.height = '300px';

    // Append canvas to container
    const chartWrapper = document.createElement('div');
    chartWrapper.style.display = 'flex';
    chartWrapper.style.flexDirection = 'column';
    chartWrapper.style.alignItems = 'center';
    chartWrapper.appendChild(canvas);
    container.appendChild(chartWrapper);

    const ctx = canvas.getContext('2d');
    const orangeGr = ctx.createLinearGradient(0, 0, 0, 400);
    orangeGr.addColorStop(0, '#F0899A'); // Start color
    orangeGr.addColorStop(1, '#EEC23F'); // End color

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['he/him', 'she/her', 'they/them'],
            datasets: [{
                data: [countryData.he_him, countryData.she_her, countryData.they_them],
                backgroundColor: [
                    orangeGr,
                    '#C0E7F4',
                    '#B7A7F9'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: context => {
                            let value = context.raw;
                            if (value >= 1000000) {
                                value = (value / 1000000).toFixed(1) + 'm';
                            } else if (value >= 1000) {
                                value = (value / 1000).toFixed(1) + 'k';
                            }
                            return `${value} artists`
                        }
                    }
                }
            },
            cutout: '40%' // Adjusts the size of the doughnut hole
        }
    });
}