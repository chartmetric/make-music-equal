"use strict";

function waitForDependencies() {
    return new Promise((resolve) => {
        const checkDeps = () => {
            if (typeof Chart !== 'undefined' && typeof window.Webflow !== 'undefined') {
                resolve();
            } else {
                setTimeout(checkDeps, 100);
            }
        };
        checkDeps();
    });
}

async function initializeApp() {
    try {
        await waitForDependencies();

        const isDesktop = window.innerWidth >= 992;

        const [
            { renderCareerChart },
            { renderSearchableCareerChart },
            { renderCountryChart },
            { renderGenreChart },
            { renderCompositionChart },
            searchableTableModule,
            { renderCarousel },
            { renderSearchableCountriesChart },
            { renderSearchableGenreChart },
            { renderTotalArtists },
            { renderDataDate }
        ] = await Promise.all([
            import('./charts/career_chart.js'),
            import('./charts/searchable_career_chart.js'),
            import('./charts/countries_chart.js'),
            import('./charts/genre_chart.js'),
            import('./charts/composition_chart.js'),
            import('./components/searchable_table.js'), // included, but optional use
            import('./components/hmc_carousel.js'),
            import('./charts/searchable_countries_chart.js'),
            import('./charts/searchable_genre_chart.js'),
            import('./components/total_artists.js'),
            import('./components/data_date.js')
        ]);

        document.addEventListener('DOMContentLoaded', () => {
            renderTotalArtists();
            renderDataDate();
            renderCareerChart();
            renderSearchableCareerChart();
            renderGenreChart();
            renderSearchableGenreChart();
            renderCountryChart();
            renderSearchableCountriesChart();
            renderCompositionChart();
            renderCarousel();

            if (isDesktop) {
                searchableTableModule.renderSearchableTable();
            } else {
                console.log("Skipping ag-Grid table on mobile");
            }
        });

    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
}

initializeApp();
