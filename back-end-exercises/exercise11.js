// instantiate API context object
const apiContext = require('mozu-node-sdk/clients/platform/application')();
// define API resources
const productResource = require('mozu-node-sdk/clients/commerce/catalog/admin/product')(apiContext);

const logResult = (data) => console.log(data);
/*
 * Exercise 11.1 INTERACTING WITH PRODUCTS
 */

// gets all products
productResource.getProducts()
    .then(console.log)
    .catch(console.log);

// get count of configurable oridycts
productResource.getProducts({
    pageSize: 200
})
    .then(data => {
        var totalConfigurableProducts = 0;
        data.items.forEach(item => {
            if (item.hasConfigurableOptions) {
                totalConfigurableProducts++;
            }
        });
        console.log(totalConfigurableProducts);
    })
    .catch(logResult);

// get count of non configurable products
productResource.getProducts({
    pageSize: 200
})
    .then(data => {
        let totalNonConfigurableProducts = 0;
        data.items.forEach(item => {
            if (!item.hasConfigurableOptions) {
                totalNonConfigurableProducts++;
            }
        });
        console.log(totalNonConfigurableProducts);
    })
    .catch(logResult);
    
/*
 * Exercise 11.2 CREATE A NEW PRODUCT
 */

const productBody = {
    content: {
        productName: "Sporty Handbag",
        localeCode: "en-US"
    },
    productCode: "bag-2001",
    price: {
        isoCurrencyCode: "USD",
        price: 29.99
    },
    productTypeId: 6,
    fulfillmentTypesSupported: "DirectShip",
    productUsage: "Standard",
    packageHeight: {
        unit: "in",
        value: "7"
     },
     packageLength: {
        unit: "in",
        value: "10.25"
     },
     packageWeight: {
        unit: "lbs",
        value: "2.25"
     },
     packageWidth: {
        unit: "in",
        value: "3"
     }
};

const createProduct = () => {
    productResource.addProduct({}, {
        body: productBody
    })
        .then(logResult)
        .catch(logResult);
}

productResource.getProduct({
    productCode: "bag-2001"
})
    .then(logResult)
    .catch(createProduct);
