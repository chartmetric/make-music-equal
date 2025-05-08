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


export async function renderCareerChart() {
    const data = await fetchData();
    if (!data.length) return;

    const labels = [];
    const datasets = [];

    const canvas = document.getElementById('career-stage-chart');
    if (!canvas) {
        console.error('Canvas not found');
        return;
    }

    const ctx = canvas.getContext('2d');
    const orangeGr = ctx.createLinearGradient(0, 0, 0, 400);
    orangeGr.addColorStop(0, '#F0899A'); // Start color
    orangeGr.addColorStop(1, '#EEC23F'); // End color

    const baseColors = [orangeGr, '#C0E7F4', '#B7A7F9']; // he/him, she/her, they/them

    data.forEach(stage => {
        labels.push(
            `${stage.career_stage}: he/him`,
            `${stage.career_stage}: she/her`,
            `${stage.career_stage}: they/them`
        );
        datasets.push({
            label: stage.career_stage,
            backgroundColor: baseColors,
            data: [stage.he_him, stage.she_her, stage.they_them]
        });
    });

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels,
            datasets
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const labelIndex = (context[0].datasetIndex * 3) + context[0].dataIndex;
                            return context[0].chart.data.labels[labelIndex];
                        },
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
                },
                legend: {
                    display: false
                }
            }
        }
    });
}
