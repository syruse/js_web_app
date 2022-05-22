import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./context/user.context";
import { Method, fetch } from "./utils/fetcher";

class Login extends Component {

    static contextType = UserContext;

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
        fetch("http://localhost:8080/login", "no token", Method.POST, {
            email: this.state.email,
            pass: this.state.pass,
        })
        .then( ({data}) => {
            console.log(JSON.stringify(data));
            this.context.setCurrentUser({token: data.token, user: data.data.user});
            this.props.navigate("/");
        }).catch((err)=>{
            this.setState({status:"!!!wrong credentials!!!"})
            console.log("!!!wrong credentials!!!" + err)
        })
    }

    render(){
        return (
            <div className="form-group form-group-sm">
              <input className="form-control" placeholder="enter email" onChange={this.onEmailChange} />
              <input className="form-control" placeholder="enter pass " onChange={this.onPassChange} />
              <button className="btn btn-default" onClick={this.login.bind(this)}>Log in</button>
              <button className="btn btn-default" onClick={ () => { this.props.navigate("/register"); }}>Registration</button>
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