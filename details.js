import { UI } from './ui.js';

export class Details {
    constructor() {
        this.ui = new UI();
    }

    async fetchDetails(id) {
        this.ui.showLoading();
        try {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'ffc365d54bmsh19d9f06a59e1896p16e451jsn245811eead41',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
            const game = await response.json();
            this.ui.displayDetails(game);
            this.setupCloseEvent();
        } catch (error) {
            console.error('Error fetching details:', error);
        } finally {
            this.ui.hideLoading();
        }
    }

    setupCloseEvent() {
        document.getElementById('close-details').addEventListener('click', () => {
            this.ui.detailsSection.classList.add('hidden');
            this.ui.gamesSection.classList.remove('hidden');
        });
    }
}