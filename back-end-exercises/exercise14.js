// Exercise 14: Interacting with Orders

// api context object
const apiContext = require('mozu-node-sdk/clients/platform/application')();
// instantiate resources
const orderResource = require('mozu-node-sdk/clients/commerce/order')(apiContext);
const paymentResource = require('mozu-node-sdk/clients/commerce/payments/publicCard')(apiContext);
const orderPaymentResource = require('mozu-node-sdk/clients/commerce/orders/payment')(apiContext);
const orderPackageResource = require('mozu-node-sdk/clients/commerce/orders/package')(apiContext);
const orderFulfillmentResource = require('mozu-node-sdk/clients/commerce/orders/fulfillmentAction')(apiContext);

// 1.  Get Existing Orders
orderResource.getOrders().then(console.log);

orderResource.getOrders({
    filter: "orderNumber eq 62"
}).then(console.log);

const filter = "createDate lt 2019-09-04 and createDate gt 2019-09-02"
orderResource.getOrders({
    filter: filter
}).then(console.log);

orderResource.getOrders({
    filter: "status eq pending"
}).then(console.log);

orderResource.getOrders({
    filter: "paymentStatus eq paid"
}).then(data => {
    data.items.forEach(item => {
        console.log(`Order ${item.orderNumber} created: ${item.auditInfo.createDate}`);
        console.log('Payments:');
        item.payments.forEach(payment => {
            console.log(`\tType: ${payment.paymentType} Status: ${payment.status} Date: ${payment.auditInfo.createDate}`);
        });
    });
});



// 2.  Update Order Payments

// get card id for authorization
const orderId = '0e705c70153e1e1a2cccd26d0000639f';
const paymentId = '9a456e5a116a42e893fdaabe0121b6c4';
const packageId = '480a3039290b4099b352aabe012fdcb3';
paymentResource.create({}, {
    body: {
        cardNumber:"4111111111111111",
        cardholderName:"Andrew Goode",
        cardType:"VISA",
        cvv:"111"
    }
}).then(cardData => {
    orderPaymentResource.performPaymentAction({
        orderId: orderId
    }, {
        body: {
            actionName: 'AuthorizePayment',
            currencyCode: "USD",
            amount: 125,
            newBillingInfo: {
                billingContact: {
                    address: {
                        candidateValidatedAddresses: null,
                        countryCode: "US",
                        addressType: "Residential",
                        address1: "717 N HARWOOD ST",
                        stateOrProvince: "TX",
                        cityOrTown: "DALLAS",
                        postalOrZipCode: "75201-6501",
                        address2: "",
                        isValidated: true
                    },
                    orderId: orderId,
                    firstName: "Andrew",
                    lastNameOrSurname: "Goode",
                    phoneNumbers: {
                        home: "2342342345"
                    },
                    email: "andrew.goode@kibocommerce.com"
                },
                paymentWorkflow: "Mozu",
                check: {},
                card: {
                    "cardNumberPartOrMask": "************1111",
                    "cvv": "***",
                    "nameOnCard": "Andrew Goode",
                    "paymentOrCardType": "VISA",
                    "paymentServiceCardId": cardData.id,
                    "expireMonth": 4,
                    "expireYear": 2024
                },
                "orderId": orderId,
                "paymentType": "CreditCard",
                "isSameBillingShippingAddress": true
            }
        }
    }).then(console.log);
});


orderPaymentResource.getAvailablePaymentActions({
    orderId: orderId,
    paymentId: paymentId
}).then(console.log);

orderResource.getAvailableActions({
    orderId: orderId
}).then(console.log);

orderResource.performOrderAction({
    orderId: orderId
}, {
    body: {
        actionName: 'ValidateOrder'
    }
}).then(console.log);
// 3.  Update Order Fulfillment
orderPackageResource.createPackage({
    orderId: orderId
}, {
    body: {
        "code": orderId + '-1',
        "fulfillmentDate": Date().now,
        "fulfillmentLocationCode": "homebase",
        "hasLabel": "true",
        "items": [
            {
                "fulfillmentItemType": "Physical",
                "lineId": "9734bb5ab8674ebdb257aabe012c2ea7",
                "optionAttributeFQN": "tenant~shoesize",
                "productCode": "1002-1",
                "quantity": 1
            }
        ],
        "measurements": {
            "height": {
                "unit": "in",
                "value": 1.00
            },
            "length": {
                "unit": "in",
                "value": 1.00
            },
            "weight": {
                "unit": "lbs",
                "value": 1.00
            },
            "width": {
                "unit": "in",
                "value": 1.00
            }
        },
        "packagingType": "Carrier_Box_Small",
        "shippingMethodCode": "cf36feeccb4540aaa569dca206f25c6d",
        "shippingMethodName": "Flat Rate",
        "status": "NotFulfilled",
        "trackingNumber": "234jkl32lkj32432"
    }
}).then(console.log);

orderPackageResource.getAvailablePackageFulfillmentActions({
    orderId: orderId,
    packageId: packageId
}).then(console.log);

orderFulfillmentResource.performFulfillmentAction({
    orderId: orderId
}, {
    body: {
        "actionName": "Ship",
        "packageIds": [packageId]
    }
}).then(console.log);
// 4.  Duplicate an Order (for importing legacy orders)

// 5.  Event Handling (Orders)