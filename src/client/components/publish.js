import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Popup from "reactjs-popup";

const ErrorBase = styled.div`
  grid-column: 1 / 3;
  color: red;
  display: flex;
  justify-content: center;
  padding: 1em;
  min-height: 1.2em;
  font-size: 4px;
`;

const RadioInput = (props) => {
  return (
    <input
      type="radio"
      name="productCategory"
      id="productCategory"
      value={props.value}
      defaultChecked={props.checked}
      onChange={props.onChange}
    />
  );
};

const PopupHeader = styled.div`
  width: 100%;
  text-align: center;
  padding: 5px;
`;

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

export const ErrorMessage = ({ msg = "", hide = false }) => {
  return (
    <ErrorBase style={{ display: hide ? "none" : "inherit" }}>{msg}</ErrorBase>
  );
};

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
          <PopupHeader className="header">{`Successfully Posted!`}</PopupHeader>
          <div className="actions">
            <PopupButton
              className="btn btn-lg btn-info"
              onClick={() => {
                props.navigate(`/item/${props.itemID}`);
              }}
            >
              view item
            </PopupButton>
            <PopupButton
              className="btn btn-lg btn-info"
              onClick={() => {
                props.navigate(0);
              }}
            >
              post another item
            </PopupButton>
          </div>
        </div>
      </Popup>
    </Fragment>
  );
};

