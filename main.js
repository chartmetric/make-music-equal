"use strict";
import { renderPronounGridChart } from './charts/pronouns_grid.js';
import { renderCountryChart } from './charts/countries_chart.js';
import { renderGenreChart } from './charts/genre_chart.js';
import { renderCompositionChart } from './charts/composition_chart.js';

window.Webflow ||= [];window.Webflow.push(() => {  

	renderPronounGridChart();
	renderCountryChart();
	renderGenreChart();
	renderCompositionChart();
	
});