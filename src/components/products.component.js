import React from 'react';
import Table from '../Table';
import '../App.css';
import {Navigate} from "react-router-dom";
import ProductsService from "../services/products.service";

export default class ProductsComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      ready: false,
      products: []
    };
  }
  async componentDidMount() {
    try {
      const response = await ProductsService.getAllProducts();
      if (!response) {
        this.setState({ redirect: "/home" });
      } else {
        this.setState({ products: response.data, ready: true });
      }
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const { products, ready } = this.state;
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    const getHeadings = () => {
      return Object.keys(products[0]);
    }
    const formatProductsData = () => {
      let modifiedData = JSON.parse(JSON.stringify(products));
      modifiedData.map(row => {
        row["category"] = row["category"]["categoryName"]
      })
      return modifiedData;
    }
    if(ready)
    {
      return (
        <div className="container">
          <h1 className="d-flex justify-content-center">Products</h1>
          <Table theadData={getHeadings()} tbodyData={formatProductsData()}/>
        </div>
      );
    }
  }
}