import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import './App.css';

import compostableImage from './assets/compostable.png';
import recyclableImage from './assets/recyclable.png';
import mixedImage from './assets/mixed-paper.png';
import landfillImage from './assets/landfill.png';

type WasteCategory = 'compostable' | 'recyclable' | 'mixed' | 'landfill' | null;

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'result'>('home');
  const [wasteCategory, setWasteCategory] = useState<WasteCategory>(null);
  const [scannedItem, setScannedItem] = useState<string>('');

  const handleStartScan = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          // // Replace this URL with your actual API endpoint
          // const response = await fetch('https://api.example.com/upload', {
          //   method: 'PUT',
          //   body: formData,
          // });

          // const result = await response.json();

          // // Assuming the API returns this format: ["object_name: object_name", "bin_type: guesstimate_bin"]
          // const objectName = result[0].split(': ')[1]; // Extracts the object name
          // const binType = result[1].split(': ')[1]; // Extracts the bin type

          // setScannedItem(objectName);
          setScannedItem("TEST3");

          // Map the binType to waste categories in your app
          const binCategoryMap: Record<string, WasteCategory> = {
            compost: 'compostable',
            recycle: 'recyclable',
            mixed: 'mixed',
            landfill: 'landfill',
          };

          // setWasteCategory(binCategoryMap[binType.toLowerCase()] || null);
          setWasteCategory('landfill');
          setCurrentScreen('result');
        } catch (error) {
          console.error('Error uploading image:', error);
          setWasteCategory(null); // Reset if there's an error
        }
      }
    };
    input.click();
  };

  const getCategoryData = (category: WasteCategory) => {
    switch (category) {
      case 'compostable':
        return {
          color: '#a8e0a8',
          title: 'COMPOSTABLES',
          message: 'AI models are still learning—double-check that your item is compostable before tossing it in the green bin! Let\'s keep the planet green together!',
        };
      case 'recyclable':
        return {
          color: '#a8c8e0',
          title: 'RECYCLABLES',
          message: 'Remember: Empty food scraps, avoid Styrofoam, and clean your containers before recycling!',
        };
      case 'mixed':
        return {
          color: '#e0dca8',
          title: 'MIXED PAPER',
          message: 'Double-check your paper—if it\'s food-soiled, toss it in the green bin for compost, not yellow bin!',
        };
      case 'landfill':
        return {
          color: '#c0c0c0',
          title: 'LANDFILL WASTE',
          message: 'Remember: Empty food scraps, avoid Styrofoam, and clean your containers before recycling!',
        };
      default:
        return {
          color: '#ffffff',
          title: 'UNKNOWN',
          message: 'Unable to categorize this item.',
        };
    }
  };

  const getCategoryImage = (category: WasteCategory) => {
    switch (category) {
      case 'compostable':
        return compostableImage;
      case 'recyclable':
        return recyclableImage;
      case 'mixed':
        return mixedImage;
      case 'landfill':
        return landfillImage;
      default:
        return undefined;
    }
  };

  return (
    <div className="app-container">
      {currentScreen === 'home' ? (
        <div className="home-screen">
          <div className="app-title">WASTEWISE</div>
          <button onClick={handleStartScan} className="scan-button">
            START SCAN
          </button>
          <div style={{ height: '5rem' }}></div>
        </div>
      ) : (
        <div className={`result-screen bg-${wasteCategory}`}>
          <button onClick={() => setCurrentScreen('home')} className="back-button">
            <ChevronLeft size={24} />
          </button>
          <div className="item-title">Your item:</div>
          <div className="item-name">{scannedItem.toUpperCase()}</div>
          <div className="category-box">
          <img
                src={getCategoryImage(wasteCategory)}
                alt={wasteCategory || 'unknown category'}
                style={{ width: '100%', height: '100%', borderRadius: '1.5rem', objectFit: 'cover' }}
              />
          </div>
          <div className="info-box">
            <p>{getCategoryData(wasteCategory).message}</p>
          </div>
          <div className="button-container">
            <button className="action-button">Learn more</button>
            <button className="action-button">Spot an issue? Let us know</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
