import React from 'react';
// import { Media } from 'reactstrap';
import {Card,CardImg,CardImgOverlay,CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';

function Menu(props) {

  const menu = props.dishes.dishes.map((dish) => {
    return (
      <div  className="col-12 col-md-5 m-1" key={dish.id}>
        <Card>
          <Link to={`/menu/${dish.id}`}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
          </Link>
        </Card>
      </div>
    );
  });

  if(props.dishes.isLoading){
    return (
      <Loading />
    );
  }else if(props.dishes.err){
    return(
      <h4>{props.dishes.err}</h4>
    );
  }else{
  return (
    <React.Fragment>
    <div className="row">
      <Breadcrumb>
        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
        <BreadcrumbItem active>Menu</BreadcrumbItem>
      </Breadcrumb>
      <div className="col-12">
        <h3>Menu</h3>
        <hr />
      </div>
    </div>
    <div className="row">
      {menu}
    </div>
    </React.Fragment>
  );
  }
}

export default Menu;