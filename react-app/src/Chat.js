import { Component } from "react";
import { UserContext } from "./context/user.context";
import {typeMsg} from './utils/grpcClient';
import serverAvatar from './server_avatar.png';
import userAvatar from './user_avatar.png';

class Chat extends Component {

    static contextType = UserContext;

    constructor(props){
        super(props)
        this.state = {msges: []}
        this.request = undefined;
    }

    type() {

        // no need to send if requst is empty
        if (!this.request) {
            return
        }

        const new_msges = this.state.msges;
        new_msges.push({userOwner: true, msg: this.request});
        this.setState({msges: new_msges});

        typeMsg( this.context.currentUser?.user || "potential client", this.request, this.context.currentUser?.token || "dummy", (isOk, reply) => {
            if (!isOk) {
              console.error("chat broken ", reply);
            } else {
              console.debug("repply of consultant ", reply);
              const new_msges = this.state.msges;
              new_msges.push({userOwner: false, msg: reply});
              this.setState({msges: new_msges});
            }
            // reset request
            this.request = undefined;
        });
    }

    componentDidMount(){
        console.debug("Chat app mounted");
    }

    componentDidUpdate(){
        console.debug("Chat app updated");
    }

    onTyped = (e) => {
        this.request = e.target.value
    }

    render(){
        return (
            <div className="container">
                {this.state.msges.map(msg => (
                    [
                        <div className="media">
                            {
                                msg.userOwner ?
                                    <div className="media-right">
                                        <img src={userAvatar} className="media-object" style={{ width: '60px', height: '60px' }} alt="icon" />
                                    </div>
                                    :
                                    <div className="media-left">
                                        <img src={serverAvatar} className="media-object" style={{ width: '60px', height: '60px' }} alt="icon" />
                                    </div>
                            }
                            <div className="media-body">
                                <h4 className="media-heading text-primary">{msg.userOwner ? "You" : "Server"}</h4>
                                <p className="well well-sm text-primary">{msg.msg}</p>
                            </div>
                        </div>
                    ]))
                }
                <div className="chat col-sm-4 col-sm-offset-4">
                    <input className="well well-sm text-primary" placeholder="type request" onChange={this.onTyped} />
                    <button className="btn btn-sm btn-success" onClick={this.type.bind(this)}>
                        <span className="fa fa-paper-plane fa-2x"></span>
                    </button>
                </div>
            </div>
          );
    }
}

export default Chat;