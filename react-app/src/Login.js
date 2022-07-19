import { Component } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "./context/user.context";
import { Method, fetch } from "./utils/fetcher";

class Login extends Component {

    static contextType = UserContext;

    constructor(props){
        super(props)
        this.state = {email: {}, pass: {}, isNOKpopup: false}
    }

    componentDidMount(){
        console.debug("Login app mounted")
    }

    componentDidUpdate(){
        console.debug("Login app updated")
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
            console.debug(JSON.stringify(data));
            this.context.setCurrentUser({token: data.token, user: data.data.user});
            this.setState({isNOKpopup:false})
            this.props.navigate("/");
        }).catch((err)=>{
            this.setState({isNOKpopup:true})
            console.debug("!!!wrong credentials!!!" + err)
        })
    }

    render(){
        return (
            <div>
                <div className="form-group form-group-sm">
                    <input className="form-control" placeholder="enter email" onChange={this.onEmailChange} />
                    <input className="form-control" placeholder="enter pass " onChange={this.onPassChange} />
                    <button className="btn btn-success btn-xs btn-block" onClick={this.login.bind(this)}>Log in</button>
                    <button className="btn btn-primary btn-xs btn-block" onClick={() => { this.props.navigate("/register"); }}>Registration</button>
                    <br />{this.state.isNOKpopup}<br />
                </div>
                { this.state.isNOKpopup &&
                <div className="modal show" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" onClick={() => { this.setState({isNOKpopup:false}) }} >&times;</button>
                                <h4 className="modal-title">Login</h4>
                            </div>
                            <div className="modal-body">
                                <p>!!!wrong credentials!!!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => { this.setState({isNOKpopup:false}) }} >Close</button>
                            </div>
                        </div>

                    </div>
                </div>
                }
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