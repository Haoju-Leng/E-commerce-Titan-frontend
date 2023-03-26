import React, {useState, useEffect, Fragment} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./CSS/postedItems.css"

const ShippingDetails = () => {
    return(
        <div className="card mb-4 col-md-6" style={{marginTop: '0.3em'}}>
            <div className="card-body">
                <h3 className="h6">Shipping Information</h3>
                {/*<strong>FedEx</strong>*/}
                {/*<span><a href="#" className="text-decoration-underline" target="_blank">FF1234567890</a> <i*/}
                {/*    className="bi bi-box-arrow-up-right"></i> </span>*/}
                <hr/>
                    <h3 className="h6">Address</h3>
                    <address>
                        <strong>John Doe</strong><br/>
                        1355 Market St, Suite 900<br/>
                        San Francisco, CA 94103<br/>
                        <abbr title="Phone">P:</abbr> (123) 456-7890
                    </address>
            </div>
        </div>
    );
};

export const PostedItems = ({ user }) => {
    let [state, setState] = useState([]);
    let [openDetail, setOpenDetail] = useState(false);

    // useEffect(async () => {
    //     let res = await fetch("http://localhost:8080/api/v1/#", { //TODO: update API
    //         method: "GET",
    //         headers: {
    //             "Authorization": `Bearer ${user.token}`
    //         },
    //     });
    //
    //     const data = await res.json();
    //     if (res.ok) {
    //         setState(data);
    //     }
    // });


  return(
    <div className="container bootdey">
        <div className="panel panel-default panel-order">
            <div className="panel-heading">
                <strong>Posted Items Status</strong>
            </div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-md-1"><img src="https://bootdey.com/img/Content/user_3.jpg"
                                                   className="media-object img-thumbnail"/></div>
                    <div className="col-md-11">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pull-right"><label className="label label-info">pending</label></div>
                                <span><strong>Order name</strong></span> <br/>
                                <div style={{marginTop: '0.2em'}}>Quantity : 2, cost: $323.13 </div><br/>
                                {/*<a data-placement="top" className="btn btn-success btn-xs"*/}
                                {/*   href="#" title="View"><div className="glyphicon glyphicon-ok"></div></a>*/}
                                {/*<a data-placement="top" className="btn btn-danger btn-xs "*/}
                                {/*   href="#" title="Danger"><div className="glyphicon glyphicon-remove"></div></a>*/}
                                {/*<a data-placement="top" className="btn btn-info btn-xs" href="#"*/}
                                {/*   title="Danger"><div className="glyphicon glyphicon-usd"></div></a>*/}
                            </div>
                            <div className="col-md-12">Waiting to be purchased</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-1"><img src="https://bootdey.com/img/Content/user_1.jpg"
                                                   className="media-object img-thumbnail"/></div>
                    <div className="col-md-11">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pull-right"><label className="label label-info">pending</label></div>
                                <span><strong>Order name</strong></span> <br/>
                                <div style={{marginTop: '0.2em'}}>Quantity : 12, cost: $12623.13</div><br/>
                            </div>
                            <div className="col-md-12">Waiting to be purchased</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-1"><img src="https://bootdey.com/img/Content/user_3.jpg"
                                                   className="media-object img-thumbnail"/></div>
                    <div className="col-md-11">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="pull-right"><label className="label label-success">Sold</label>
                                </div>
                                <span><strong>Order name</strong></span><br/>
                                <div style={{marginTop: '0.2em'}}>Quantity : 4, cost: $523.13</div>
                                <div style={{marginTop: '0.2em'}}>Delivery method : shipping</div><br/>
                            </div>
                            {openDetail === false ?
                            <div className="col-md-12"><a href="#" onClick={() => setOpenDetail(true)}>Click here to view shipping details</a></div>
                                :
                                <div className="col-md-12"><a href="#" onClick={() => setOpenDetail(false)}>Click here to hide shipping details</a>
                                    <div><ShippingDetails/></div></div>}

                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
  );
};