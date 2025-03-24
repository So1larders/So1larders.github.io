// JsMain.js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('nav, .container').forEach(el => el.style.display = 'none');
  document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();
    const confirmPassword = document.getElementById('confirmPasswordInput').value.trim();
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = '';
    if (!name || !email || !password || !confirmPassword) {
      errorElement.textContent = 'Всі поля обов\'язкові для заповнення!';
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errorElement.textContent = 'Будь ласка, введіть дійсний email!';
      return;
    }

    // Перевірка збігу паролів
    if (password !== confirmPassword) {
      errorElement.textContent = 'Паролі не збігаються!';
      return;
    }

    // Якщо всі перевірки пройдено
    // Приховуємо форму реєстрації
    document.getElementById('registration-overlay').style.display = 'none';

    // Показуємо основний контент
    document.querySelectorAll('nav, .container').forEach(el => el.style.display = 'block');

    // Ініціалізуємо додаток
    styleCityCards();
    setupEventListeners();
    setupBuildingImprovement();
    updateResourcesDisplay();
    renderConstructedBuildings();
    renderAllBlueprints();

    if (!eventListenersAdded) {
      setupBuildButtons();
      eventListenersAdded = true;
    }
  });
});
// Початкові дані ресурсів
let cityResources = {
  budget: 2440000000,
  materials: 84500,
  workers: 1230
};

// Дані про будівлі
const buildingsData = [
  {
    name: "Житловий комплекс",
    category: "housing",
    cost: 2000000,
    materials: 800,
    workers: 70,
    image: "House.jpg",
    improvedImage: "House-improved.jpg",
    improvementCost: 500000,
    improvementMaterials: 300,
    improved: false,
    buildTime: "2 роки"
  },
  {
    name: "Офісний центр",
    category: "commercial",
    cost: 8000000,
    materials: 1000,
    workers: 200,
    image: "office.jpg",
    improvedImage: "office-improved.jpg",
    improvementCost: 2000000,
    improvementMaterials: 400,
    improved: false,
    buildTime: "3 роки"
  },
  {
    name: "Лікарня",
    category: "infrastructure",
    cost: 5000000,
    materials: 1200,
    workers: 150,
    image: "Hospital.jpg",
    improvedImage: "Hospital-improved.jpg",
    improvementCost: 1250000,
    improvementMaterials: 500,
    improved: false,
    buildTime: "4 роки"
  },
  {
    name: "Школа",
    category: "education",
    cost: 1500000,
    materials: 600,
    workers: 90,
    image: "school.jpg",
    improvedImage: "school-improved.jpg",
    improvementCost: 375000,
    improvementMaterials: 200,
    improved: false,
    buildTime: "1.5 роки"
  },
  {
    name: "Торговий центр",
    category: "commercial",
    cost: 10000000,
    materials: 1500,
    workers: 250,
    image: "TC.jpg",
    improvedImage: "TC-improved.png",
    improvementCost: 2500000,
    improvementMaterials: 600,
    improved: false,
    buildTime: "5 років"
  },
  {
    name: "Парк",
    category: "infrastructure",
    cost: 800000,
    materials: 400,
    workers: 50,
    image: "park.jpg",
    improvedImage: "park-improved.jpg",
    improvementCost: 200000,
    improvementMaterials: 150,
    improved: false,
    buildTime: "1 рік"
  },
  {
    name: "Спорткомплекс",
    category: "infrastructure",
    cost: 3200000,
    materials: 900,
    workers: 110,
    image: "sport.jpg",
    improvedImage: "sport-improved.jpg",
    improvementCost: 800000,
    improvementMaterials: 300,
    improved: false,
    buildTime: "2.5 роки"
  },
  {
    name: "Транспортний вузол",
    category: "infrastructure",
    cost: 4500000,
    materials: 1100,
    workers: 180,
    image: "busStop.jpg",
    improvedImage: "busStop-improved.jpg",
    improvementCost: 1125000,
    improvementMaterials: 400,
    improved: false,
    buildTime: "3 роки"
  },
  {
    name: "Індустріальна зона",
    category: "commercial",
    cost: 6000000,
    materials: 1300,
    workers: 220,
    image: "build.png",
    improvedImage: "build-improved.jpg",
    improvementCost: 1500000,
    improvementMaterials: 500,
    improved: false,
    buildTime: "4 роки"
  }
];

