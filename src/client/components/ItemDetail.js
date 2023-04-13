import React, { Fragment,useState, useEffect } from "react";
// import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import styled from "styled-components";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./CSS/items.css";
import { useParams, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Popup from "reactjs-popup";


// import React from 'react';
// import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const PopupButton = styled.button`
  width: 140px;
  height: 20px;
  text-align: center;
  line-height: 0.8em;
  font-size: 0.4em;
  margin-top: 10px;
  margin-left: 90px;
  margin-bottom: 10px;
`;
const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}
const PopupHeader = styled.div`
  width: 100%;
  text-align: center;
  padding: 5px;
`;
const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px'
}



export const ItemDetail = ({ user }) => {
  const { id } = useParams();
  let [item, setItem] = useState({});
    let [images, setImages] = useState([]); 
    let [slideImages, setSlideImages] = useState([]); 
    let [added, setAdded] = useState(false);
    let navigate = useNavigate();
  useEffect(() => {


    const geturl = async(lastDigit, upstate) => {
        await fetch("http://localhost:8080/api/v1/products/file/" + lastDigit, {headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          }} ).then(response => response.blob())
        .then(imageBlob => {
            // console.log(URL.createObjectURL(imageBlob).toString())
            // console.log("this url added")
            // upstate
            // setImages(images => [...images, URL.createObjectURL(imageBlob).toString()]); 

            upstate.push(URL.createObjectURL(imageBlob).toString());
            //upstate.push({url: URL.createObjectURL(imageBlob).toString(), caption: "pic"});
            //setSlideImages(upstate)
            setImages([...upstate]);


        })
    }
    const getProduct = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/products/${id}` , {headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          }}
      );
      const data = await response.json();
      console.log(data)
      // console.log(data.productFileIdList);
      const updatedstate = []; 

      data.productFileIdList.map(i => {geturl(i, updatedstate)})
      setItem({
        id: data.id,
        productCategory: data.productCategory,
        description: data.description,
        manufacturer: data.manufacturer,
        name: data.name,
        price: data.price,
        stock: data.stock,
        sellerid: data.sellerId
      });
    };
    
    // console.log(geturl(2)); 
    getProduct();
  }, []);
  const handleButtonAddCart = (e) => {
    let addToCart = async () => {
      await fetch(`http://localhost:8080/api/v1/cart/add?productId=${item.id}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
          "Authorization": `Bearer ${user.token}`,
        },
          
      }).then((res) => {
        if(res.ok){
            console.log('Do something'); //TODO: handle add cart response
            setAdded(true)
        }else{
            console.log('Pops error');
        }
      });
    };
    addToCart();
  };

  const onClick = async (sellerId) => {
    let res = await fetch(`http://localhost:8080/api/v1/user/${sellerId}`, { //TODO: update API
        method: "GET",
        headers: {
            "Authorization": `Bearer ${user.token}`
        },
    });
console.log(item)
    const data = await res.json();
    if (res.ok) {
        let chatEmail = data.email;
        navigate(`/chat/${chatEmail}`);
    }
}

  const OkButton = (props) => {
    //TODO: update product path
    return (
      <Fragment>
        <Popup open={props.published} position="top center" modal>
          <div
            style={{
              borderStyle: "solid",
              borderColor: "darkgray",
              backgroundColor: "white",
              width: "500px",
            }}
          >
            <PopupHeader className="header">{`Successfully Added!`}</PopupHeader>
            <div className="actions">
              <PopupButton
                className="btn btn-lg btn-info"
                onClick={() => {
                  props.navigate(`/cart`);
                }}
              >
                view cart
              </PopupButton>
              <PopupButton
                className="btn btn-lg btn-info"
                onClick={() => {
                    setAdded(false)
                }}
              >
                Keep browsing
              </PopupButton>
            </div>
          </div>
        </Popup>
      </Fragment>
    );
  };
  // if (images !== null) {
  //   console.log("below is images")
  //   console.log(slideImages)
  //  imglist = images.map( (i,y) => {
  //       console.log('below')
  //       console.log(images)
  //       // return <img src={i}></img>
  //       return <div classNameName="each-slide-effect">
  //       <div>
  //       <img src={`url(${images[1]})`} />
  //       </div>
  //     </div>
        

  //   })    }
  //   const imglist2 = <Slide>{imglist}</Slide>

