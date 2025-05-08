"use strict";


async function fetchData() {
    const response = await fetch('https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/genre-breakdown.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');

    const data = rows.slice(1).map(row => {
        const values = row.split(',');
        return {
            genre: values[0].trim(),
            he_him: Number(values[1].trim()) || 0,
            she_her: Number(values[2].trim()) || 0,
            they_them: Number(values[3].trim()) || 0
        };
    }).slice(0, 3); // Limit to the first 3 data points

    return data;
}

export async function renderGenreChart() {
    const data = await fetchData();

    const labels = data.map(row => row.genre); 

    const ctx = document.getElementById('top5-genre-chart').getContext('2d')
    ctx.canvas.height = 300;
    ctx.canvas.width = 300;

    const orangeGr = ctx.createLinearGradient(0, 0, 0, 400);
    orangeGr.addColorStop(0, '#F0899A'); // Start color
    orangeGr.addColorStop(1, '#EEC23F'); // End color


    const datasets = [
        {
            label: 'he/him',
            data: data.map(row => row.he_him),
            backgroundColor: orangeGr
        },
        {
            label: 'she/her',
            data: data.map(row => row.she_her),
            backgroundColor: '#C0E7F4'
        },
        {
            label: 'they/them',
            data: data.map(row => row.they_them),
            backgroundColor: '#B7A7F9'
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
                    display: false,
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            let totalArtists = context[0].chart.data.datasets.reduce((sum, dataset) => sum + dataset.data[context[0].dataIndex], 0);
                            const totalArtistsFormatted = function (totalArtists) {
                                if (totalArtists >= 1000000) {
                                    return (totalArtists / 1000000).toFixed(1) + 'm';
                                } else if (totalArtists >= 1000) {
                                    return (totalArtists / 1000).toFixed(1) + 'k';
                                }
                                return totalArtists;
                            };
                            return `${context[0].label} (${totalArtistsFormatted(totalArtists)} total artists)`;
                        },
                        label: context => {
                            let value = context.raw;
                            if (value >= 1000000) {
                                value = (value / 1000000).toFixed(1) + 'm';
                            } else if (value >= 1000) {
                                value = (value / 1000).toFixed(1) + 'k';
                            }
                            return `${value} artists use ${context.dataset.label} pronouns`;
                        }
                    }
                }
            },
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return (value / 1000000).toFixed(0) + 'm';
                            } else if (value >= 1000) {
                                return (value / 1000).toFixed(0) + 'k';
                            }
                            return value;
                        }
                    },
                    grid: {
                        display: true,
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        callback: function(index) {
                            return labels[index];
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}