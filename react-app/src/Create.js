import { Component } from "react";
import { UserContext } from "./context/user.context";
import { Method, fetch } from "./utils/fetcher"

class Create extends Component {

    static contextType = UserContext;

    constructor(props){
        super(props)
        this.state = {model: {}, desc: {}, price: {}}
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
            console.log("Create ", res)
        }).catch(err=>{
            console.error("error ", err)
        })
    }

    render(){
        return (
            <div>
              Model: <input onChange={this.onModelChange} />
              <br/>
              Description: <input onChange={this.onDescChange} />
              <br/>
              Price: <input onChange={this.onPriceChange} />
              <br/>
              <button onClick={this.createProduct.bind(this)}>Create Product</button>
              <br/>
            </div>
          );
    }
}

export default Create;