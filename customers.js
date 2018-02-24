const apiContext = require('mozu-node-sdk/clients/platform/application')();
const customerAccountResource = require('mozu-node-sdk/clients/commerce/customer/customerAccount')(apiContext);

const categoryResource = require('mozu-node-sdk/clients/commerce/catalog/admin/category')(apiContext);

// categoryResource.getCategory({
//     categoryId: 4
// })
//     .then(data => {
//         console.log(JSON.stringify(data, 2, 2));
//     })
//     .catch(error => {
//         console.log(error);
//     });

categoryResource.addCategory({
    incrementSequence: 0,
    useProvidedId: false
}, {
    body: {
        catalogId: 1,
        categoryCode: 'newCat3',
        categoryType: 'Static',
        isActive: true,
        isDisplayed: true,
        parentCategoryCode: "4",
        parentCategoryId: 4,
        content: {
            categoryImages: [],
            description: "string",
            localeCode: "en-US",
            metaTagDescription: "string",
            metaTagKeywords: "string",
            metaTagTitle: "string",
            name: "New Category",
            pageTitle: "string",
            slug: "string"
        },
    }
})
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(JSON.stringify(error, 2, 2));
    });



// customerAccountResource.getAccount({
//     accountId: 1144
// })
//     .then(function(data) {
//         console.log(JSON.stringify(data, 2, 2));
//         let newBody = data;
//         newBody.firstName = "Steve";
//         customerAccountResource.updateAccount({
//             accountId: 1144
//         }, {
//             body: newBody
//         })
//             .then(function(data) {
//                 console.log(JSON.stringify(data, 2, 2));
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     })
//     .catch(error => {
//         console.log(error);
//     });

// customerAccountResource.addAccount({}, {
//     body: {
//         emailAddress: "andrew.goode@kibocommerce.com"
//     }
// })
//     .then(function(data) {
//         console.log(JSON.stringify(data, 2, 2));
//     })
//     .catch(error => {
//         console.log(error);
//     });

// customerAccountResource.updateAccount({
//     accountId: 1144
// }, {
//     body: {
//         firstName: "Andrew",
//         lastName: "Goode",
//         emailAddress: "andrew.goode@kibocommerce.com"
//     }
// })
//     .then(function(data) {
//         console.log(JSON.stringify(data, 2, 2));
//     })
//     .catch(error => {
//         console.log(error);
//     });