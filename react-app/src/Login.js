import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./context/user.context";

import axios from 'axios'
axios.defaults.withCredentials = true

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {email: {}, pass: {}, status: ""}
    }

    componentDidMount(){
        console.log("Login app mounted")
    }

    componentDidUpdate(){
        console.log("Login app updated")
    }

    onEmailChange = (e) => {
        this.setState({email:e.target.value})
    }

    onPassChange = (e) => {
        this.setState({pass:e.target.value})
    }

    login(){
        axios.post("http://localhost:8080/login",
        {
            email: this.state.email,
            pass: this.state.pass,
        })
        .then( ({data}) => {
            console.log(JSON.stringify(data));
            UserContext.currentUser = {token: data.token, user: data.user};
            this.props.navigate("/");
        }).catch((err)=>{
            this.setState({status:"!!!wrong credentials!!!"})
            console.log("!!!wrong credentials!!!" + err)
        })
    }

    render(){
        return (
            <div>
              Enter email:<input onChange={this.onEmailChange} />
              <br/>
              Enter pass:<input onChange={this.onPassChange} />
              <br/>
              <button onClick={this.login.bind(this)}>Log in</button>
              <br/>{this.state.status}<br/>
            </div>
          );
    }
}

/// wrapper for using hooks for components
function WithNavigate(props) {
    let navigate = useNavigate();
    return <Login {...props} navigate={navigate} />
}

export default WithNavigate;