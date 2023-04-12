import { height } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./CSS/home.css";
import { Margin } from "@mui/icons-material";

export const Home = ({user}) => {
  let [products, setProducts] = useState({});
  let [imglist, setImglist] = useState({}); 
  let [pageNum, setPageNum] = useState(10); 
  let [index, setIndex] = useState(0); 
  let [currentpage, setCurrentpage] = useState(0); 
  let [category, setCategory] = useState('Select Category');
  let [searchName, setSearchName] = useState(''); 
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


<div className="col-md-3">
        <div className="ibox">
            <div className="ibox-content product-box">
                <div className="product-imitation">
                <img
          src={imglist[products[i].name]}
          width="200" 
          height="150"
        />
                </div>
                <div className="product-desc">
                    <span className="product-price">
                        ${products[i].price}
                    </span>
                    <small className="text-muted">{products[i].name}</small>
                    <a href="#" className="product-name"> {products[i].productCategory}</a>

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
    console.log(category)
    console.log(searchName)
    e.preventDefault()


    const getProductsearch = async () => {
      const response = await fetch(`http://localhost:8080/api/v1/products/search?page=${currentpage}&size=${pageNum}&name=${searchName}&productCategory${category}` , {headers: {
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
    return  <select name="pageNum" id="pageNum" onChange={changePage}>
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
      <h1>Welcome to E-Commerence Titan!!!!!!!!!</h1>
      <p>We have millions of products that are on sale</p>
      <div className="row">
    <div className="col-9">
    </div>
   
     <br/>
    

      </div>
    

      <div className="col-12" style={{backgroundColor: 'white', width: '100rpx' ,height:"110rpx"}}>
      <div className="container">
        <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-3">
            <p>Product Name:</p>

             <input onChange={(ev) => setSearchName(ev.target.value)}></input>

            <br/>

            <input className="btn btn-primary" type="submit" value='Search' style={{float: 'left'}} />

          </div>
          
          <div className="col-3" >
            Category: <select name="pageNum" id="pageNum" onChange={(ev) => setCategory(ev.target.value)}>
      <option value="5">{category}</option>
    <option value="5">Cat 1</option>
    <option value="10" >Cat 1</option>
    <option value="30">Cat 1</option>
    <option value="50">Cat 1</option>
  </select>
          </div>
          <div className="col-2"></div>
          <div className="col-4">
<div style={{float: 'right'}}>Number of products in each page: <Car/></div>

    <nav aria-label="Page navigation example" style={{float: 'right'}} >
     <ul class="pagination">
      {indexes}
      </ul>
      </nav>
    </div>
        </div>
        </form>



        
      </div>
      </div>
      <div className="row" style={{marginTop: '5rem'}}>{productList}</div>
   
    </div>
  );
};






