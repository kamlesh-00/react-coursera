import React, { Component } from 'react';
import Menu from  './MenuComponent';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';

import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish});
  }

  render(){

    const HomePage = ()=>{
      return(
        <Home 
          dish={this.state.dishes.filter((dish)=>dish.featured)[0]} 
          promotion={this.state.promotions.filter((promo)=>promo.featured)[0]} 
          leader={this.state.leaders.filter((leaders)=>leaders.featured)[0]} />
      );
    }

    const DishWithId = ({match})=>{
      return(
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
         comment={this.state.comments.filter((comments)=>comments.dishId===parseInt(match.params.dishId,10))} />
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
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path='/contactus' component={Contact} />
          <Redirect to='/home'/>
        </Switch>
        </div>
      <Footer />
    </div>
  );
  }
}

export default Main;