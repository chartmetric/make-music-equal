"use strict";
async function fetchData() {
    const response = await fetch('https://share.chartmetric.com/make-music-equal/solo-band-data.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',');

    const data = rows.slice(1).map(row => {
        const values = row.split(',');
        return {
            country_name: values[0].trim(),
            is_band: Number(values[1].trim()) || 0,
        };
    });

    return data;
}

export async function renderCompositionChart() {
    const data = await fetchData();

    const labels = data.map(row => row.country_name);

    const ctx = document.getElementById('solo-band-chart').getContext('2d');
    ctx.canvas.height = 300;
    ctx.canvas.width = 300;

    const orangeGr = ctx.createLinearGradient(0, 0, 0, 400);
    orangeGr.addColorStop(0, '#F0899A'); // Start color
    orangeGr.addColorStop(1, '#EEC23F'); // End color

    const datasets = [
        {
            label: 'is_band',
            data: data.map(row => row.is_band),
            backgroundColor: orangeGr
        }
    ];


    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false,
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
                            return `${value} artists`;
                        }
                    }
                }
            },
            indexAxis: 'x',
            scales: {
                x: {
                    display: true,
                    stacked: false,
                    barPercentage: 1,
                    categoryPercentage: 1,
                    grid: {
                        display: false
                    },
                },
                y: {
                    display: true,
                    stacked: false,
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return (value / 1000000).toFixed(0) + 'm';
                            } else if (value >= 1000) {
                                return (value / 1000).toFixed(0) + 'k';
                            }
                            return value;
                        }
                    }
                },
            },
            responsive: true,
        }
    });
}