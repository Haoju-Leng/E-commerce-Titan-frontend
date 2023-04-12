import React, {useEffect, useState, Fragment} from "react";
import "./CSS/postedItems.css"

const ShippingDetails = ( { buyer } ) => {
    return(
        <div className="card mb-4 col-md-6" style={{marginTop: '0.3em'}}>
            <div className="card-body">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <h3 className="h6" style={{ marginRight: '1rem' }}>Shipping Information</h3>
                    <a className="btn btn-primary" href={`/chat/${buyer.email}`}>Chat with buyer</a></span>
                <hr/>
                    <h3 className="h6">Address</h3>
                    <address>
                        <strong>{`${buyer.firstName} ${buyer.lastName}`}</strong><br/>
                        {buyer.address !== null && `${buyer.address}`}<br/>
                        {buyer.city !== null && buyer.state !== null && buyer.zipcode !== null &&
                            `${buyer.city}, ${buyer.state} ${buyer.zipcode}`}<br/>
                        <abbr title="Phone">P:</abbr> {buyer.phone !== null && `${buyer.phone}`}
                    </address>
            </div>
        </div>
    );
};

const Product = ({ product, index, images, user}) => {
    let [openDetail, setOpenDetail] = useState(false);
    let [buyer, setBuyer] = useState({email: ""});
    let [order, setOrder] = useState({
        buyerId: "",
        deliveryMethod: "",
    });
    let [remove, setRemove] = useState(false);

    useEffect(() => {
        async function getOrderInfo(productId){
            let res = await fetch(`http://localhost:8080/api/v1/order/getOrderInfo?productId=${productId}`, { //TODO: update API
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
            });

            const product = await res.json();
            if (res.ok) {
                console.log(product);
                setOrder(product);
                return product;
            }
        }
        async function getBuyerInfo(buyerId){
            let res = await fetch(`http://localhost:8080/api/v1/user/${buyerId}`, { //TODO: update API
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
            });

            const data = await res.json();
            if (res.ok) {
                console.log(data);
                setBuyer(data);
            }
        }

        if(product.state !== "forSale"){
            getOrderInfo(product.id).then((product) => getBuyerInfo(product.buyerId));
        }
    }, [remove]);


    const onAccept = async (productId) => {
        let res = await fetch(`http://localhost:8080/api/v1/order/approve?productId=${productId}`, { //TODO: update API
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        });

        const data = await res.json();
        if (res.ok) {
            console.log(data);
            setOrder(data);
        }
    }

    const onDeny = async (productId) => {
        let res = await fetch(`http://localhost:8080/api/v1/order/deny?productId=${productId}`, { //TODO: update API
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        });

        const data = await res.json();
        if (res.ok) {
            setOrder(data);
        }
    }

    const onDelete = async (productId) => {
        let res = await fetch(`http://localhost:8080/api/v1/products/${productId}`, { //TODO: update API
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        });

        if (res.ok) {
            setRemove(true);
        }
    }

    if(remove === true) return null;


    return (
        <div key={index} className="row">
            <div className="col-md-1"><img src={images[product.id]}
                                           className="media-object img-thumbnail" alt="product image"/></div>
            <div className="col-md-11">
                <div className="row">
                    <div className="col-md-12">
                        <div className="pull-right">{
                            product.state === "forSale"
                                ? <label className="label label-info">Pending</label>
                                :  <label className="label label-success">Sold</label>}</div>
                        <span><h3 className="fw-bold"><a href={`/item/${product.id}`}>{product.name}</a></h3></span>
                        <div >{`Price: $${product.price}`} </div>
                        {product.state === "inTransaction" && order.state === "Processing"
                            ? <Fragment><div>Delivery method : {`${order.deliveryMethod}`}</div>
                                <div className="float-end">
                                <a data-placement="top" className="btn btn-success btn-xs"
                                   onClick={() => onAccept(product.id)} title="Accept"><div className="glyphicon glyphicon-ok"></div></a>
                                <a data-placement="top" className="btn btn-danger btn-xs"
                                   onClick={() => onDeny(product.id)} title="Reject"><div className="glyphicon glyphicon-remove"></div></a></div></Fragment>
                            : product.state === "forSale" && order.state === undefined
                                ? <a data-placement="top" className="btn btn-danger btn-lg float-end"
                                     onClick={() => onDelete(product.id)} title="Delete">Delete</a>
                                : order.state === "Completed"
                                    ?
                                    <Fragment>
                                    <div>Delivery method : {`${order.deliveryMethod}`}</div>
                                    <div className="float-end fw-bold">Order confirmed</div>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <div>Delivery method : {`${order.deliveryMethod}`}</div>
                                        <div className="float-end fw-bold">Order denied</div>
                                    </Fragment>
                        }

                    </div>
                    {product.state === "forSale"
                        ? <div className="col-md-12">Waiting to be purchased</div>
                        : order.deliveryMethod !== "Shipping" ?
                            <div className="col-md-12"><a href={`/chat/${buyer.email}`}>Click here to talk with buyer for delivery</a></div>
                        : openDetail === false ?
                            <div className="col-md-12"><a href="#" onClick={() => setOpenDetail(true)}>Click here to view shipping details or chat with buyer</a></div>
                            :
                            <div className="col-md-12"><a href="#" onClick={() => setOpenDetail(false)}>Click here to hide shipping details or chat with buyer</a>
                                <div><ShippingDetails buyer={buyer}/></div></div>}
                </div>
            </div>
        </div>
    );
}

export const PostedItems = ({ user }) => {
    let [products, setProducts] = useState([]);
    let [openDetail, setOpenDetail] = useState(false);
    let [images, setImages] = useState({});
    let [remove, setRemove] = useState(false);

    useEffect(() => {
        const tmp2 = {};

        const geturl = async(lastDigit, upstate, productId) => {
            await fetch("http://localhost:8080/api/v1/products/file/" + lastDigit, {headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                }} ).then(response => response.blob())
                .then(imageBlob => {
                    tmp2[productId] = URL.createObjectURL(imageBlob).toString();
                })
        };

        async function fetchProducts() {
            let res = await fetch("http://localhost:8080/api/v1/products/userAll", { //TODO: update API
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
            });

            const data = await res.json();
            if (res.ok) {
                const updatedstate = {};
                await Promise.all(data.map(async (product) => await geturl(product.productFileIdList[0], updatedstate, product.id)));
                setProducts(data);
                console.log(data);
                setImages(tmp2);
                console.log(tmp2);
            }}

        fetchProducts();
    }, []);

  return(
    <div className="container bootdey postedDiv">
        <div className="panel panel-default panel-order">
            <div className="panel-heading">
                <strong>Posted Items Status</strong>
            </div>
            <div className="panel-body">
                {products.length !== 0
                    ? products.map((product, index) => <Product product={product} images={images} index={index} user={user}/>)
                    : <div><h1>You haven't posted any items yet.</h1></div>}

            </div>
        </div>
    </div>
  );
};