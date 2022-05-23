import { Component } from "react";
import { UserContext } from "./context/user.context";
import { Method, fetch } from "./utils/fetcher"

class Create extends Component {

    static contextType = UserContext;

    constructor(props){
        super(props)
        this.state = {model: {}, desc: {}, price: {}, status: ''}
    }

    componentDidMount(){
        console.log("Create app mounted");
        if (!this.context.currentUser && typeof this.context.currentUser.token === 'undefined') {
            console.log("Create app mounted with empty token")
            this.props.navigate("/");
        }
        console.debug("Create app mounted with token", this.context.currentUser.token)
    }

    componentDidUpdate(){
        console.log("Create app updated")
    }

    onModelChange = (e) => {
        this.setState({model:e.target.value})
    }

    onDescChange = (e) => {
        this.setState({desc:e.target.value})
    }

    onPriceChange = (e) => {
        this.setState({price:e.target.value})
    }

    createProduct(){
        fetch("http://localhost:8080/api/phones", this.context.currentUser.token, Method.POST, 
        {
            model: this.state.model,
            desc: this.state.desc,
            price: this.state.price
        })
        .then(res=>{
            this.setState({status:'Success'})
            console.log("Create ", res)
        }).catch(err=>{
            this.setState({status:'Adding new phone failed'})
            console.error("error ", err)
        })
    }

    render(){
        return (
            <div>
                <div className="form-horizontal">
                    <h2>Phone adding</h2>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Model:</label>
                        <div className="col-sm-10">
                            <input className="form-control" onChange={this.onModelChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Description:</label>
                        <div className="col-sm-10">
                            <input className="form-control" onChange={this.onDescChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Price:</label>
                        <div className="col-sm-10">
                            <input className="form-control" onChange={this.onPriceChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default" onClick={this.createProduct.bind(this)}>Create Product</button>
                        </div>
                    </div>
                </div>
                {this.state.status &&
                    <div className="modal show" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" onClick={() => { this.setState({ status: '' }) }} >&times;</button>
                                    <h4 className="modal-title">Status</h4>
                                </div>
                                <div className="modal-body">
                                    <p>{this.state.status}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => { this.setState({ status: '' }) }} >Close</button>
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </div>
          );
    }
}

export default Create;