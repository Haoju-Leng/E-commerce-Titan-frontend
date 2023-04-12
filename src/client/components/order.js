import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import md5 from "md5";
import "./CSS/order.css";

const OrderList = ({ order, index, user }) => {
    let [seller, setSeller] = useState(null);
    let [image, setImage] = useState(null);
    let [product, setProduct] = useState(null);

    useEffect(() => {
        const geturl = async(lastDigit) => {
            await fetch("http://localhost:8080/api/v1/products/file/" + lastDigit, {headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                }} ).then(response => response.blob())
                .then(imageBlob => {
                     setImage(URL.createObjectURL(imageBlob).toString());
                })
        };

        async function getSeller(sellerId){
            let res = await fetch(`http://localhost:8080/api/v1/user/${sellerId}`, { //TODO: update API
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
            });

            const data = await res.json();
            if (res.ok) {
                setSeller(data);
            }
        }
        getSeller(order.sellerId);

        async function getProduct(productId){
            let res = await fetch(`http://localhost:8080/api/v1/products/${productId}`, { //TODO: update API
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
            });

            const product = await res.json();
            if (res.ok) {
                await geturl(product.productFileIdList[0]);
                setProduct(product);
                console.log(product);
            }
        }
        getProduct(order.productId);
    }, []);

    if(seller === null || product === null) return null;

    return (
        <div key={index} className="bg-white card  order-list shadow-sm">
            <div className="gold-members p-4">
                <div className="media">
                    <div className="col-md-1">
                        <img width={60} height={60}
                             src={image}
                             onError={({ currentTarget }) => {
                                 currentTarget.onerror = null; // prevents looping
                                 currentTarget.src="/images/default_product.jpg";
                             }}
                             alt="Generic placeholder image"/>
                    </div>
                    <div className="media-body col-md-11">
                            <span className="float-end text-info">Status: {order.state === "Processing"
                                ? `Waiting for seller's response`
                                :  order.state === "Completed"
                                    ? `Order accepted by seller`
                                : `Order rejected by seller`}
                                <i className="icofont-check-circled text-success"></i></span>
                        <h2 className="mb-2">
                            <div href="#" className="text-black">{product.name}</div>
                        </h2>
                        <p className="text-gray mb-1"><i
                            className="icofont-location-arrow"></i>{`Delivery method: ${order.deliveryMethod}`}
                        </p>
                        {/*<p className="text-gray mb-3"><i className="icofont-list"></i> ORDER*/}
                        {/*    #25102589748 <i className="icofont-clock-time ml-2"></i> Mon, Nov*/}
                        {/*    12, 6:26 PM</p>*/}
                        <p className="text-dark">{`Description: ${product.description}`}
                        </p>
                        <hr/>
                        <div className="float-end">
                            <a className="btn btn-sm btn-outline-primary" href={`/chat/${seller.email}`}><i
                                className="bi bi-headphones"></i> CONTACT SELLER</a>
                            {/*<a className="btn btn-sm btn-primary" href="#"><i*/}
                            {/*    className="icofont-refresh"></i> REORDER</a>*/}
                        </div>
                        <strong className="mb-0 text-black text-primary pt-2"><span
                            className="text-black"> Total Price: {`$${order.unitPrice}`}</span>
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const Order = ({user}) => {

    let [orderList, updateOrderList] = useState(null);

    useEffect(async () => {
        let res = await fetch("http://localhost:8080/api/v1/order/getBuyingOrders", { //TODO: update API
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        });

        const data = await res.json();
        if (res.ok) {
            updateOrderList(data);
            console.log(data);
        }

    }, []);

    return (

        <div className="container OrderDiv">
            <div className="row">
                <div className="col-md-3 py-3">
                    <div className="osahan-account-page-left shadow-sm bg-white">
                        <div className="border-bottom p-4">
                            <div className="osahan-user text-center">
                                <div className="osahan-user-media">
                                    <img className="mb-3 rounded-pill shadow-sm mt-1"
                                         src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                         alt="gurdeep singh osahan"/>
                                        <div className="osahan-user-media-body">
                                            <h3 className="mb-2">{`${user.firstName} ${user.lastName}`}</h3>
                                            <p className="mb-1">{user.phone}</p>
                                            <p>{user.email}</p>
                                            <p>{user.address}</p>
                                            <p>{`${user.city}, ${user.state}, ${user.zipcode}`}</p>
                                            <p className="mb-0 text-black fw-bold"><a
                                                className="text-primary mr-3"  href="/profile"><i
                                                className="bi bi-pen"></i> EDIT</a></p>
                                        </div>
                                </div>
                            </div>
                        </div>
                        {/*<ul className="nav nav-tabs flex-column border-0 pt-4 pl-4 pb-4" id="myTab" role="tablist">*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <a className="nav-link" id="orders-tab" data-toggle="tab" href="#orders" role="tab"*/}
                        {/*           aria-controls="orders" aria-selected="false"><i*/}
                        {/*            className="icofont-food-cart"></i> Orders</a>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="osahan-account-page-right shadow-sm bg-white p-4">
                        <div id="myTabContent">
                            <div id="orders"
                                 aria-labelledby="orders-tab">
                                <h4 className="fw-bold mt-0 mb-4">Past Orders</h4>
                                {orderList !== null
                                    ? orderList.map((order, index) => <OrderList order={order} index={index} user={user}/> )
                                    : <div><h1>You don't have any past orders.</h1></div>}


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );


};
