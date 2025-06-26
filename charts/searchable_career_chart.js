"use strict";

import {fetchData} from '../components/utils.js'

export async function renderSearchableCareerChart() {

    const url = 'https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/mme_career_stage.csv';
        const metricName = 'career_stage';
    
    const data = await fetchData(url, metricName);

    if (!data.length) return;

    const container = document.getElementById('searchable-career-container');

    // Create a wrapper for the search input and dropdown
    const searchWrapper = document.createElement('div');
    searchWrapper.style.position = 'relative';
    searchWrapper.style.marginBottom = '20px';

    // Create an input field for searching
    const input = document.createElement('input');
    input.id = 'career_stage';
    input.placeholder = 'Search for a stage...';
    input.style.width = '100%';
    input.style.padding = '0.5rem';
    input.style.border = '1px solid #D8D8D8';
    input.style.borderRadius = '5px';
    input.style.boxSizing = 'border-box';
    input.style.lineHeight = '1.5'
    input.style.setProperty('--webkit-input-placeholder', 'line-height: 1.5;');

    // Set the initial value of the input to the first country's name
    input.value = data[0].career_stage;

    input.addEventListener('click', () => {
        updateDropdown('');
        dropdown.style.display = 'block';
    });

    // Create a dropdown container for the options
    const dropdown = document.createElement('div');
    dropdown.id = 'career-dropdown';
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
            .filter(careerData =>
                careerData.career_stage.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => a.career_stage.localeCompare(b.career_stage)); // Sort alphabetically

        filteredData.forEach((careerData, index) => {
            const option = document.createElement('div');
            option.textContent = careerData.career_stage;
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
                input.value = careerData.career_stage;
                dropdown.style.display = 'none';
                renderChart(careerData);
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


    // Function to render chart for selected career stage
    const renderChart = (careerData) => {
        // Remove existing chart if any
        const existingCanvas = document.getElementById('career-searchable-donut');
        if (existingCanvas) {
            existingCanvas.remove();
        }

        // Create a canvas for the country
        const canvas = document.createElement('canvas');
        canvas.id = `career-searchable-donut`;
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
                    data: [careerData.he_him, careerData.she_her, careerData.they_them_other_pronouns],
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
            }});
        };

    // Initial render for the first career stage
    renderChart(data[0]);
}