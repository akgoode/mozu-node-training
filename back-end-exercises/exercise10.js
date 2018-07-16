// instantiate API context object
const apiContext = require('mozu-node-sdk/clients/platform/application')();
// define API resources
const productTypeResource = require('mozu-node-sdk/clients/commerce/catalog/admin/attributedefinition/productType')(apiContext);
const attributeResource = require('mozu-node-sdk/clients/commerce/catalog/admin/attributedefinition/attribute')(apiContext);

/*
 * Exercise 10.1 INTERACTING WITH PRODUCT TYPES
 */

// loop through all options
// output options
productTypeResource.getProductTypes({
    filter: "name eq Footwear"
})
    .then(d => {
        d.items.forEach(item => {
            item.options.forEach(option => {
                option.vocabularyValues.forEach(vocabularyValue => {
                    console.log(vocabularyValue.value);
                });
            });
        });
    })
    .catch(e => {
        console.log(e);
    });


/*
 * Exercise 10.2
 * Add extra monogram to Footwear product type
 */

// helper function
const logResult = function (data) {
    console.log(data);
};

const fetchProductTypeSuccess = function (productTypeData) {
        // get attribute we want to add to product type
        attributeResource.getAttribute({
            attributeFQN: "tenant~monogram"
        })
            .then(data => fetchAttributeSuccess(data, productTypeData.items[0]))
            .catch(logResult);
};

const fetchAttributeSuccess = function (attributeData, productTypeData) {
    // adds the attribute to the extras array of the product type
    productTypeData.extras.push(attributeData);

    // updates the product type with the data we just changed
    productTypeResource.updateProductType({
        productTypeId: productTypeData.id
    }, {
        body: productTypeData
    })
        .then(logResult)
        .catch(logResult);
};

// gets product type by name
productTypeResource.getProductTypes({
    filter: "name eq Footwear"
})
    .then(data => fetchProductTypeSuccess(data))
    .catch(logResult);
