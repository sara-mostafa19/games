import { UI } from './ui.js';
import { Games } from './games.js';
import { Details } from './details.js';

const ui = new UI();
const games = new Games();
const details = new Details();

document.addEventListener('DOMContentLoaded', () => {
    ui.setupNavEvents(games);
    games.fetchGames('mmorpg'); 
});
