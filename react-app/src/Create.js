import { Component } from "react";
import { UserContext } from "./context/user.context";
import { Method, fetch } from "./utils/fetcher"

class Create extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            devicesConfiguration: {},
            category: 0, brand: 0, model: '', displaySize: 0, displayType: 0, cpuType: 0, storageType: 0, cameraMp: 0, cameraFrontMp: 0,
            battery_mAh: 0, sim: false, quantity: 0, price: 0, status: ''
        }
    }

    componentDidMount(){
        console.debug("Create app mounted");
        if (!this.context.currentUser && typeof this.context.currentUser.token === 'undefined') {
            console.debug("Create app mounted with empty token")
            this.props.navigate("/");
        } else {
            console.debug("Create app mounted with token", this.context.currentUser.token)
            fetch("http://localhost:8080/api/devices-configuration", this.context.currentUser.token, Method.GET)
            .then(res=>{
                console.debug("devices-configuration ", res)
                this.setState({devicesConfiguration:res.data})
            }).catch(err=>{
                console.error("error ", err)
            })
        }
    }

    componentDidUpdate(){
        console.debug("Create app updated")
    }

    onDisplaySizeChange = (e) => {
        if (Number.parseFloat(e.target.value) > this.state.devicesConfiguration.displaySize.min && 
            Number.parseFloat(e.target.value) <= this.state.devicesConfiguration.displaySize.max) {
                this.setState({displaySize:e.target.value})
        } else {
            e.target.value = '';
        }
    }

    onBatteryChange = (e) => {
        if (Number.parseFloat(e.target.value) > this.state.devicesConfiguration.battery_mAh.min &&
            Number.parseFloat(e.target.value) <= this.state.devicesConfiguration.battery_mAh.max) {
                this.setState({ battery_mAh: e.target.value })
        } else {
            e.target.value = '';
        }
    }

    onFrontCameraChange = (e) => {
        if (Number.parseFloat(e.target.value) > this.state.devicesConfiguration.cameraFrontMp.min &&
            Number.parseFloat(e.target.value) <= this.state.devicesConfiguration.cameraFrontMp.max) {
                this.setState({ cameraFrontMp: e.target.value })
        } else {
            e.target.value = '';
        }
    }

    onBackCameraChange = (e) => {
        if (Number.parseFloat(e.target.value) > this.state.devicesConfiguration.cameraMp.min &&
            Number.parseFloat(e.target.value) <= this.state.devicesConfiguration.cameraMp.max) {
                this.setState({ cameraMp: e.target.value })
        } else {
            e.target.value = '';
        }
    }

    createProduct(){
        fetch("http://localhost:8080/api/devices", this.context.currentUser.token, Method.POST, 
        {
            category: this.state.category,
            model: this.state.model,
            brand: this.state.brand,
            displaySize: parseFloat(this.state.displaySize),
            displayType: this.state.displayType,
            cpuType: this.state.cpuType,
            storageType: this.state.storageType,
            cameraMp: parseFloat(this.state.cameraMp),
            cameraFrontMp: parseFloat(this.state.cameraFrontMp),
            battery_mAh: parseInt(this.state.battery_mAh, 10),
            sim: this.state.sim,
            quantity: parseInt(this.state.quantity, 10),
            price: parseFloat(this.state.price)
        })
        .then(res=>{
            this.setState({status:'Success'})
            console.debug("Create ", res)
        }).catch(err=>{
            this.setState({status:'Adding new device failed'})
            console.error("error ", err)
        })
    }

    render(){
        return (
            <div>
                <div className="form-horizontal">
                    <h2>Device adding</h2>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Category:</label>
                        <div className="col-sm-10">
                            {this.state.devicesConfiguration.category && <select className="form-control" name="category" onChange={(e) => {this.setState({ category: e.target.value })}}>
                                {this.state.devicesConfiguration.category.map((category, index) => (
                                    [
                                        <option value={index}>{category}</option>
                                    ]))
                                }
                            </select>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Brand:</label>
                        <div className="col-sm-10">
                            {this.state.devicesConfiguration.brand && <select className="form-control" name="brand" onChange={(e) => {this.setState({ brand: e.target.value })}}>
                                {this.state.devicesConfiguration.brand.map((brand, index) => (
                                    [
                                        <option value={index}>{brand}</option>
                                    ]))
                                }
                            </select>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Model:</label>
                        <div className="col-sm-10">
                            <input className="form-control" onChange={(e) => {this.setState({ model: e.target.value })}} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Sim:</label>
                        <div className="col-sm-10">
                            <label class="control-label radio-inline"><input type="radio" name="sim" onClick={() => { this.setState({sim:false}) }} />no sim</label>
                            <label class="control-label radio-inline"><input type="radio" name="sim" onClick={() => { this.setState({sim:true}) }} />with sim</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Display type:</label>
                        <div className="col-sm-10">
                            {this.state.devicesConfiguration.displayType && <select className="form-control" name="displayType" onChange={(e) => {this.setState({ displayType: e.target.value })}}>
                                {this.state.devicesConfiguration.displayType.map((displayType, index) => (
                                    [
                                        <option value={index}>{displayType}</option>
                                    ]))
                                }
                            </select>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Display Size:</label>
                        <div className="col-sm-10">
                            {this.state.devicesConfiguration.displaySize && 
                            <input className="form-control" name="displaySize" placeholder={'set value from 0 to ' + this.state.devicesConfiguration.displaySize.max} onChange={this.onDisplaySizeChange} />
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Battery:</label>
                        <div className="col-sm-10">
                            {this.state.devicesConfiguration.battery_mAh && 
                            <input className="form-control" name="battery_mAh" placeholder={'set value from 0 to ' + this.state.devicesConfiguration.battery_mAh.max} onChange={this.onBatteryChange} />
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Front camera:</label>
                        <div className="col-sm-10">
                            {this.state.devicesConfiguration.cameraFrontMp && 
                            <input className="form-control" name="cameraFrontMp" placeholder={'set value from 0 to ' + this.state.devicesConfiguration.cameraFrontMp.max} onChange={this.onFrontCameraChange} />
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Back camera:</label>
                        <div className="col-sm-10">
                            {this.state.devicesConfiguration.cameraMp && 
                            <input className="form-control" name="cameraMp" placeholder={'set value from 0 to ' + this.state.devicesConfiguration.cameraMp.max} onChange={this.onBackCameraChange} />
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">CPU:</label>
                        <div className="col-sm-10">
                            {this.state.devicesConfiguration.cpuType && <select className="form-control" name="cpuType" onChange={(e) => {this.setState({ cpuType: e.target.value })}}>
                                {this.state.devicesConfiguration.cpuType.map((cpuType, index) => (
                                    [
                                        <option value={index}>{cpuType}</option>
                                    ]))
                                }
                            </select>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">storage:</label>
                        <div className="col-sm-10">
                            {this.state.devicesConfiguration.storageType && <select className="form-control" name="storageType" onChange={(e) => {this.setState({ storageType: e.target.value })}}>
                                {this.state.devicesConfiguration.storageType.map((storageType, index) => (
                                    [
                                        <option value={index}>{storageType}</option>
                                    ]))
                                }
                            </select>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Quantity:</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="quantity" onChange={(e) => {
                                this.setState({ quantity: e.target.value })
                            }} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Price:</label>
                        <div className="col-sm-10">
                            <input className="form-control" onChange={(e) => {
                                this.setState({ price: e.target.value })
                            }} />
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