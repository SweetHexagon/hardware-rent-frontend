import React from 'react';
import Table from '../Table';
import '../App.css';
import {Navigate} from "react-router-dom";
import categoryService from "../services/categories.service";
import {Alert} from "react-bootstrap";

export default class CategoriesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
      redirect: null,
      ready: false,
      errorMessage: undefined,
      categories: []
    };
  }
  componentDidMount() {

      categoryService.getAllCategories().then((response)=>{
        this.setState({ categories: response.data});
      }).catch( (error)=>{
        this.setState({errorMessage: error.message});
      });
  }
  deleteCategory(id) {
    categoryService.deleteCategory(id).then(
      ()=>{window.location.reload();}
    ).catch((error)=>{
      this.setState({errorMessage: error.message});
    });
  }



  render() {
    const { categories, errorMessage } = this.state;
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    const getHeadings = () => {
      return Object.keys(categories[0]);
    }
    const formatCategoriesData = () => {
      let modifiedData = JSON.parse(JSON.stringify(categories));
      return modifiedData;
    }

      return (

        <div className="container">
          <h1 className="d-flex justify-content-center">Categories</h1>
          {categories.length>0?(
            <Table theadData={getHeadings()} tbodyData={formatCategoriesData()} onDelete={this.deleteCategory}/>
          ):(
            <h2>No data</h2>
          )}
          {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}

        </div>
      );
  }
}