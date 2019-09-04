// Exercise 15: Discounts

// api context
const apiContext = require('mozu-node-sdk/clients/platform/application')();
// api resources
const discountResource = require('mozu-node-sdk/clients/commerce/catalog/admin/discount')(apiContext);
// 1.
const discountBody = {
    "content": {
        "localeCode": "en-US",
        "name": "10% Off Order"
    },
    "scope": "Order",
    "target": {
        "type": "Product"
    },
    "amount": 10.0000,
    "amountType": "Percentage",
    "status": "Active",
}

discountResource.createDiscount({}, {
    body: discountBody
}).then(console.log);