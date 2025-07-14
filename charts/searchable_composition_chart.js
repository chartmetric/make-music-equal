"use strict";
import {fetchData} from '../components/utils.js'

export async function renderSearchableCompositionChart() {
    const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme_countries.csv';
    const metricName = 'country_name';
    
    const data = await fetchData(url, metricName);

    if (!data.length) return;

    const container = document.getElementById('searchable-composition-container');

    // Create a wrapper for the search input and dropdown
    const searchWrapper = document.createElement('div');
    searchWrapper.style.position = 'relative';
    searchWrapper.style.marginBottom = '20px';

    // Create an input field for searching
    const input = document.createElement('input');
    input.id = 'country-search';
    input.placeholder = 'Search for a country...';
    input.style.width = '100%';
    input.style.padding = '0.5rem';
    input.style.border = '1px solid #D8D8D8';
    input.style.borderRadius = '5px';
    input.style.boxSizing = 'border-box';
    input.style.lineHeight = '1.5'
    input.style.setProperty('--webkit-input-placeholder', 'line-height: 1.5;');

    // Set the initial value of the input to the first country's name
    input.value = data[0].country_name;

    input.addEventListener('click', () => {
        updateDropdown('');
        dropdown.style.display = 'block';
    });

    // Create a dropdown container for the options
    const dropdown = document.createElement('div');
    dropdown.id = 'country-dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.top = '100%';
    dropdown.style.left = '0';
    dropdown.style.width = '100%';
    dropdown.style.border = '1px solid #D8D8D8';
    dropdown.style.borderRadius = '5px';
    dropdown.style.backgroundColor = '#FFFFFF';
    dropdown.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    dropdown.style.zIndex = '1000';
    dropdown.style.maxHeight = '200px';
    dropdown.style.overflowY = 'auto';
    dropdown.style.display = 'none';
    dropdown.style.lineHeight = '1.5';

    // Append input and dropdown to the wrapper
    searchWrapper.appendChild(input);
    searchWrapper.appendChild(dropdown);

    // Append the wrapper to the container
    container.appendChild(searchWrapper);

    // Populate dropdown with country names
    const updateDropdown = (filter) => {
        dropdown.innerHTML = ''; // Clear previous options
        const filteredData = data
            .filter(countryData =>
                countryData.country_name.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => a.country_name.localeCompare(b.country_name)); // Sort alphabetically

        filteredData.forEach((countryData, index) => {
            const option = document.createElement('div');
            option.textContent = countryData.country_name;
            option.style.padding = '0.5rem';
            option.style.cursor = 'pointer';
            option.style.borderBottom = '1px solid #F0F0F0';
            option.style.backgroundColor = '#FFFFFF';

            option.addEventListener('mouseover', () => {
                option.style.backgroundColor = '#F5F5F5';
            });

            option.addEventListener('mouseout', () => {
                option.style.backgroundColor = '#FFFFFF';
            });

            option.addEventListener('click', () => {
                input.value = countryData.country_name;
                dropdown.style.display = 'none';
                renderChart(countryData);
            });

            dropdown.appendChild(option);
        });

        dropdown.style.display = filteredData.length > 0 ? 'block' : 'none';
    };

    // Add a down arrow to indicate dropdown
    const arrow = document.createElement('span');
    arrow.textContent = '\u25BC'; // Unicode for down arrow
    arrow.style.position = 'absolute';
    arrow.style.right = '10px';
    arrow.style.top = '50%';
    arrow.style.transform = 'translateY(-50%)';
    arrow.style.pointerEvents = 'none';
    arrow.style.color = '#A0A0A0';

    // Append arrow to the search wrapper
    searchWrapper.appendChild(arrow);

    // Update dropdown on input
    input.addEventListener('input', () => {
        updateDropdown(input.value);
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchWrapper.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Function to render chart for selected country
    const renderChart = (countryData) => {
        // Remove existing chart if any
        const existingCanvas = document.getElementById('searchable-composition-chart');
        if (existingCanvas) {
            existingCanvas.remove();
        }

        // Create a canvas for the country
        const canvas = document.createElement('canvas');
        canvas.id = 'searchable-composition-chart';
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

        // Create datasets for the bar chart - separate solo and band bars
        const datasets = [
            {
                label: 'he/him',
                data: [countryData.he_him || 0, 0], // Solo bar, Band bar
                backgroundColor: blueGr
            },
            {
                label: 'she/her',
                data: [countryData.she_her || 0, 0], // Solo bar, Band bar
                backgroundColor: orangeGr
            },
            {
                label: 'they/them and other',
                data: [countryData.they_them_other_pronouns || 0, 0], // Solo bar, Band bar
                backgroundColor: '#E2EF70'
            },
            {
                label: 'band',
                data: [0, countryData.band || 0], // Solo bar, Band bar
                backgroundColor: '#9E89F3'
            }
        ];

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['solo', 'band'],
                datasets: datasets
            },
            options: {
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        display: false,
                    },                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    if (context[0].label === 'band') {
                                        return `${countryData.country_name} - ${context[0].label}`;
                                    }
                                    
                                    let totalArtists = context[0].chart.data.datasets
                                        .filter(dataset => dataset.label !== 'band')
                                        .reduce((sum, dataset) => sum + dataset.data[context[0].dataIndex], 0);
                                    const totalArtistsFormatted = function (totalArtists) {
                                        if (totalArtists >= 1000000) {
                                            return (totalArtists / 1000000).toFixed(1) + 'm';
                                        } else if (totalArtists >= 1000) {
                                            return (totalArtists / 1000).toFixed(1) + 'k';
                                        }
                                        return totalArtists;
                                    };
                                    return `${countryData.country_name} - ${context[0].label} (${totalArtistsFormatted(totalArtists)} total artists)`;
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
    };

    // Initial render for the first country
    renderChart(data[0]);
}