import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Register from './pages/Register';
import SignIn from './pages/LogIn';
import Success from './pages/Success';
import Pay from './pages/Pay';
import { useDispatch, useSelector } from 'react-redux';



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const user = useSelector(state => state.user);


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path='/products' exact element={<ProductList />} />
          <Route path='/product/:id' exact element={<Product/>} />
          <Route path='/cart' exact element={<Cart />} />
          {user.currentUser && user.currentUser.message == 'user logged in' ?
          <Route path='/login' exact element={<Home />} />
          :
          <Route path='/login' exact element={<SignIn />} />
          }
          <Route path='/register' exact element={<Register type={'regular'}/>} />
          <Route path='/register/admin' exact element={<Register type={'admin'}/>} />
          <Route path='/search/:term' exact element={<ProductList />} />
          <Route path='/success' exact element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
