import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import CityMap from './components/CityMap';
import Construction from './components/Construction';
import Resources from './components/Resources';
import Welcome from './components/Welcome';

// Building images for different levels
const buildingImages = {
  'Житловий комплекс': [
    '/images/house.jpg',
    '/images/house-improved.jpg'
  ],
  'Офісний центр': [
    '/images/office.jpg',
    '/images/office-improved.jpg'
  ],
  'Лікарня': [
    '/images/hospital.jpg',
    '/images/hospital-improved.jpg'
  ],
  'Школа': [
    '/images/school.jpg',
    '/images/school-improved.jpg'
  ],
  'Парк': [
    '/images/park.jpg',
    '/images/park-improved.jpg'
  ],
  'Спорткомплекс': [
    '/images/sport.jpg',
    '/images/sport-improved.jpg'
  ],
  'Транспортний вузол': [
    '/images/busStop.jpg',
    '/images/busStop-improved.jpg'
  ],
  'Індустріальна зона': [
    '/images/build.jpg',
    '/images/build-improved.jpg'
  ]
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cityData, setCityData] = useState({
    buildings: [],
    budget: 100000000,
    materials: 50000,
    workers: 10000
  });

  const buildingTypes = [
    {
      name: 'Житловий комплекс',
      image: '/images/house.jpg',
      cost: 500000,
      workers: 200,
      resources: 200,
      level: 1,
      satisfaction: 15,
      description: 'Комфортне житло підвищує задоволеність жителів'
    },
    {
      name: 'Офісний центр',
      image: '/images/office.jpg',
      cost: 1000000,
      workers: 250,
      resources: 250,
      level: 1,
      satisfaction: 10,
      description: 'Створює робочі місця та розвиває інфраструктуру'
    },
    {
      name: 'Лікарня',
      image: '/images/hospital.jpg',
      cost: 800000,
      workers: 300,
      resources: 300,
      level: 1,
      satisfaction: 25,
      description: 'Значно покращує якість життя та здоров\'я жителів'
    },
    {
      name: 'Школа',
      image: '/images/school.jpg',
      cost: 400000,
      workers: 150,
      resources: 150,
      level: 1,
      satisfaction: 20,
      description: 'Забезпечує освіту та розвиток молоді'
    },
    {
      name: 'Парк',
      image: '/images/park.jpg',
      cost: 100000,
      workers: 100,
      resources: 100,
      level: 1,
      satisfaction: 30,
      description: 'Місце відпочинку та дозвілля, значно підвищує задоволеність'
    },
    {
      name: 'Спорткомплекс',
      image: '/images/sport.jpg',
      cost: 600000,
      workers: 150,
      resources: 200,
      level: 1,
      satisfaction: 20,
      description: 'Сприяє здоровому способу життя та активному відпочинку'
    },
    {
      name: 'Транспортний вузол',
      image: '/images/busStop.jpg',
      cost: 1000000,
      workers: 300,
      resources: 300,
      level: 1,
      satisfaction: 15,
      description: 'Покращує мобільність та доступність міста'
    },
    {
      name: 'Індустріальна зона',
      image: '/images/build.png',
      cost: 1500000,
      workers: 400,
      resources: 500,
      level: 1,
      satisfaction: -50,
      description: 'Створює багато робочих місць, але значно знижує задоволеність через забруднення та шум'
    }
  ];

  const calculateUpgradeCost = (building) => {
    if (!building) return null;
    return {
      resources: Math.floor(building.resources * 0.5),
      workers: Math.floor(building.workers * 0.3),
      budget: Math.floor(building.resources * 1000)
    };
  };

  const handleBuild = (building) => {
    if (!building) return;

    const resourceCost = Math.floor(building.resources * 0.3);
    const workersCost = Math.floor(building.workers * 0.2);

    if (
      cityData.budget >= building.cost &&
      cityData.materials >= resourceCost &&
      cityData.workers >= workersCost
    ) {
      setCityData(prev => ({
        ...prev,
        buildings: [...prev.buildings, {
          ...building,
          id: Date.now(),
          constructionDate: new Date().toISOString(),
          level: 1,
          maxLevel: 2,
          income: Math.floor(building.cost * 0.1),
          satisfaction: building.satisfaction,
          description: building.description,
          upgradeCost: building.cost * 0.5,
          upgradeMaterialCost: building.resources * 0.5,
          image: buildingImages[building.name][0]
        }],
        budget: prev.budget - building.cost,
        materials: prev.materials - resourceCost,
        workers: prev.workers - workersCost
      }));

      navigate('/city');
    } else {
      alert('Недостатньо ресурсів для будівництва!');
    }
  };

  const handleUpgrade = (buildingId) => {
    const buildingIndex = cityData.buildings.findIndex(b => b.id === buildingId);
    const building = cityData.buildings[buildingIndex];
    
    if (buildingIndex === -1 || !building) {
      alert('Помилка: будівля не знайдена!');
      return;
    }

    if (building.level >= 2) {
      alert('Будівля вже має максимальний рівень!');
      return;
    }

    const nextLevel = building.level + 1;
    
    const upgradeCost = {
      resources: building.upgradeMaterialCost || 50,
      workers: 50,
      budget: building.upgradeCost || 50000
    };

    if (
      cityData.materials >= upgradeCost.resources &&
      cityData.workers >= upgradeCost.workers &&
      cityData.budget >= upgradeCost.budget
    ) {
      setCityData(prev => {
        const updatedBuildings = [...prev.buildings];
        
        updatedBuildings[buildingIndex] = {
          ...building,
          level: nextLevel,
          image: buildingImages[building.name][nextLevel - 1],
          resources: Math.floor(building.resources * 1.2),
          workers: Math.floor(building.workers * 1.2),
          income: Math.floor(building.income * 1.5),
          satisfaction: Math.floor(building.satisfaction * 1.2),
          upgradeCost: Math.floor(building.upgradeCost * 1.5),
          upgradeMaterialCost: Math.floor(building.upgradeMaterialCost * 1.3)
        };

        return {
          ...prev,
          buildings: updatedBuildings,
          materials: prev.materials - upgradeCost.resources,
          workers: prev.workers - upgradeCost.workers,
          budget: prev.budget - upgradeCost.budget
        };
      });
    } else {
      alert(
        'Недостатньо ресурсів для покращення будівлі!\n\n' +
        'Необхідно:\n' +
        '- Ресурсів: ' + upgradeCost.resources + ' (маєте: ' + cityData.materials + ')\n' +
        '- Робітників: ' + upgradeCost.workers + ' (маєте: ' + cityData.workers + ')\n' +
        '- Бюджету: ' + upgradeCost.budget + ' (маєте: ' + cityData.budget + ')'
      );
    }
  };

  const getActiveTab = () => {
    switch (location.pathname) {
      case '/city':
        return 'city';
      case '/construction':
        return 'construction';
      case '/resources':
        return 'resources';
      default:
        return 'welcome';
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            City Control Simulator
          </h1>
        </div>
        
        <div className="header-right">
          <nav className="nav-tabs">
            <button 
              className={getActiveTab() === 'city' ? 'active' : ''} 
              onClick={() => navigate('/city')}
            >
              🏙️ Моє місто
            </button>
            <button 
              className={getActiveTab() === 'construction' ? 'active' : ''} 
              onClick={() => navigate('/construction')}
            >
              🏗️ Будівництво
            </button>
            <button 
              className={getActiveTab() === 'resources' ? 'active' : ''} 
              onClick={() => navigate('/resources')}
            >
              💰 Ресурси міста
            </button>
          </nav>

          <div className="user-profile">
            <button className="profile-button">
              👤
            </button>
            <div className="profile-dropdown">
              <button className="logout-button">
                Вийти з акаунту
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route 
            path="/city" 
            element={
              <CityMap 
                buildings={cityData.buildings} 
                onUpgrade={handleUpgrade}
                cityResources={cityData}
              />
            } 
          />
          <Route 
            path="/construction" 
            element={
              <Construction 
                buildingTypes={buildingTypes}
                onBuild={handleBuild}
                cityResources={{
                  budget: cityData.budget,
                  materials: cityData.materials,
                  workers: cityData.workers
                }}
              />
            } 
          />
          <Route 
            path="/resources" 
            element={
              <Resources 
                budget={cityData.budget}
                materials={cityData.materials}
                workers={cityData.workers}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
