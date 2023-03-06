import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const Home = ({user}) => {
  let [products, setProducts] = useState({});
  let [imglist, setImglist] = useState({}); 
  const navigate = useNavigate();
  useEffect(() => {

    const geturl = async(lastDigit, imgKey) => {
        await fetch("http://localhost:8080/api/v1/product/file/" + lastDigit, {headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          }} ).then(response => response.blob())
        .then(async imageBlob => {
            // console.log(URL.createObjectURL(imageBlob).toString())
            // console.log("this url added")
            console.log(555);
            let tmp = Object.assign({}, imglist);
            tmp[imgKey] = URL.createObjectURL(imageBlob).toString();
            await setImglist(tmp);
            // setImglist(imglist[imgKey] = URL.createObjectURL(imageBlob).toString()); 
            // let element = {}
            // element[imgKey] = URL.createObjectURL(imageBlob).toString()
            // setImglist({...imglist, imgKey: URL.createObjectURL(imageBlob).toString()})
            // await setImglist(imglist.push(element))
        })
    }




    const getProduct = async () => {
      const response = await fetch("http://localhost:8080/api/v1/product/" , {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      }});
      const data = await response.json();
      console.log(data);
    //   const promises = Object.keys(data).forEach(async (key) => {
    //     // console.log(data[key].name)
    //     // console.log(data)
    //     return await geturl(data[key].productFileIdList[0], data[key].name);
    //   })

    //   await Promise.all(promises);

    // (async () => {
    // for await (let key of Object.keys(data)) {
    //     console.log("foor")
    //     geturl(data[key].productFileIdList[0], data[key].name);
        

    // }})();
      setProducts(data);
    };
    getProduct(); 
  }, []);


  useEffect(() => {

    const geturl = async(lastDigit, imgKey, upstate) => {
      await fetch("http://localhost:8080/api/v1/product/file/" + lastDigit, {headers: {
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
    console.log("below is list")
    // console.log(products[i].name)
    console.log(imglist);
    console.log("")
    // Object.keys(imglist).map((test) => {
    //     console.log(test)
    // })

    // console.log(products[i].name)
    // console.log(imglist.products[i].name);
    return (
      <div key={products[i].id} className="col-3">
        <img
          src={imglist[products[i].name]}
          width="200" 
          height="150"
        />
        <a
          href=""
          onClick={(id = "") => redirect(event, (id = products[i].id))}
        >
          {products[i].name}
        </a>
        {/* // onClick={(pil = "") => onClick(event, (pil = "stack1"))}
        onClick={(products[i].id)=> onClick(event, id = products[i].id) } 
        */}
      </div>
    );
  });

  return (
    <div className="container">
      <h1>Welcome to E-Commerence Titan!!!!!!!!!</h1>
      <div className="row">{productList}</div>
    </div>
  );
};