export const Publish = ({ user }) => {
  let navigate = useNavigate();
  let [state, setState] = useState({
    productCategory: "books",
    productName: "",
    productDescription: "",
    productManufacturer: "",
    productPrice: "",
    unitStock: "",
  });

  let [priceError, setPriceError] = useState("");
  let [unitError, setUnitError] = useState("");
  let [nameError, setNameError] = useState("");
  let [submitError, setSubmitError] = useState("");
  let [image, setImage] = useState({});
  let [published, setPublished] = useState(false);
  let [itemID, setItemID] = useState("");

  useEffect(() => {
    document.getElementById("productName").focus();
  }, []);

  const onChange = (ev) => {
    // setPwdError("");
    // setUserError("");
    // setAddressError("");
    setNameError("");
    // Update from form and clear errors
    setState({
      ...state,
      [ev.target.id]: ev.target.value,
    });
    // Make sure the price is valid
    if (ev.target.id === "productPrice") {
      let priceInvalid = /^\d+$/.test(ev.target.value);
      if (!priceInvalid) {
        setPriceError(`Error: price must be a number`);
      } else {
        setPriceError("");
      }
    }
    // Make sure unitStock is valid
    else if (ev.target.id === "unitStock") {
      let unitInvalid = /^\d+$/.test(ev.target.value);
      if (!unitInvalid) {
        setUnitError(`Error: Number of products must be a number`);
      } else {
        setUnitError("");
      }
    }
  };


    // let [priceError, setPriceError] = useState("");
    // let [unitError, setUnitError] = useState("");
    // let [nameError, setNameError] = useState("");
    // let [submitError, setSubmitError] = useState("");
    // let [image, setImage] = useState({});
    // let [published, setPublished] = useState(false);
    // let [itemID, setItemID] = useState("");
    //
    // useEffect(() => {
    //     document.getElementById("productName").focus();
    // }, []);
    //
    // const onChange = (ev) => {
    //     // setPwdError("");
    //     // setUserError("");
    //     // setAddressError("");
    //     setNameError("");
    //     // Update from form and clear errors
    //     setState({
    //         ...state,
    //         [ev.target.id]: ev.target.value,
    //     });
    //     // Make sure the price is valid
    //     if (ev.target.id === "productPrice") {
    //         let priceInvalid = /^\d+$/.test(ev.target.value);
    //         if (!priceInvalid) {setPriceError(`Error: price must be a number`)}
    //         else {setPriceError("");}
    //     }
    //     // Make sure unitStock is valid
    //     else if (ev.target.id === "unitStock") {
    //         let unitInvalid = /^\d+$/.test(ev.target.value);
    //         if (!unitInvalid) {setUnitError(`Error: Number of products must be a number`)}
    //         else{
    //             setUnitError("");
    //         }
    //     }
    // };

    const setImageState = (ev) => {
        let tmp = {};
        for (let i = 0; i < ev.target.files.length; i++) {
            let filename = `image${i}`;
            tmp[filename] = ev.target.files[i];
        }
        setImage(tmp);
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        if(state.productName === ""){
            setNameError("Error: product name can't be empty")
        }else if(state.productPrice === ""){
            setPriceError("Error: product price can't be empty")
        }else if(state.unitStock === ""){
            setUnitError("Error: Number of product can't be empty")
        }else if(priceError === "" && unitError === "" && nameError === ""){
            const formData = new FormData();

            for (let i = 0; i < Object.keys(image).length; i++) {
                formData.append(`image${i}`, image[`image${i}`]);
            }

            // formData.append('productInfo', JSON.stringify({
            //     productCategory: state.productCategory,
            //     description: state.productDescription,
            //     manufacturer: state.productManufacturer,
            //     name: state.productName,
            //     price: state.productPrice,
            //     stock: state.unitStock
            // }));

            formData.append('productInfo', new Blob([JSON.stringify({
                productCategory: state.productCategory,
                description: state.productDescription,
                manufacturer: state.productManufacturer,
                name: state.productName,
                price: state.productPrice,
                stock: state.unitStock,
            })], {
                type: "application/json"
            }));
            console.log(state.productPrice);
            // for (var key of formData.entries())
            // {
            //     console.log(key[0] + ', ' + key[1])
            // }
            let res = await fetch("http://localhost:8080/api/v1/product/", { //TODO: update API
                body: formData,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
            });

            const data = await res.json();
            if (res.ok) {
                setPublished(true);
                setItemID(data.id);
            } else {
                setSubmitError(`Error: ${data.message}`);
            }
        }

    };

    let tmp = {
        productCategory: "books",
        description: "books",
        manufacturer: "books",
        name: "books",
        price: 10,
        stock: 2
    }
    const onClick = async () => {
        let res = await fetch("http://localhost:8080/api/v1/cart/add", {
            body: JSON.stringify({
                items: [tmp],
                userId: 123
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
        });

        if (res.ok) {
            console.log("ok");
        } else {
            console.log("not ok");
        }
    }
    const onClick2 = async () => {
        let res = await fetch("http://localhost:8080/api/v1/cart", {
            headers: {
                "Authorization": `Bearer ${user.token}`
            },
        });
        const data = await res.json();
        if(res.ok){
            console.log(data);
        }else{
            console.log(res);
        }
    }


  return (
    <Fragment>
      {published && (
        <OkButton published={published} navigate={navigate} itemID={itemID} />
      )}
      <div className="container" style={{ marginBottom: "19px" }}>
        <center className="well h1">Post Item</center>
        <div className="col-lg-12 well">
          <div className="row">
            <form>
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-6 form-group">
                    <label htmlFor="productName">Item Name</label>
                    <input
                      type="text"
                      placeholder="Enter Item Name"
                      className="form-control"
                      id="productName"
                      onChange={onChange}
                    ></input>
                    {nameError !== "" && <ErrorMessage msg={nameError} />}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="productDescription">Item Description</label>
                  <textarea
                    type="text"
                    placeholder="Enter Item Description"
                    className="form-control"
                    id="productDescription"
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="productCategory">Item Category</label> TODO:
                  multiselect or single select
                  <div>
                    <label style={{ fontSize: "1em" }}>
                      <RadioInput
                        onChange={onChange}
                        value={"books"}
                        checked={true}
                      />
                      Books
                    </label>
                  </div>
                  <div>
                    <label style={{ fontSize: "1em" }}>
                      <RadioInput
                        onChange={onChange}
                        value={"electronics"}
                        checked={false}
                      />
                      Electronics
                    </label>
                  </div>
                  <div>
                    <label style={{ fontSize: "1em" }}>
                      <RadioInput
                        onChange={onChange}
                        value={"other"}
                        checked={false}
                      />
                      Other
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4 form-group">
                    <label htmlFor="productManufacturer">
                      Item Manufacturer
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Item Manufacturer"
                      className="form-control"
                      id="productManufacturer"
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="productPrice">Item Price</label>
                    <input
                      type="text"
                      placeholder="Enter Item Price"
                      className="form-control"
                      id="productPrice"
                      onChange={onChange}
                    ></input>
                    {priceError !== "" && <ErrorMessage msg={priceError} />}
                  </div>
                  <div className="col-sm-4 form-group">
                    <label htmlFor="unitStock">Number of Items</label>
                    <input
                      type="text"
                      placeholder="Number of Items"
                      className="form-control"
                      id="unitStock"
                      onChange={onChange}
                    ></input>
                    {unitError !== "" && <ErrorMessage msg={unitError} />}
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="images">
                    Upload images:{" "}
                    <input
                      style={{ marginTop: "5px", fontSize: "10px" }}
                      type="file"
                      id="images"
                      name="images"
                      onChange={setImageState}
                      multiple
                    />
                  </label>
                  {submitError !== "" && <ErrorMessage msg={submitError} />}
                </div>
                <div className="row justify-content-center form-actions">
                  <button
                    className="col-1 btn btn-lg btn-info"
                    onClick={onSubmit}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
