import { Component } from "react";
import { connect } from "react-redux";
import { Method, fetch } from "./utils/fetcher";
import { addItem } from "./store/cart/cart-action"
import GraphQlClient from "./utils/graphqlClient";
class GetAll extends Component {

    constructor(props){
        super(props)
        this.state = {products: []}
        this.graphqlClient = new GraphQlClient("http://localhost:8080/graphql")
        this.localFilter = this.props.filter;
    }

    async getProducts() {
        const products = await this.graphqlClient.getProducts(this.localFilter);
        this.setState( { products } )
        console.debug("getProducts: " + JSON.stringify(products))
    }

    async componentDidMount(){
        console.debug("GetAll app mounted")
        this.getProducts();
    }

    async componentDidUpdate(){
        console.debug("GetAll app updated => new cart: " + JSON.stringify(this.props.cart),
                      "new filter: " + JSON.stringify(this.props.filter))
        try {
            if (this.localFilter !== this.props.filter) {
                this.localFilter = this.props.filter
                this.getProducts();
            }
        } catch (error) {
            console.error("error ", error.message);
        }
    }

    buy(product){
        const { addDevice } = this.props;
        console.debug("buy " + JSON.stringify(product))
        addDevice(product, 1)
    }

    render(){
        return (
            <div className="col-sm-12">
                {this.state.products.map(product => (
                    [
                        <div className="col-sm-4 dropdown">
                            <div className="card h-align dropdown-toggle">
                                <img className="card-img-top h-align" style={{ "width": "70%" }} src={"https://cdn0.it4profit.com/s3/isupport-kz/categories/iphone-13.webp"} alt="Card cap"></img>
                                <div className="card-body">
                                    <h3 className="card-title text-h-align">{product.brand}</h3>
                                    <h4 className="card-text text-h-align">{product.model}</h4>
                                    <h3 className="card-text text-h-align"><b>{product.price} $</b></h3>
                                    <div className="space-between">
                                        <button className="btn btn-sm btn-success" onClick={this.buy.bind(this, product)}>
                                            <span className="fas fa-cart-arrow-down fa-2x"></span>
                                        </button>
                                        <button className="btn btn-sm btn-danger">
                                            <span className="fas fa-heart fa-2x"></span>
                                        </button>
                                    </div>
                                    <ul className="dropdown-menu text-left list-unstyled">
                                        <li>CPU: <b>{product.cpuType}</b></li>
                                        <li>Capacity: <b>{product.storageType} Gb</b></li>
                                        <li>Display size: <b>{product.displaySize}</b></li>
                                        <li>Display type: <b>{product.displayType}</b></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ]))
                }
            </div>
          );
    }
}

/// wrapper for using hooks for components
/*function WithNavigate(props) {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const addDevice = (productId) => dispatch(addItem({productId: productId}))
    return <GetAll {...props} navigate={navigate} cart={cart} addDevice={addDevice} />
}

export default WithNavigate;*/

const mapStateToProps = (state) => ({
    cart: state.cart,
    filter: state.filter
});

const mapDispatchToProps = (dispatch) => ({
    addDevice: (product, amount) => dispatch(addItem({id: product.id, amount: amount, brand: product.brand, model: product.model, price: product.price}))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetAll);
