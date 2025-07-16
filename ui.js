export class UI {
    constructor() {
        this.gamesSection = document.getElementById('games-section');
        this.detailsSection = document.getElementById('details-section');
        this.loading = document.getElementById('loading');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.menuToggle = document.querySelector('.navbar-toggler');
        this.gamesInstance = null; 
    }

    displayData(games) {
        if (!Array.isArray(games)) {
            console.error('Expected an array, got:', games);
            this.gamesSection.innerHTML = '<p class="text-white">No games available.</p>'; 
            return;
        }
        this.gamesSection.innerHTML = games.map(game => `
            <div class="col">
                <div class="card game-card" data-id="${game.id || game.game_id}">
                    <img src="${game.thumbnail || game.image}" alt="${game.title}" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${game.title}</h5>
                        <p class="card-text">${game.short_description || game.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayDetails(game) {
        this.gamesSection.classList.add('d-none');
        this.detailsSection.classList.remove('d-none');
        this.detailsSection.innerHTML = `
            <div class="details-card">
                <h4 class="mb-4">Details Game <button id="close-details" class="btn btn-danger position-absolute  end-0 m-2 ">X</button></h4>
                <img src="${game.thumbnail || game.image}" alt="${game.title}" class="card-img-top" style="height: 300px; object-fit: cover;">
                <div class="card-body">
                    <h2 class="card-title">${game.title}</h2>
                    <p class="card-text">${game.description}</p>
                    <p class="card-text"><strong>Genre:</strong> ${game.genre}</p>
                    <p class="card-text"><strong>Platform:</strong> ${game.platform}</p>
                    <p class="card-text"><strong>Publisher:</strong> ${game.publisher}</p>
                    <p class="card-text"><strong>Release Date:</strong> ${game.release_date}</p>
                    <a href="${game.game_url}" target="_blank" class="btn btn-primary">Play Now</a>
                </div>
            </div>
        `;
        document.getElementById('close-details').addEventListener('click', () => {
            this.detailsSection.classList.add('d-none');
            this.gamesSection.classList.remove('d-none');
        });
    }

    showLoading() {
        this.loading.classList.remove('d-none');
    }

    hideLoading() {
        this.loading.classList.add('d-none');
    }

    setupNavEvents(gamesInstance) {
        this.gamesInstance = gamesInstance; 
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const category = link.dataset.category;
                this.gamesInstance.fetchGames(category);
            });
        });

    }
}