let constructedBuildings = [];
let eventListenersAdded = false;
function styleCityCards() {
  document.querySelectorAll('.city-card').forEach(card => {
    // Існуючі стилі
    card.style.transition = 'transform 0.3s, box-shadow 0.3s';
    card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

    // Нова логіка кольорів категорій
    const category = card.dataset.category;
    const colors = {
      housing: '#e3f2fd',
      commercial: '#f0f4c3',
      infrastructure: '#ffcdd2',
      education: '#c8e6c9'
    };
    card.style.backgroundColor = colors[category] || '#fff';
  });
}

// Ініціалізація сторінки
document.addEventListener('DOMContentLoaded', () => {
  styleCityCards();
  setupEventListeners();
  setupBuildingImprovement();
  updateResourcesDisplay();
  renderConstructedBuildings();
  renderAllBlueprints();

  if (!eventListenersAdded) {
    setupBuildButtons();
    eventListenersAdded = true;
  }
});

// Стилізація карток міста
function styleCityCards() {
  document.querySelectorAll('.city-card').forEach(card => {
    card.style.transition = 'transform 0.3s, box-shadow 0.3s';
    card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  });
}

// Налаштування основних подій
function setupEventListeners() {
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      document.querySelectorAll('.container').forEach(page => {
        page.style.display = 'none';
      });
      document.querySelector(targetId).style.display = 'block';
    });
  });

  // Пошук будівель
  document.querySelector('.search-input').addEventListener('input', (e) => {
    filterBlueprints(e.target.value.toLowerCase());
  });

  // Фільтр категорій
  document.querySelector('.category-filter').addEventListener('change', (e) => {
    filterBlueprintsByCategory(e.target.value);
  });
}

// Функція покращення будівель
function setupBuildingImprovement() {
  document.querySelectorAll('.city-card').forEach((card, index) => {
    const improveBtn = document.createElement('button');
    improveBtn.className = 'improve-btn';
    improveBtn.textContent = "Покращити";

    const building = constructedBuildings[index];

    if(building?.improved) {
      improveBtn.disabled = true;
      improveBtn.textContent = "Вже покращено";
    }

    improveBtn.addEventListener('click', () => {
      if(canImproveBuilding(building)) {
        improveBuilding(building, card, improveBtn);
      } else {
        alert('Недостатньо ресурсів для покращення!');
      }
    });

    if(card.querySelector('.stats')) {
      card.querySelector('.stats').appendChild(improveBtn);
    }
  });
}

// Перевірка можливості покращення
function canImproveBuilding(building) {
  return building &&
    cityResources.budget >= building.improvementCost &&
    cityResources.materials >= building.improvementMaterials &&
    !building.improved;
}

// Процес покращення будівлі
function improveBuilding(building, cardElement, buttonElement) {
  cityResources.budget -= building.improvementCost;
  cityResources.materials -= building.improvementMaterials;
  building.improved = true;

  cardElement.querySelector('img').src = building.improvedImage;
  buttonElement.disabled = true;
  buttonElement.textContent = "Вже покращено";
  updateResourcesDisplay();
}

// Оновлення відображення ресурсів
function updateResourcesDisplay() {
  document.getElementById('budget-value').textContent = `${(cityResources.budget/1000000).toFixed(1)}M $`;
  document.getElementById('materials-value').textContent = cityResources.materials;
  document.getElementById('workers-value').textContent = cityResources.workers;
}

// Побудова нових будівель
function setupBuildButtons() {
  const grid = document.querySelector('.blueprint-grid');
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.build-btn');
    if (!btn) return;

    const index = btn.dataset.index;
    const blueprint = buildingsData[index];

    if (!canBuild(blueprint)) {
      alert('Недостатньо ресурсів!');
      return;
    }

    btn.disabled = true;
    buildStructure(blueprint);
    updateResourcesDisplay();
    renderConstructedBuildings();
    alert('Будівництво розпочато!');
    btn.disabled = false;
  });
}

