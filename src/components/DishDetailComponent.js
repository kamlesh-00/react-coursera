import React,{Component} from 'react';
import {Card,CardImg,CardText,CardTitle,CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Button, ModalHeader, ModalBody, Modal, FormGroup, Label, Col} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val)=>val && val.length;
const maxLength = (len)=>(val)=>!(val) || (val.length<=len);
const minLength = (len)=>(val)=>(val) && (val.length>=len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(value){
        this.toggleModal();
        this.props.addComment(this.props.dishId,value.rating,value.author,value.comment);
    }

    render(){
        return(
            <div>
            <Button color="secondary" outline onClick={this.toggleModal}>
                <span className="fa fa-pencil" /> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values=>this.handleSubmit(values))}>
                        <FormGroup row>
                            <Label htmlFor="rating" className="col-12">Rating</Label>
                            <Col>
                            <Control.select model=".rating" name="rating" md={10}
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="name" className="col-12">Your name</Label>
                            <Col md={12}>
                            <Control.text model=".author" name="author" id="author" md={10}
                                className="form-control" placeholder="Your name"
                                validators={{
                                    required,minLength: minLength(3), maxLength: maxLength(15)
                                }} />
                            <Errors className="text-danger" 
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                        <Label htmlFor="name" className="col-12">Your name</Label>
                            <Col md={12}>
                            <Control.textarea model=".comment" name="comment" md={10} rows="8"
                                className="form-control" placeholder="Write comment here"
                                 />
                            </Col>
                        </FormGroup>
                        <Button color="primary" type="submit">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

function RenderComments({comment,addComment,dishId}){
    if (comment != null) {
        let options = { year: "numeric", month: "short", day: "numeric" };
        const comments = comment.map(comment => (
            <ul key={comment.id} className="list-unstyled">
                <li className="mb-2">{comment.comment}</li>
                <li>
                -- {comment.author}{" "}
                {new Intl.DateTimeFormat('en-US',options).format(new Date(Date.parse(comment.date)))}
                {/* {new Date(comment.date).toLocaleDateString("en-US", options)} */}
                </li>
            </ul>
        ));
        return (<div>
                {comments}
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
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
                <RenderComments comment={props.comment} addComment={props.addComment}
                    dishId={props.dish.id} />
            </div>
        </div>
        </React.Fragment>
    )
}

export default DishDetail;