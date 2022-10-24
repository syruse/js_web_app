import { Component } from "react";
import { Method, fetch } from "./utils/fetcher";
import GraphQlClient from "./utils/graphqlClient";

class Filter extends Component {
    constructor(props){
        super(props)
        this.state = {isCollapsed: false, devicesConfiguration: undefined}
        this.graphqlClient = new GraphQlClient("http://localhost:8080/graphql")
    }

    componentDidMount(){
        console.debug("Filter app mounted")
        fetch("http://localhost:8080/api/devices-configuration", undefined, Method.GET)
        .then(res=>{
            console.debug("devices-configuration ", res)
            this.setState({devicesConfiguration:res.data})
        }).catch(err=>{
            console.error("error ", err)
        })
    }

    componentDidUpdate(){
        console.debug("Filter app updated")
    }

    onEmailChange = (e) => {
        this.setState({email:e.target.value})
    }

    async applySimCriteria(withSim) {
        const filters = [{
            field: "sim",
            op: "EQ",
            values: [
                "true"
            ]
        }]
        const products = await this.graphqlClient.getProducts(filters)
        console.log("getProducts" + JSON.stringify(products))
    }

    collapse(){
        this.setState({isCollapsed: !this.state.isCollapsed})
    }

    render(){
        return (
            <div className="panel-group" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="panel-title v-align">
                            <span className="fas fa-list-ul"></span>
                            <span className="p-1">&nbsp;&nbsp;&nbsp;</span>
                            <b style={{ fontSize: '130%' }} ><i>Filter</i></b>
                            <span style={{ marginLeft: 'auto', marginRight: '0' }}>
                                <a data-toggle="collapse" href="#collapse1" onClick={this.collapse.bind(this)}>
                                    {
                                        this.state.isCollapsed ?
                                            <span className="fas fa-angle-right fa-2x" data-toggle="collapse"></span>
                                            :
                                            <span className="fas fa-angle-down fa-2x" data-toggle="collapse"></span>
                                    }
                                </a>
                            </span>
                        </div>
                    </div>
                    <div id="collapse1" className="panel-collapse collapse in">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="form-group v-align">
                                    <label className="control-label" style={{ marginRight: '3%' }}>Sim:</label>
                                    <label className="checkbox-inline control-label" style={{ marginBottom: 'auto' }}><input type="checkbox" name="sim" onClick={() => { this.applySimCriteria(false) }} />no sim</label>
                                    <label className="checkbox-inline control-label" style={{ marginBottom: 'auto' }}><input type="checkbox" name="sim" onClick={() => { this.applySimCriteria(true) }} />with sim</label>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="form-group v-align">
                                    <label className="control-label" style={{ marginRight: '3%' }}>Brand:</label>
                                    {this.state.devicesConfiguration?.brand?.map((brand, index) => (
                                        [
                                            <label className="checkbox-inline control-label" style={{ marginBottom: 'auto' }}><input type="checkbox" name="brand" onClick={({ index }) => { }} />{brand}</label> 
                                        ]))
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;