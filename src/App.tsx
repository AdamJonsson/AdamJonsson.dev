import React from 'react';
import './App.css';
import { WelcomeView } from './components/welcome-view';
import { AboutMeView } from './components/about-me-view/about-me-view';

function App() {
  return (
    <div className="App">
      <WelcomeView />
      <AboutMeView />
    </div>
  );
}

export default App;
