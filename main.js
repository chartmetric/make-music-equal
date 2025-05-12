"use strict";

import {renderCareerChart} from './charts/career_chart.js';
import {renderSearchableCareerChart} from './charts/searchable_career_chart.js'
import { renderCountryChart } from './charts/countries_chart.js';
import { renderGenreChart } from './charts/genre_chart.js';
import { renderCompositionChart } from './charts/composition_chart.js';
import {renderSearchableTable} from './components/searchable_table.js';
import {renderCarousel } from './components/hmc_carousel.js';
import {renderSearchableCountriesChart} from './charts/searchable_countries_chart.js'
import {renderSearchableGenreChart} from './charts/searchable_genre_chart.js';
import {renderTotalArtists} from './components/total_artists.js'
import {renderDataDate} from './components/data_date.js'

window.Webflow ||= [];window.Webflow.push(() => {  

	renderTotalArtists();
	renderDataDate();
	renderCareerChart();
	renderSearchableCareerChart();
	renderGenreChart();
	renderSearchableGenreChart()
	renderCountryChart();
	renderSearchableCountriesChart();
	renderCompositionChart();
	renderSearchableTable();
	renderCarousel();

});