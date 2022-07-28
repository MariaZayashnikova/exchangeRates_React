import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HashRouter, Route, Routes } from 'react-router-dom';
import CurrentList from '../CurrentList/CurrentList';
import ArchiveList from '../ArchiveList/ArchiveList';
import './App.css';

library.add(fas);

function App() {
  return (
    <HashRouter>
      <div className="app">
        <header className='app-header'>Курсы валют в рублях от ЦБ РФ</header>
        <Routes>
          <Route path='/' element={<CurrentList />} />
          <Route path='/archive' element={<ArchiveList />}>
            <Route path=':itemId' element={<ArchiveList />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