//   const images = [
//     "data:image/jpeg;base64,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",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFa_dn5H8CisPpDmFK7wX8-QD36ea21hzZkA&usqp=CAU",
//     "data:image/jpeg;base64,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",
//   ];

    const newImages =  images.map((i, index)  =>  {
        let slideName;
        if(index === 0){
            slideName = "item active";
        }else{
            slideName = "item";
        }

        return (<div className={slideName}>
                <img src={i} className="img-responsive" alt="" />
            </div>
        )})

    const slideShowList = images.map((i, index) =>
            <li key={index} data-target="#myCarousel-2" data-slide-to={index} className={index === 0 ? "active" : ""}></li> );





  return (
      <Fragment>
      {added && (
          <OkButton published={added} navigate={navigate} itemID={id} />
      )}
      <div className="container">
    {/* <!-- product --> */}

    <div className="product-content product-wrap clearfix product-deatil">


        <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
                <div className="product-image">
                    <div id="myCarousel-2" className="carousel slide">
                        <ol className="carousel-indicators">
                            {slideShowList}
                        </ol>
                        <div className="carousel-inner">
                            {newImages}
                        </div>
                        <a className="left carousel-control" href="#myCarousel-2" data-slide="prev"> <span className="glyphicon glyphicon-chevron-left"></span> </a>
                        <a className="right carousel-control" href="#myCarousel-2" data-slide="next"> <span className="glyphicon glyphicon-chevron-right"></span> </a>
                    </div>
                </div>
            </div>

            <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                <h2 className="name">
                {item.name}
                    <small>Number of Available: {item.stock}<a href="javascript:void(0);"></a></small>
                </h2>
                <hr />
                <h3 className="price-container">
                    ${item.price}
                    <small>*includes tax</small>
                </h3>
                <div className="certified">
                    <ul>
                        <li>
                            <a href="javascript:void(0);">Manufacturer<span>{item.manufacturer}</span></a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">Category<span>{item.productCategory}</span></a>
                        </li>
                    </ul>
                </div>
                <hr />
                <div className="description description-tabs">
                    <ul id="myTab" className="nav nav-pills">

                   
                    </ul>
                    <div id="myTabContent" className="tab-content">

                     
                            <strong>Description </strong>
                            <p  style={{ color: 'red !important' }}>
                                {item.description}
                            </p>
                            <div className="tab-pane fade active in" id="more-information">
                            <br />
                        </div>
                        <div className="tab-pane fade" id="specifications">
                            <br />
                            <dl className="" style={{ color: 'red !important' }}>
                                <dt>Gravina</dt>
                                <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
                                <dd>Donec id elit non mi porta gravida at eget metus.</dd>
                                <dd>Eget lacinia odio sem nec elit.</dd>
                                <br />

                                <dt>Test lists</dt>
                                <dd>A description list is perfect for defining terms.</dd>
                                <br />

                                <dt>Altra porta</dt>
                                <dd>Vestibulum id ligula porta felis euismod semper</dd>
                            </dl>
                        </div>
                        <div className="tab-pane fade" id="reviews">
                            <br />
                            <form method="post" className="well padding-bottom-10" onsubmit="return false;">
                                <textarea rows="2" className="form-control" placeholder="Write a review"></textarea>
                                <div className="margin-top-10">
                                    <button type="submit" className="btn btn-sm btn-primary pull-right">
                                        Submit Review
                                    </button>
                                    <a href="javascript:void(0);" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="" data-original-title="Add Location"><i className="fa fa-location-arrow"></i></a>
                                    <a href="javascript:void(0);" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="" data-original-title="Add Voice"><i className="fa fa-microphone"></i></a>
                                    <a href="javascript:void(0);" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="" data-original-title="Add Photo"><i className="fa fa-camera"></i></a>
                                    <a href="javascript:void(0);" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="" data-original-title="Add File"><i className="fa fa-file"></i></a>
                                </div>
                            </form>

                            <div className="chat-body no-padding profile-message">
                                <ul>
                                    <li className="message">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="online" />
                                        <span className="message-text">
                                            <a href="javascript:void(0);" className="username">
                                                Alisha Molly
                                                <span className="badge">Purchase Verified</span>
                                                <span className="pull-right">
                                                    <i className="fa fa-star fa-2x text-primary"></i>
                                                    <i className="fa fa-star fa-2x text-primary"></i>
                                                    <i className="fa fa-star fa-2x text-primary"></i>
                                                    <i className="fa fa-star fa-2x text-primary"></i>
                                                    <i className="fa fa-star fa-2x text-muted"></i>
                                                </span>
                                            </a>
                                            Can't divide were divide fish forth fish to. Was can't form the, living life grass darkness very image let unto fowl isn't in blessed fill life yielding above all moved
                                        </span>
                                        <ul className="list-inline font-xs">
                                            <li>
                                                <a href="javascript:void(0);" className="text-info"><i className="fa fa-thumbs-up"></i> This was helpful (22)</a>
                                            </li>
                                            <li className="pull-right">
                                                <small className="text-muted pull-right ultra-light"> Posted 1 year ago </small>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="message">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="online" />
                                        <span className="message-text">
                                            <a href="javascript:void(0);" className="username">
                                                Aragon Zarko
                                                <span className="badge">Purchase Verified</span>
                                                <span className="pull-right">
                                                    <i className="fa fa-star fa-2x text-primary"></i>
                                                    <i className="fa fa-star fa-2x text-primary"></i>
                                                    <i className="fa fa-star fa-2x text-primary"></i>
                                                    <i className="fa fa-star fa-2x text-primary"></i>
                                                    <i className="fa fa-star fa-2x text-primary"></i>
                                                </span>
                                            </a>
                                            Excellent product, love it!
                                        </span>
                                        <ul className="list-inline font-xs">
                                            <li>
                                                <a href="javascript:void(0);" className="text-info"><i className="fa fa-thumbs-up"></i> This was helpful (22)</a>
                                            </li>
                                            <li className="pull-right">
                                                <small className="text-muted pull-right ultra-light"> Posted 1 year ago </small>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-3">
                        <a onClick={handleButtonAddCart} className="btn btn-success btn-lg">Add to cart (${item.price})</a>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-3">
                            <button className="btn btn-white btn-default" onClick={() => onClick(item.sellerid)}><i className="fa fa-envelope" ></i> Contact Seller</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- end product --> */}
</div>
      </Fragment>










    
  );
};
