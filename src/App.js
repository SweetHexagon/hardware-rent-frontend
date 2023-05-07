import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  Routes,
  NavLink,
  HashRouter
} from "react-router-dom";
import Products from "./Products";
import Categories from "./Categories";
import Orders from "./Orders";

function App() {

  return (
    <HashRouter>
      <h1 className="text-center" >Hardware Rent</h1>
      <div className="list-group list-group-horizontal">
         <NavLink to="/products" className="list-group-item list-group-item-action ">Products</NavLink>

          <NavLink to="/categories" className="list-group-item list-group-item-action ">Categories</NavLink>

          <NavLink to="/orders" className="list-group-item list-group-item-action ">Orders</NavLink>
      </div>

      <div className="content">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </HashRouter>

  );
}

export default App;
