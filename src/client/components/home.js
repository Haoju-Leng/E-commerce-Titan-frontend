import { height } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./CSS/home.css";
import { Margin } from "@mui/icons-material";
import styled from "styled-components";

const ErrorBase = styled.div`
  grid-column: 1 / 3;
  color: red;
  display: flex;
  justify-content: center;

  min-height: 1.2em;
`;

const ErrorMessage = ({ msg = "", hide = false }) => {
  return (
    // <ErrorBase style={{ display: hide ? "none" : "inherit" }}>{msg}</ErrorBase>
    <div class="alert alert-danger" role="alert " style={{ display: hide ? "none" : "inherit" }}>
 {msg}
</div>

  );
};


export const Home = ({user}) => {
  let [products, setProducts] = useState({});
  let [imglist, setImglist] = useState({}); 
  let [pageNum, setPageNum] = useState(10); 
  let [index, setIndex] = useState(0); 
  let [currentpage, setCurrentpage] = useState(0); 
  let [category, setCategory] = useState('Select Category');
  let [searchName, setSearchName] = useState(''); 
  let [error, setError] = useState('');
  let [empty, setEmpty] = useState(false); 
  const navigate = useNavigate();
  const getProduct = async () => {
    const response = await fetch(`http://localhost:8080/api/v1/products/?page=${currentpage}&size=${pageNum}` , {headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`,
    }});
    const data = await response.json();
    console.log(data);

    setProducts(data.data);  
    console.log("checking")
    console.log(data)   
    setIndex(data.page)
    console.log('length of the product' + Object.keys(data).length)
  };
  useEffect(() => {


    // const geturl = async(lastDigit, imgKey) => {
    //     await fetch("http://localhost:8080/api/v1/products/?page=2&size=20" + lastDigit, {headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${user.token}`,
    //       }} ).then(response => response.blob())
    //     .then(async imageBlob => {
    //         // console.log(URL.createObjectURL(imageBlob).toString())
    //         // console.log("this url added")
    //         console.log(555);
    //         let tmp = Object.assign({}, imglist);
    //         tmp[imgKey] = URL.createObjectURL(imageBlob).toString();
    //         await setImglist(tmp);
    //         // setImglist(imglist[imgKey] = URL.createObjectURL(imageBlob).toString()); 
    //         // let element = {}
    //         // element[imgKey] = URL.createObjectURL(imageBlob).toString()
    //         // setImglist({...imglist, imgKey: URL.createObjectURL(imageBlob).toString()})
    //         // await setImglist(imglist.push(element))
    //     })
    // }




    
    getProduct(); 
  }, [pageNum,currentpage]);


  useEffect(() => {

    const geturl = async(lastDigit, imgKey, upstate) => {
      await fetch("http://localhost:8080/api/v1/products/file/" + lastDigit, {headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        }} ).then(response => response.blob())
      .then(async imageBlob => {
          // console.log(URL.createObjectURL(imageBlob).toString())
          // console.log("this url added")
          console.log(555);
          // let tmp = Object.assign({}, imglist);
          // tmp[imgKey] = URL.createObjectURL(imageBlob).toString();
          upstate[imgKey] = URL.createObjectURL(imageBlob).toString();
          await setImglist({...upstate});
          // setImglist(imglist[imgKey] = URL.createObjectURL(imageBlob).toString()); 
          // let element = {}
          // element[imgKey] = URL.createObjectURL(imageBlob).toString()
          // setImglist({...imglist, imgKey: URL.createObjectURL(imageBlob).toString()})
          // await setImglist(imglist.push(element))
      })
  }
    const updatedstate = {}; 

    if (products != null) {
        console.log(products);
      for (let key of Object.keys(products)) {
        geturl(products[key].productFileIdList[0], products[key].name, updatedstate);

      }
    }
    console.log("second")
  },[products])

  const redirect = (ev, id) => {
    ev.preventDefault();
    console.log(id);
    navigate(`/item/${id}`);
  };





  const productList = Object.keys(products).map((i, p, h) => {
  
    return (


<div className="col-4 d-flex " >
        <div className="ibox d-flex">
            <div className="ibox-content product-box">
                <div className="product-imitation">
                <img
          src={imglist[products[i].name]}
          width="220" 
          height="150" onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="/images/default_product.jpg";
        }}
        />
                </div>
                <div className="product-desc">
                    <span className="product-price">
                        ${products[i].price}
                    </span>
                    <a  className="product-name" onClick={(id = "") => redirect(event, (id = products[i].id))}> {products[i].name}</a>

                    <small className="text-muted">{products[i].productCategory}</small>

                    <div className="small m-t-xs">
                    {products[i].description}
                    </div>
                    <div className="m-t text-righ">

                        <a href="#" className="btn btn-xs btn-outline btn-primary" onClick={(id = "") => redirect(event, (id = products[i].id))}>Info <i className="fa fa-long-arrow-right"></i> </a>
                    </div>
                </div>
            </div>
        </div>
    </div>



    );
  });
  const submitForm = (e) => {
    console.log("check submit")
    console.log(category)
    console.log(searchName)
    e.preventDefault()
    let catparam = e.target.value
    if (catparam === "Select Category") {catparam = ''}
    if (catparam === "All") {catparam = ''}
    // if (searchName === "") {setError('Product Name cannot be empty'); return}
    const getProductsearch = async () => {
      const response = await fetch(`http://localhost:8080/api/v1/products/search?page=0&size=${pageNum}&name=${searchName}&productCategory=${catparam}` , {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      }});
      const data = await response.json();
      console.log('below is data')
      console.log(Object.keys(data).length)
      console.log(data.size)
      if (data.size === 0) {setError('No products found'); setEmpty(true)} 
      else {setEmpty(false); setError('')}

      setProducts(data.data);  


      setIndex(data.page)

    };


    getProductsearch()

  }
  const changePage = (e) => {
    console.log("this is the selected page num" + e.target.value)
    setPageNum(e.target.value)
    console.log(typeof products)
    console.log("length in there", parseInt(Object.keys(products).length / e.target.value) + 1)
    console.log(e.target.value)
    console.log('harry',Object.keys(products).length / e.target.value)
    // setIndex(parseInt(Object.keys(products).length / e.target.value) + 1)
    // getProduct()
  }
  function Car() {
    return  <select className="form-select" name="pageNum" id="pageNum" onChange={changePage}>
      <option value="5">{pageNum}</option>
    <option value="5">5</option>
    <option value="10" >10</option>
    <option value="30">30</option>
    <option value="50">50</option>
  </select>



  }
  const pageChange = (ev,pNumber) => {
    ev.preventDefault();
    console.log( typeof pNumber.i)
    setCurrentpage(pNumber.i)

    // getProduct(); 
  }
 

  const indexes = Array.apply(0, Array(index)).map((x,i) => {
    return <li class="page-item"><a href="/" onClick={() => pageChange(event, {i})}>{i}</a></li>
  })

  return (
    <div className="container">
      <h1 style={{textAlign: "center", fontFamily: 'Lobster', marginTop: '1em'}}>Welcome to E-Commerence Titan</h1>
      <p style={{textAlign: "center", fontFamily: 'Roboto, sans-serif'}}>Below you can find all the products that are currently listed on our website.</p>
      <div className="row">
    <div className="col-9">
    </div>
   
     <br/>
    

      </div>
    

      
      <div className="row">
      <div className="col-3">

      <div class="card" >

  <div class="card-body" >
  <div ><p className="card-title"> Number Showing:</p> <Car/></div>

 



            <p className="card-title">Category: </p>
            <select className="card-title form-select" name="pageNum" id="pageNum" onChange={(ev) => {setCategory(ev.target.value); submitForm(ev)}}>
      <option value={category}>{category}</option>
      <option value="All">Show All</option>
    <option value="books">Books</option>
    <option value="electronics" >Electronics</option>
    <option value="apparel">Apparel</option>
    <option value="free stuff">Free Stuff</option>
    <option value="entertainment">Entertainment</option>
    <option value="sporting goods">Sporting Goods</option>
    <option value="pet supplies">Pet Supplies</option>
    <option value="home goods">Home Goods</option>
    <option value="other">Other</option>
  </select>
  


  <p className="card-title">Product Name:</p>

<input className="card-title form-control" style={{width: '100%'}} onChange={(ev) => setSearchName(ev.target.value)} placeholder="Product Name"></input>
    <div style={{textAlign: 'center'}}>
    {error !== "" && <ErrorMessage msg={error} />}

    <input style={{margin: '0 auto'}} className="btn btn-primary card-title" type="submit" value='Search' onClick={(ev)=> submitForm(ev)}  />

    </div>


 
  </div>


</div>

<br/>



      </div>
      <div className="col-9">
        <div className="container">
        <div className="row" >{productList}</div>
        <div className="row" >
     
        {empty && <div style={{marginTop: '45rem'}}></div>}
          <nav aria-label="Page navigation example"  style={{textAlign: 'center'}} >
     <ul class="pagination "style={{display: 'inline-block' ,textAlign: 'left'}}>
      {indexes}
      </ul>
      </nav>




        
        </div>
        </div>
      </div>
      </div>
      
   
    </div>
  );
};






