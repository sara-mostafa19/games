import { UI } from './ui.js';
import { Details } from './details.js';

export class Games {
    constructor() {
        this.ui = new UI();
    }

    async fetchGames(category) {
        this.ui.showLoading();
        try {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'ffc365d54bmsh19d9f06a59e1896p16e451jsn245811eead41',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
            const response = await api.json();
            console.log(response);
            this.ui.displayData(response);
            this.setupCardEvents();
        } catch (error) {
            console.error('Error fetching games:', error);
        } finally {
            this.ui.hideLoading();
        }
    }

    setupCardEvents() {
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                new Details().fetchDetails(id);
            });
        });
    }
}