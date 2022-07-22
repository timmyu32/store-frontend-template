import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Cart from './pages/Cart';
import MobileCart from'./pages/MobileCart';
import MobileProduct from './pages/MobileProduct';
import MobileFilterMenu from './pages/MobileFilterMenu';
import Register from './pages/Register';
import SignIn from './pages/LogIn';
//Admin Pages
import AdminHome from './pages/admin/AdminHome';
import List from './pages/admin/List';
import NewItem from './pages/admin/NewItem';
import SingleItem from './pages/admin/SingleItem';
import ShipItem from './pages/admin/ShipItem';
import OrderDetails from './pages/admin/OrderDetails'
import Redirect from './pages/admin/Redirect'
import ModifyProduct from './pages/admin/ModifyProduct'
import NewDiscount from './pages/admin/NewDiscount'
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const user = useSelector(state => state.user);
  // console.log(user)
  // const x = user.currentUser.user?.isAdmin != undefined
  // console.log(x)
  const mql = window.matchMedia('(max-width: 480px)');

  let mobileView = mql.matches;


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path='/products' exact element={<ProductList />} />
          {mobileView ?
          <Route path='/product/:id' exact element={<MobileProduct/>} /> :
          <Route path='/product/:id' exact element={<Product/>} /> 
          }
          
          {mobileView ?
          <Route path='/cart' exact element={<MobileCart />} /> :
          <Route path='/cart' exact element={<Cart />} /> }
          {user.currentUser && user.currentUser.message == 'user logged in' ?
          <Route path='/login' exact element={<Home />} />
          :
          <Route path='/login' exact element={<SignIn />} />
          }
          <Route path='/register' exact element={<Register type={'regular'}/>} />
          <Route path='/register/admin' exact element={<Register type={'admin'}/>} />
          <Route path='/search/:term' exact element={<ProductList />} />
          <Route path='/mobile-menu' exact element={<MobileFilterMenu />} />

          {user.currentUser && user.currentUser.user?.isAdmin == true ?
          <>
          <Route path='/admin' exact element={<AdminHome/>} />
          <Route path='/admin/list/:listType' exact element={<List/>} />
          <Route path='/admin/redirect/:listType' exact element={<Redirect/>} />
          <Route path='/admin/new-item' exact element={<NewItem/>} />
          <Route path='/admin/single-item' exact element={<SingleItem/>} />
          <Route path='/admin/add-shipping/:orderID' exact element={<ShipItem/>} />
          <Route path='/admin/order/:orderID' exact element={<OrderDetails/>} />
          <Route path='/admin/modify/:productID' exact element={<ModifyProduct/>} />
          <Route path='/admin/discounts' exact element={<NewDiscount/>} />
          
          </>
            :
            <></>
          }

        </Routes>
      </div>
    </Router>
  );
}

export default App;
