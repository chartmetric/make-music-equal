"use strict";
import {fetchData}  from '../components/utils.js'

export async function renderCompositionChart() {
    const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme_composition.csv';
    const metric = 'composition';

    const data = await fetchData(url, metric);
    const labels = data.map(row => row.composition);

    const ctx = document.getElementById('solo-band-chart').getContext('2d');
    ctx.canvas.height = 300;
    ctx.canvas.width = 300;

    const orangeGr = ctx.createLinearGradient(0, 0, 0, 400);
    orangeGr.addColorStop(0, '#F0899A'); // Start color
    orangeGr.addColorStop(1, '#EEC23F'); // End color

    const blueGr = ctx.createLinearGradient(0, 0, 0, 400);
    blueGr.addColorStop(0, '#C0E7F4'); // Start color
    blueGr.addColorStop(1, '#A0B1FF'); // End color

    const datasets = [
        {
            label: 'he/him',
            data: data.map(row => row.he_him || 0),
            backgroundColor: blueGr
        },
        {
            label: 'she/her',
            data: data.map(row => row.she_her || 0),
            backgroundColor: orangeGr
        },
        {
            label: 'they/them and other',
            data: data.map(row => row.they_them_other_pronouns || 0),
            backgroundColor: '#E2EF70'
        },
        {
            label: 'band',
            data: data.map(row => row.band || 0),
            backgroundColor: '#9E89F3'
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
                        title: function(context) {
                            if (context[0].label === 'group') {
                                return context[0].label;
                            }
                            
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
                            
                            if (context.dataset.label === 'band') {
                                return `${value} artists are bands`;
                            } else {
                                return [`${value} artists use`, `${context.dataset.label} pronouns`];
                            }
                        }
                    }
                }
            },
            indexAxis: 'x',
            scales: {
                x: {
                    display: true,
                    stacked: true,
                    barPercentage: 1,
                    categoryPercentage: 1,
                    grid: {
                        display: false
                    },
                },
                y: {
                    display: true,
                    stacked: true,
                    ticks: {
                        maxTicksLimit: 8,
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