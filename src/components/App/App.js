import './App.css';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrentList from '../CurrentList/CurrentList';
import ArchiveList from '../ArchiveList/ArchiveList'

library.add(fas);

function App() {
  return (
    <Router>
      <div className="app">
        <header className='app-header'>Курсы валют в рублях от ЦБ РФ</header>
        <Routes>
          <Route path='/' element={<CurrentList />} />
          <Route path='/archive' element={<ArchiveList />}>
            <Route path=':itemId' element={<ArchiveList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
