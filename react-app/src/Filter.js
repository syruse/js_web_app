import { Component } from "react";
import { Method, fetch } from "./utils/fetcher";
import { connect } from "react-redux";
import { applyFilter } from "./store/filter/filter-action"

const FilterCollection = { 
    SIM: {
           field: "sim",
           op: "IN",
           values: []
        }/*,
    BRAND: 'brand',
    MODEL: 'model',
    DISPLAY_SIZE: 'displaySize',
    DISPLAY_TYPE: 'displayType',
    CPU_TYPE: 'cpuType',
    STORAGE_TYPE: 'storageType',
    CAMERA_BACK: 'cameraMp',
    CAMERA_FRONT: 'cameraFrontMp',
    BATTERY: 'battery_mAh',
    PRICE: 'price',
    CATEGORY: 'category'*/
};

class Filter extends Component {
    constructor(props){
        super(props)
        this.state = {isCollapsed: false, devicesConfiguration: undefined}
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

    updateFilter() {
        const filter = [];
        for (const key in FilterCollection) {
            // if filter valid
            if (FilterCollection[key].values.length) {
                filter.push(FilterCollection[key])
            }
        }
        this.props.applyFilter(filter)
        console.debug("new filer ", JSON.stringify(filter))
    }

    async applySimCriteria(pairKeyValue) {
        const {key, value} = pairKeyValue;
        const simAvailability = [];
        if(key === 'WITH_SIM' && !value) {
            // with_sim disabled
        } else if((key === 'WITH_SIM' && value) || FilterCollection.SIM.values.includes('true')) {
            simAvailability.push('true')
        }

        if(key === 'NO_SIM' && !value) {
           // no_sim disabled
        } else if((key === 'NO_SIM' && value) || FilterCollection.SIM.values.includes('false')) {
            simAvailability.push('false')
        }

        FilterCollection.SIM.values = simAvailability;
        this.updateFilter();
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
                                    <label className="checkbox-inline control-label" style={{ marginBottom: 'auto' }}><input type="checkbox" name="sim" onChange={(e) => { this.applySimCriteria({key:'NO_SIM', value: e.target.checked}) }} />no sim</label>
                                    <label className="checkbox-inline control-label" style={{ marginBottom: 'auto' }}><input type="checkbox" name="sim" onChange={(e) => { this.applySimCriteria({key:'WITH_SIM', value: e.target.checked}) }} />with sim</label>
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

const mapStateToProps = (state) => ({
    filter: state.filter
});

const mapDispatchToProps = (dispatch) => ({
    applyFilter: (filter) => dispatch(applyFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);