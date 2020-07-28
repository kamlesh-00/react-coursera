import React, { Component } from 'react';
import {Card,CardImg,CardText,CardTitle,CardBody} from 'reactstrap';

class DishDetail extends Component{
    renderDish(dish) {
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
        else
            return(
                <div></div>
            )
    }

    renderComments(dish){
            if (dish != null) {
                let options = { year: "numeric", month: "short", day: "numeric" };
                return dish.comments.map(comment => (
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

    render(){
        return(
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {(this.props.dish!=null)?<h4>Comments</h4>:null}
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        )
    }
}

export default DishDetail;