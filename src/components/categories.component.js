import React from 'react';
import Table from '../Table';
import '../App.css';
import {Navigate} from "react-router-dom";
import CategoriesService from "../services/categories.service";

export default class CategoriesComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      ready: false,
      categories: []
    };
  }
  async componentDidMount() {
    try {
      const response = await CategoriesService.getAllCategories();
      if (!response) {
        this.setState({ redirect: "/home" });
      } else {
        console.log(response)
        this.setState({ categories: response.data, ready: true });
      }
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const { categories, ready } = this.state;
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
    if(ready)
    {
      return (

        <div className="container">
          <h1 className="d-flex justify-content-center">Categories</h1>
          <Table theadData={getHeadings()} tbodyData={formatCategoriesData()}/>
        </div>
      );
    }
  }
}