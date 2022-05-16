import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./context/user.context";
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
            <div>
              Enter name:<input onChange={this.onNameChange} />
              <br/>
              Enter email:<input onChange={this.onEmailChange} />
              <br/>
              Enter pass:<input onChange={this.onPassChange} />
              <br/>
              <button onClick={ () => { this.register() }}>register</button>
              <br/>{this.state.status}<br/>
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