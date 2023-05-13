import React from 'react';
import Table from '../Table';
import '../App.css';
import {Navigate} from "react-router-dom";
import ProductsService from "../services/products.service";
import productsService from "../services/products.service";
import {Alert} from "react-bootstrap";

export default class ProductsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);


    this.state = {
      redirect: null,
      products: [],
      errorMessage: undefined
    };
  }
   componentDidMount() {
      ProductsService.getAllProducts().then((response)=>{
        this.setState({ products: response.data});
      }).catch( (error)=>{
        this.setState({errorMessage: error.message});
      });
  }
  deleteProduct(id) {
    productsService.deleteProduct(id).then(
      ()=>{window.location.reload();}
    ).catch((error)=>{
      this.setState({errorMessage: error.message});
    });
  }

  render() {
    const { products, errorMessage} = this.state;
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    const getHeadings = () => {
      return Object.keys(products[0]);
    }
    const formatProductsData = () => {
      let modifiedData = JSON.parse(JSON.stringify(products));
      return modifiedData;
    }


      return (

        <div className="container">
          <h1 className="d-flex justify-content-center">Products</h1>
          {products.length>0?(
            <Table theadData={getHeadings()} tbodyData={formatProductsData()} onDelete={this.deleteProduct}/>
          ):(
            <h2>No data</h2>
          )}
          {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}

        </div>
      );

  }
}