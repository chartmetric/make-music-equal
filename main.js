"use strict";

import { renderPronounGridChart } from './charts/pronouns_grid.js';
import { renderCountryChart } from './charts/countries_chart.js';
import { renderGenreChart } from './charts/genre_chart.js';
import { renderCompositionChart } from './charts/composition_chart.js';
import {renderSearchableTable} from './charts/searchable_table.js';
import { renderCarousel } from './components/hmc_carousel.js';
import {renderCountriesChart} from './charts/searchable_countries_chart.js'

window.Webflow ||= [];window.Webflow.push(() => {  

	renderPronounGridChart();
	renderCountryChart();
	renderGenreChart();
	renderCompositionChart();
	renderSearchableTable();
	renderCarousel();
	renderCountriesChart();

});