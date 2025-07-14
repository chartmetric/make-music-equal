"use strict";

// Wait for dependencies to be available
function waitForDependencies() {
    return new Promise((resolve) => {
        const checkDeps = () => {
            if (typeof Chart !== 'undefined' && typeof agGrid !== 'undefined' && window.Webflow) {
                resolve();
            } else {
                setTimeout(checkDeps, 100);
            }
        };
        checkDeps();
    });
}

// Dynamic imports that wait for dependencies
async function initializeApp() {
    try {
        await waitForDependencies();
        
        const [
            { renderCareerChart },
            { renderSearchableCareerChart },
            { renderCountryChart },
            { renderGenreChart },
            { renderCompositionChart },
            { renderSearchableCompositionChart },
            { renderSearchableTable },
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
            import('./charts/searchable_composition_chart.js'),
            import('./components/searchable_table.js'),
            import('./components/hmc_carousel.js'),
            import('./charts/searchable_countries_chart.js'),
            import('./charts/searchable_genre_chart.js'),
            import('./components/total_artists.js'),
            import('./components/data_date.js')
        ]);

        window.Webflow ||= [];
        window.Webflow.push(() => {
            renderTotalArtists();
            renderDataDate();
            renderCareerChart();
            renderSearchableCareerChart();
            renderGenreChart();
            renderSearchableGenreChart();
            renderCountryChart();
            renderSearchableCountriesChart();
            renderCompositionChart();
            renderSearchableCompositionChart();
            renderSearchableTable();
            renderCarousel();
        });
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
}

initializeApp();