import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import md5 from "md5";

export const Cart = ({user}) => {
    return(
        <div className="container"
             style={{width: '1145px', marginTop: '20px', marginBottom: '180px'}}>
            <div style={{marginBottom: '30px'}}>
                <div>
                    <br/><h1 className={"glyphicon glyphicon-shopping-cart"}>Cart</h1>

                        <table className="table table-hover" id="productList">
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>product name</td>
                                <td>quantity</td>
                                <td>product price</td>
                                <td>total price</td>
                                <td><a href="#" className="btn btn-danger"
                                       style={{marginTop: '0px'}}><span
                                    className="glyphicon glyphicon-trash"></span>remove</a></td></tr>
                            </tbody>
                        </table>

                    <div className={"pull-right"}>
                        <h1>Total Price: 500000</h1>
                        <br/>
                        <a className="btn btn-primary pull-right"
                           style={{marginTop: '0px', marginLeft: '0px'}}> <span
                            className="glyphicon glyphicon-remove"></span> Clear Cart
                        </a>
                        <a href="/checkout" className="btn btn-primary pull-right"
                           style={{marginTop: '0px', marginRight: '5px'}}> <span
                            className="glyphicon glyphicon-shipping-cart"> </span>Check Out
                        </a>
                    </div>
                    {/*<div>*/}
                    {/*    <a href="/checkout" className="btn btn-primary pull-right"*/}
                    {/*       style={{marginTop: '40px', marginRight: '5px'}}> <span*/}
                    {/*        className="glyphicon glyphicon-shipping-cart"> </span>Check Out*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </div>
                {/*<c:url value="/getAllProducts" var="url"></c:url>*/}
                <a href="/" className="btn btn-default" style={{marginLeft: '0px'}}>Continue Shopping</a>
            </div>
        </div>
    );
}