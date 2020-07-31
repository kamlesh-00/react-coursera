import React from 'react';
import {Card,CardImg,CardText,CardTitle,CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderComments({comment}){
    if (comment != null) {
        let options = { year: "numeric", month: "short", day: "numeric" };
        return comment.map(comment => (
            <ul key={comment.id} className="list-unstyled">
                <li className="mb-2">{comment.comment}</li>
                <li>
                -- {comment.author}{" "}
                {new Intl.DateTimeFormat('en-US',options).format(new Date(Date.parse(comment.date)))}
                {/* {new Date(comment.date).toLocaleDateString("en-US", options)} */}
                </li>
            </ul>
        ));
      } else return <div />;
}

function RenderDish({dish}) {
    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    else return <div />;
}

function DishDetail(props){
    
    return(
        <React.Fragment>
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div className="row">
            <div  className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                {(props.dish!=null)?<h4>Comments</h4>:null}
                <RenderComments comment={props.comment} />
            </div>
        </div>
        </React.Fragment>
    )
}

export default DishDetail;