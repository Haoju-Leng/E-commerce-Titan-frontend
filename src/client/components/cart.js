import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import md5 from "md5";
import "./CSS/cart.css";

const CartItem = ( { cartList, images, onRemove, user, setProductsInfo, productsInfo } ) => {
    const navigate = useNavigate();
    const onClick = async (sellerId) => {
        let res = await fetch(`http://localhost:8080/api/v1/user/${sellerId}`, { //TODO: update API
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        });

        const data = await res.json();
        if (res.ok) {
            let chatEmail = data.email;
            navigate(`/chat/${chatEmail}`);
        }
    }

    if(cartList === undefined || cartList.length === 0){
        console.log(cartList);
        return <div><h1>Your cart is empty.</h1><div><a href={"/home"}>Continue Shopping</a></div></div>;
    }else{
        console.log('imhere2', cartList);


        return cartList.map((products, index) => {
            console.log(products,11);

            return (
                <div key={index} className="cart-item d-md-flex justify-content-between">
                <span className="remove-item" onClick={() => onRemove(products.product.id)}><i
                    className="fa fa-times"></i></span>
                    <div className="px-3 my-3 col-8">
                        <a className="cart-item-product" href={`/item/${products.product.id}`}>
                            <div className="cart-item-product-thumb"><img
                                className="media-object img-thumbnail" src={images[products.product.id]} alt="Product"/></div>
                            <div className="cart-item-product-info">
                                <h4 className="cart-item-product-title">{products.product.name}</h4>
                            </div>
                        </a>
                    </div>

                    <div className="px-3 my-3 text-center col-2">
                        <div className="cart-item-label">Delivery method</div>
                        <div className="count-input">
                            <select className="form-control" style={{width: '7em'}} defaultValue="Shipping" id={products.product.id} onChange={(ev) => {

                                setProductsInfo((productsInfo) => {
                                    let updatedList = productsInfo.productsInfo.map(product => {
                                        if(product.productId.toString() === ev.target.id){
                                            return {...product, method: ev.target.value};
                                        }else{
                                            return product;
                                        }
                                    });
                                    return {productsInfo: updatedList};
                                });
                            }
                            }>
                                <option value="Shipping">Shipping</option>
                                <option value="Face-to-face">Face-to-face</option>
                            </select>
                        </div>
                    </div>
                    <div className="px-3 my-3 text-center col-1">
                        <div className="cart-item-label">Subtotal</div>
                        <div style={{marginTop: '1.5em'}} className="text-xl font-weight-medium">{products.product.price !== undefined
                            ? `$${products.product.price}`
                            : `$0`}</div>
                        {/*<div><button className="btn btn-style-1 btn-primary btn-sm my-2 mx-auto mx-sm-0"*/}
                        {/*>Contact seller*/}
                        {/*</button></div>*/}
                    </div>
                    <div className="px-3 my-3 text-center col-1">
                        <div style={{marginTop: '1.5em'}}><button onClick={() => {onClick(products.product.sellerId)}}
                                                                  className="btn btn-outline-primary btn-sm my-2 mx-auto mx-sm-0"
                        >Contact seller
                        </button></div>
                    </div>

                    {/*<div className="px-3 my-3 text-center">*/}
                    {/*    <div className="cart-item-label">Discount</div>*/}
                    {/*    <span className="text-xl font-weight-medium">$35.00</span>*/}
                    {/*</div>*/}
                </div>
            )
        })
    }

};

export const Cart = ({user}) => {

    let [cartList, updateCartList] = useState({});
    let [images, setImages] = useState({});
    let [update, setUpdate] = useState(0);
    let [productsInfo, setProductsInfo] = useState({productsInfo: []});

    let [error, setError] = useState("");

    let navigate = useNavigate();


    useEffect( () => {
        const tmp2 = {};

        const geturl = async(lastDigit, productId) => {
            await fetch("http://localhost:8080/api/v1/products/file/" + lastDigit, {headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                }} ).then(response => response.blob())
                .then(imageBlob => {
                    tmp2[productId] = URL.createObjectURL(imageBlob).toString();
                })
        };

        async function getCartList(){
            let res = await fetch("http://localhost:8080/api/v1/cart", { //TODO: update API
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
            });

            const data = await res.json();
            if (res.ok) {
                updateCartList(data);
                let productsInfo = [];
                data.items.map((products, index) => {
                    let tmp = {
                        productId: products.product.id,
                        method: "Shipping"
                    }
                    productsInfo.push(tmp);
                    if(index === data.items.length - 1){
                        setProductsInfo(productsInfo);
                        console.log(productsInfo,555);
                    }
                });
                console.log(data);
                await Promise.all(data.items.map(async (products) => await geturl(products.product.productFileIdList[0], products.product.id)));
                setImages(tmp2);

            } else {
                setError(`Error happened`);
            }
        }
        console.log('get called');
        getCartList();

    }, [update]);

    const checkOut = async () => { //TODO: to be updated
        console.log({productsInfo});
        let res = await fetch(`http://localhost:8080/api/v1/order/create`, {
            method: "POST",
            body: JSON.stringify({productsInfo}),
            headers: {
                "Authorization": `Bearer ${user.token}`,
                "content-type": "application/json"
            },
        });

        if (res.ok) {
            console.log('success');
            console.log(JSON.stringify({productsInfo}));
            navigate("/orderPlaced");
        }else{
            console.log('failed');
            console.log(JSON.stringify({productsInfo}));
        }
    };

    const onRemove = async (productId) => {
        let res = await fetch(`http://localhost:8080/api/v1/cart/remove?productId=${productId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        });

        if (res.ok) {
            setUpdate(update + 1);
        }
    };

    return (

        <div className="container pb-5 mb-2 CartDiv">
            {error !== "" && <div>{error}</div>}
            <br/>
            <CartItem cartList={cartList.items} images={images} onRemove={onRemove} user={user} productsInfo={productsInfo} setProductsInfo={setProductsInfo}/>

            <div className="d-sm-flex justify-content-between align-items-center text-center text-sm-left">
                <form className="form-inline py-2">
                    <label className="sr-only">Coupon code</label>
                    <input className="form-control form-control-sm my-2 mr-3" type="text" placeholder="Coupon code"
                           required=""/>
                        <button className="btn btn-style-1 btn-secondary btn-sm my-2 mx-auto mx-sm-0"
                                type="submit">Apply Coupon
                        </button>
                </form>
                <div className="py-2"><span
                    className="d-inline-block align-middle text-sm text-muted font-weight-medium text-uppercase mr-2">Subtotal:</span><span
                    className="d-inline-block align-middle text-xl font-weight-medium">{`$${cartList.totalPrice}`}</span></div>
            </div>

            <hr className="my-2" />
            {(cartList.items === undefined || cartList.items.length !== 0) &&
                <div className="row pt-3 pb-5 mb-2">
                    <div className="col-sm-6 mb-3"><a className="btn btn-style-1 btn-secondary btn-block" href="/home"><i
                        className="fa fa-arrow-left"></i>&nbsp;Continue shopping</a></div>
                    <div className="col-sm-6 mb-3"><a className="btn btn-style-1 btn-primary btn-block"
                                                      onClick={checkOut}><i
                        className="fe-icon-credit-card"></i>&nbsp;Place order</a></div>
                </div>}
        </div>
    );


};
