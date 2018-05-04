import './style.css';
import {getCityWeather} from './open-weather.js';
import './city-search.js';
import { appendFromLocalStorage } from './local-storage-communication';

window.addEventListener('load', appendFromLocalStorage)


