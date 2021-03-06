import React, { Component } from 'react';
import Menu from  './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';

import About from './AboutComponent';

import {connect} from 'react-redux';
import {addComment, fetchDishes} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state=>{
    return{
      dishes:state.dishes,
      comments:state.comments,
      leaders:state.leaders,
      promotions:state.promotions
    }
}

const mapDispatchToProps = (dispatch)=>({
  addComment: (dishId,rating,author,comment)=>dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes: ()=>{dispatch(fetchDishes())},
  resetFeedbackForm: ()=>{dispatch(actions.reset('feedback'))}
});

class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish});
  }

  render(){

    const HomePage = ()=>{
      return(
        <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo)=>promo.featured)[0]} 
          leader={this.props.leaders.filter((leaders)=>leaders.featured)[0]} />
      );
    }

    const DishWithId = ({match})=>{
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comment={this.props.comments.filter((comments)=>comments.dishId===parseInt(match.params.dishId,10))}
          addComment={this.props.addComment} />
      );
    }

    const MenuPage = ()=>{
      return(
        <Menu dishes={this.props.dishes}/>
      )
    }

    const AboutUs = ()=>{
      return(
        <About leaders={this.props.leaders}/>
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
          <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route exact path='/aboutus' component={AboutUs} />
          <Redirect to='/home'/>
        </Switch>
        </div>
      <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));