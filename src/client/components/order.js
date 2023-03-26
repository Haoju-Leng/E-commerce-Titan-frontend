import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import md5 from "md5";
import "./CSS/cart.css";

export const Order = ({user}) => {

    let [orderList, updateOrderList] = useState({

    });

    let [error, setError] = useState("");

    useEffect(async () => {
        let res = await fetch("http://localhost:8080/api/v1/cart/", { //TODO: update API
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        });

        const data = await res.json();
        if (res.ok) {
            updateOrderList(data);
        } else {
            setError(`Error happened`);
        }

    }, []);


    return (

        <div className="container pb-5 mb-2">
            {error !== "" && <div>{error}</div>}
            <br/>
            <div className="cart-item d-md-flex justify-content-between">
                <div className="px-3 my-3">
                    <a className="cart-item-product" href="#">
                        <div className="cart-item-product-thumb"><img
                            src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Product"/></div>
                        <div className="cart-item-product-info">
                            <h4 className="cart-item-product-title">Canon EOS M50 Mirrorless Camera</h4>
                        </div>
                    </a>
                </div>
                <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Quantity</div>
                    <div className="count-input">
                        <span className="text-xl font-weight-medium">1</span>
                    </div>
                </div>
                <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Subtotal</div>
                    <span className="text-xl font-weight-medium">$910.00</span>
                </div>
                <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Discount</div>
                    <span className="text-xl font-weight-medium">$35.00</span>
                    <br/>
                    <div className="mt-2 align-self-end"><a className="btn btn-style-1 btn-primary btn-block"
                                                                     href="/checkout"><i
                        className="fe-icon-credit-card"></i>&nbsp;Chat with Seller</a></div>
                </div>



            </div>

            <div className="cart-item d-md-flex justify-content-between"><span className="remove-item"><i
                className="fa fa-times"></i></span>
                <div className="px-3 my-3">
                    <a className="cart-item-product" href="#">
                        <div className="cart-item-product-thumb"><img
                            src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="Product" /></div>
                        <div className="cart-item-product-info">
                            <h4 className="cart-item-product-title">Apple iPhone X 256 GB Space Gray</h4>
                            <span><strong>Memory:</strong> 256GB</span><span><strong>Color:</strong> Space Gray</span>
                        </div>
                    </a>
                </div>
                <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Quantity</div>
                    <div className="count-input">
                        <select className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </div>
                </div>
                <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Subtotal</div>
                    <span className="text-xl font-weight-medium">$1,450.00</span>
                </div>
                <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Discount</div>
                    <span className="text-xl font-weight-medium">—</span>
                </div>
            </div>

            <div className="cart-item d-md-flex justify-content-between"><span className="remove-item"><i
                className="fa fa-times"></i></span>
                <div className="px-3 my-3">
                    <a className="cart-item-product" href="#">
                        <div className="cart-item-product-thumb"><img
                            src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Product" /></div>
                        <div className="cart-item-product-info">
                            <h4 className="cart-item-product-title">HP LaserJet Pro Laser Printer</h4>
                            <span><strong>Type:</strong> Laser</span><span><strong>Color:</strong> White</span>
                        </div>
                    </a>
                </div>
                <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Quantity</div>
                    <div className="count-input">
                        <select className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </div>
                </div>
                <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Subtotal</div>
                    <span className="text-xl font-weight-medium">$188.50</span>
                </div>
                <div className="px-3 my-3 text-center">
                    <div className="cart-item-label">Discount</div>
                    <span className="text-xl font-weight-medium">—</span>
                </div>
            </div>


            {/*<hr className="my-2" />*/}
            {/*<div className="row pt-3 pb-5 mb-2">*/}
            {/*    <div className="col-sm-6 mb-3"><a className="btn btn-style-1 btn-secondary btn-block" href="#"><i*/}
            {/*        className="fe-icon-refresh-ccw"></i>&nbsp;Update Cart</a></div>*/}
            {/*    <div className="col-sm-6 mb-3"><a className="btn btn-style-1 btn-primary btn-block"*/}
            {/*                                      href="/checkout"><i*/}
            {/*        className="fe-icon-credit-card"></i>&nbsp;Checkout</a></div>*/}
            {/*</div>*/}
        </div>
    );


};
