// Exercise 16: Apply a discount to a customer segment 

// api context
const apiContext = require('mozu-node-sdk/clients/platform/application')();

// api resources
const discountResource = require('mozu-node-sdk/clients/commerce/catalog/admin/discount')(apiContext);
const segmentResource = require('mozu-node-sdk/clients/commerce/customer/customerSegment')(apiContext);
// 1.
// discountResource.getDiscount({
//     discountId: 5
// })
//     .then(discount => {
//         // console.log(JSON.stringify(discount, 2, 2));
//         let discountToAdd = discount;
//         discountToAdd.conditions.customerSegments = [{ id: 1 }];

//         discountResource.updateDiscount({
//             discountId: discount.id
//         }, {
//             body: discountToAdd
//         }).then(console.log).catch(console.log);
//     });
// 2.

segmentResource.addSegmentAccounts({
    id: 1
}, {
    body: [ 1050 ]
}).then(console.log);