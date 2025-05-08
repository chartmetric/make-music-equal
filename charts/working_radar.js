"use strict";
async function fetchData() {
    const response = await fetch('https://chartmetric-public.s3.us-west-2.amazonaws.com/make-music-equal/career-breakdown.csv');
    const csvText = await response.text();
    const rows = csvText.trim().split('\n');

    const data = rows.slice(1).map(row => {
        const values = row.split(',');
        return {
            career_stage: values[0].trim(),
            he_him: Number(values[1].trim()) || 0,
            she_her: Number(values[2].trim()) || 0,
            they_them: Number(values[3].trim()) || 0
        };
    })

    return data;
}

export async function renderRadar() {
    const data = await fetchData();
    if (data.length === 0) {
        return; // No data to render
    }

    const careerData = data[2]; // Only use the first row of data

    const canvas = document.getElementById('career-stage-chart');
    if (!canvas) {
    console.error("Canvas not found");
    return;
    }
    const ctx = canvas.getContext('2d');


    new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: ['he/him', 'she/her', 'they/them'],
          datasets: [{
            label: 'Career Stage',
            data: [careerData.he_him, careerData.she_her, careerData.they_them],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
      
}