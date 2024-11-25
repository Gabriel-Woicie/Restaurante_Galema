import 'bootstrap/dist/css/bootstrap.css';
import Login from './Pages/Login';
import Container from 'react-bootstrap/Container';
import Home from './Pages/Home';
import TipoRestaurante from './Pages/TipoRestaurante';
import TipoRestauranteCad from './Pages/TipoRestauranteCad';
import Restaurante from './Pages/Restaurante';
import RestauranteCad from './Pages/RestauranteCad';
import Mesa from './Pages/Mesa';
import MesaCad from './Pages/MesaCad';
import Funcionario from './Pages/Funcionario';
import FuncionarioCad from './Pages/FuncionarioCad';
import Produto from './Pages/Produto';
import ProdutoCad from './Pages/ProdutoCad';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() { 
  return (
    <div>
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/Home' element={<Home/>} />
            <Route path='/TipoRestaurante' element={<TipoRestaurante/>} />
            <Route path='/TipoRestauranteCad' element={<TipoRestauranteCad/>} />
            <Route path='/Restaurante' element={<Restaurante/>} />
            <Route path='/RestauranteCad' element={<RestauranteCad/>} />
            <Route path='/Mesa' element={<Mesa/>} />
            <Route path='/MesaCad' element={<MesaCad/>} />
            <Route path='/Funcionario' element={<Funcionario/>} />
            <Route path='/FuncionarioCad' element={<FuncionarioCad/>} />
            <Route path='/Produto' element={<Produto/>} />
            <Route path='/ProdutoCad' element={<ProdutoCad/>} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
