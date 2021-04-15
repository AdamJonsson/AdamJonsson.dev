import React from 'react';
import './App.css';
import { WelcomeView } from './components/welcome-view';
import { FindMeView } from './components/find-me-view/find-me-view';

function App() {
  return (
    <div className="App">
      <WelcomeView />
      <FindMeView />
    </div>
  );
}

export default App;
