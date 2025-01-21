import { useState, useEffect, useRef } from 'react';
import './App.css'
import { IStudent } from './types';

import Student from './components/student/student.component';
import AddForm from './components/add-form/add-form.component';
import useLocalStorage from './hooks/local-storage.hook';
import Main from './screens/Main.Screens';
import About from './screens/about.screens';
import NotFound from './screens/NotFound.screen';

function App() {
  const [ currentPage , setCurrentPage] = useState('main');

  const h1Style = { color: '#69247C', fontSize: '24px' };
  return (
    <div className="main wrapper">
      <h1 style={h1Style}>Welcome to GSG React/Next Course</h1>
      <nav>
      <button onClick={()=> setCurrentPage('main')}>Home page</button>
      <button onClick={()=> setCurrentPage('about')}> About page</button>
      </nav>
      
      {
        currentPage === 'main'
        ? <Main />

      : currentPage === 'about'
      ?  <About />   
     
      :   <NotFound />   


    }

    </div>

  )
}

export default App;