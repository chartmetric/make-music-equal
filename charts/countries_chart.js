"use strict";

import {fetchData}  from '../components/utils.js'

export async function renderCountryChart() {

    const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme_countries.csv';
    const metricName = 'country_name';

    const data = await fetchData(url, metricName);

     if (!data.length) return;

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

    const blueGr = ctx.createLinearGradient(0, 0, 0, 400);
    blueGr.addColorStop(0, '#C0E7F4'); // Start color
    blueGr.addColorStop(1, '#A0B1FF'); // End color

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['he/him', 'she/her', 'they/them and other pronouns'],
            datasets: [{
                data: [countryData.he_him, countryData.she_her, countryData.they_them_other_pronouns],
                backgroundColor: [
                    blueGr,
                    orangeGr,
                    '#E2EF70'
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