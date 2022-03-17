import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import CurrentList from '../CurrentList/CurrentList';

library.add(fas);

function App() {
  return (
    <div className="app">
      <header className='app-header'>Курсы валют в рублях от ЦБ РФ</header>
      <CurrentList />
    </div>
  );
}

export default App;
