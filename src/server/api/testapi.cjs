// Dummy api for testing purpose, could remove after devellping


module.exports = (app) => {

    app.get("/v1/user", (req, res) => {
        res.status(200).send({"hello": "hellow world"});
      });

    //   ## get cart by id
    app.get("/cart/:id", (req, res) => {

        let content = {"id": req.params.id, "cartItem": [], "customer": 1234, "totalPrice": 1.2};
        res.status(200).send(content);
      });
    //   ## add product 
    //  1 add product 
    app.post("/cartItem/add", (req, res) => {

        res.status(200).send({"cartItem": []});
    });

    //   2 remove product 
    app.delete("/cartItem/remove/:id", (req,res) => {
        console.log(req.params);
        console.log(req.query);
        // console.log(req.params.itemIds)
        res.status(200).send({"cartItem": []});
    });
    // 3 remove all product 
    app.delete("/cartItem/removeAll/:id", (req,res) => {
        console.log(req.params.id);

        // console.log(req.params.itemIds)
        res.status(200).send({"message": "success"});

    });

    //  ## homepage
    // 1 login
    app.post("/login", (req, res) => {
        console.log(req.query);
        if (req.query.username && req.query.password) {
            res.status(200).send({"message": "success"});

        } else {
            res.status(404).send({"message": "fail"});

        }
    });


    //  ## product
    //  1 get all products or get by request param
    app.get("/product/get", (req,res) => {
        


        let product = {"id": 123, 
                       "productCategory": "product", 
                       "description": "descrip", 
                       "manufacturer": "manu",
                       "name": "name", 
                       "price": 3.5, 
                       "stock": 12345};
        res.status(200).send(product);
    });

    // 2 get product by id
    app.get("/product/:id", (req,res) => {
        console.log(req.params.id);
        let product = {"id": 123, 
                       "productCategory": "product", 
                       "description": "descrip", 
                       "manufacturer": "manu",
                       "name": "name", 
                       "price": 3.5, 
                       "stock": 12345};
        res.status(200).send(product);
    });

    // 3 add product 
    app.post("/product/add", (req, res) => {
        res.status(200).send([])
    });

    // 4 edit product
    app.put("/product/edit/:id", (req, res) => {
        console.log(req.params.id)
        res.status(200).send([]);
    });

    // 5 delete product by id
    app.delete("product/delete/:ids", (req,res) => {


    });


    // # order
    //  1 get orders by user
    app.get("/order/get/:userId", (req, res) => {


        // return list order 
    })
}