// Перевірка можливості будівництва
function canBuild(blueprint) {
  return cityResources.budget >= blueprint.cost &&
    cityResources.materials >= blueprint.materials &&
    cityResources.workers >= blueprint.workers;
}

// Процес будівництва
function buildStructure(blueprint) {
  cityResources.budget -= blueprint.cost;
  cityResources.materials -= blueprint.materials;
  cityResources.workers -= blueprint.workers;

  constructedBuildings.push({
    ...blueprint,
    id: Date.now(),
    improved: false
  });
}

// Відображення побудованих будівель
function renderConstructedBuildings() {
  const container = document.querySelector('.city-grid');
  container.innerHTML = '';

  constructedBuildings.forEach((building, index) => {
    const card = document.createElement('div');
    card.className = 'city-card';
    card.innerHTML = `
      <img src="${building.improved ? building.improvedImage : building.image}" alt="${building.name}">
      <h3>${building.name}</h3>
      <div class="stats">
        ${generateBuildingStats(building)}
        <button class="improve-btn"
                data-index="${index}"
                ${building.improved ? 'disabled' : ''}>
          ${building.improved ? 'Вже покращено' : `Покращити (${building.improvementCost}$)`}
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  setupImproveButtons();
}

// Генерація статистики для будівлі
function generateBuildingStats(building) {
  return `
    <div class="stat-item"><span>Вартість:</span><span class="stat-value">${building.cost.toLocaleString()} $</span></div>
    <div class="stat-item"><span>Ресурси:</span><span class="stat-value">${building.materials.toLocaleString()}</span></div>
    <div class="stat-item"><span>Будівельники:</span><span class="stat-value">${building.workers.toLocaleString()}</span></div>
  `;
}

// Налаштування кнопок покращення
function setupImproveButtons() {
  document.querySelectorAll('.improve-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.dataset.index;
      const building = constructedBuildings[index];

      if(canImproveBuilding(building)) {
        improveBuilding(building, this.closest('.city-card'), this);
        constructedBuildings[index].improved = true;
      }
    });
  });
}

// Рендер всіх доступних будівель
function renderAllBlueprints() {
  const blueprintGrid = document.querySelector('.blueprint-grid');
  blueprintGrid.innerHTML = '';

  buildingsData.forEach((blueprint, index) => {
    const blueprintCard = document.createElement('div');
    blueprintCard.className = 'blueprint-card';
    blueprintCard.dataset.category = blueprint.category;
    blueprintCard.innerHTML = `
      <img src="${blueprint.image}" alt="${blueprint.name}">
      <div class="blueprint-info">
        <h3>${blueprint.name}</h3>
        <div class="requirements">
          ${generateRequirements(blueprint)}
        </div>
        <button class="build-btn" data-index="${index}">Побудувати</button>
        <div class="build-time">⏳ ${blueprint.buildTime}</div>
      </div>
    `;
    blueprintGrid.appendChild(blueprintCard);
  });
}

// Генерація вимог для будівництва
function generateRequirements(blueprint) {
  return `
    <div class="req-item">
      <span class="req-icon">💰</span>
      <span class="req-value">${(blueprint.cost/1000000).toFixed(1)}M $</span>
    </div>
    <div class="req-item">
      <span class="req-icon">🛠️</span>
      <span class="req-value">${blueprint.materials.toLocaleString()}</span>
    </div>
    <div class="req-item">
      <span class="req-icon">👷</span>
      <span class="req-value">${blueprint.workers.toLocaleString()}</span>
    </div>
  `;
}

// Фільтрація будівель
function filterBlueprints(searchTerm) {
  document.querySelectorAll('.blueprint-card').forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = title.includes(searchTerm) ? 'block' : 'none';
  });
}

// Фільтрація за категоріями
function filterBlueprintsByCategory(category) {
  document.querySelectorAll('.blueprint-card').forEach(card => {
    const cardCategory = card.dataset.category || 'all';
    card.style.display = (category === 'all' || cardCategory === category)
      ? 'block'
      : 'none';
  });
}
