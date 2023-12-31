
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss'

import {Routes, Route} from 'react-router-dom'


import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';


function App() {
  return (
          <Routes>
             <Route path='/' element={<MainLayout />}>
              <Route path='' element={<Home />}/>
              <Route path='cart' element={<Cart />} />
              <Route path='pizza/:pizzaId' element={<FullPizza />} />
              <Route path='*' element={<NotFound />} />
             </Route>
          </Routes> 
  );
}

export default App;
