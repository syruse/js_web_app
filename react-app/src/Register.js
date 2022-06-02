import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { Method, fetch } from "./utils/fetcher";

class Register extends Component {

    constructor(props){
        super(props)
        this.state = {name: {}, email: {}, pass: {}, status: ""}
    }

    componentDidMount(){
        console.log("Register app mounted")
    }

    componentDidUpdate(){
        console.log("Register app updated")
    }

    onNameChange = (e) => {
        this.setState({name:e.target.value})
    }

    onEmailChange = (e) => {
        this.setState({email:e.target.value})
    }

    onPassChange = (e) => {
        this.setState({pass:e.target.value})
    }

    register(){
        fetch("http://localhost:8080/register", "no token", Method.POST, {
            email: this.state.email,
            pass: this.state.pass,
            name: this.state.name,
        })
        .then( ({data}) => {
            console.log(JSON.stringify(data));
            this.props.navigate("/login");
        }).catch((err)=>{
            this.setState({status:"Couldn't register :("})
            console.log("Couldn't register " + err)
        })
    }

    render(){
        return (
            <div className="form-horizontal">
              <h2>Registration</h2>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Name:</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" onChange={this.onNameChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" onChange={this.onEmailChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                <div className="col-sm-10">          
                    <input type="password" className="form-control" onChange={this.onPassChange} />
                </div>
              </div>
              <div className="form-group">        
                <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-default" onClick={ () => { this.register() }}>register</button>
                </div>
                <br/>{this.state.status}<br/>
              </div>
            </div>
          );
    }
}

/// wrapper for using hooks for components
function WithNavigate(props) {
    let navigate = useNavigate();
    return <Register {...props} navigate={navigate} />
}

export default WithNavigate;