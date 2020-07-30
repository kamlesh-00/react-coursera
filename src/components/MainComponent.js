import React, { Component } from 'react';
import Menu from  './MenuComponent';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import Home from './HomeComponent';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      dishes: DISHES
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish});
  }

  render(){

    const HomePage = ()=>{
      return(
        <Home />
      );
    }

    const MenuPage = ()=>{
      return(
        <Menu dishes={this.state.dishes}/>
      )
    }

    return (
    <div>
      <Header />
        <div className="container">
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={MenuPage} />
          <Redirect to='/home'/>
        </Switch>
        </div>
      <Footer />
    </div>
  );
  }
}

export default Main;