"use strict";

async function fetchData() {
    const response = await fetch('https://share.chartmetric.com/make-music-equal/top5-genre-data.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',');

    const data = rows.slice(1).map(row => {
        const values = row.split(',');
        return {
            genre: values[0].trim(),
            he_him: Number(values[1].trim()) || 0,
            she_her: Number(values[2].trim()) || 0,
            they_them: Number(values[3].trim()) || 0
        };
    });

    return data;
}

export async function renderGenreChart() {
    const data = await fetchData();

    const labels = data.map(row => row.genre);

    const datasets = [
        {
            label: 'he/him',
            data: data.map(row => row.he_him),
            backgroundColor: 'rgba(236, 68, 6, 0.8)'
        },
        {
            label: 'she/her',
            data: data.map(row => row.she_her),
            backgroundColor: 'rgba(91, 188, 169, 0.8)'
        },
        {
            label: 'they/them',
            data: data.map(row => row.they_them),
            backgroundColor: 'rgba(153, 102, 255, 0.8)'
        }
    ];

    const ctx = document.getElementById('top5-genre-chart').getContext('2d');

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
                    display: true,
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
                    }
                },
                y: {
                    stacked: true
                },
            }
        }
    });
}