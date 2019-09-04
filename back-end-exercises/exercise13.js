// instantiate API context object
const apiContext = require('mozu-node-sdk/clients/platform/application')();
// define API resources
const customerAccountResource = require('mozu-node-sdk/clients/commerce/customer/customerAccount')(apiContext);
const customerContactResource = require('mozu-node-sdk/clients/commerce/customer/accounts/customerContact')(apiContext);
const creditResource = require('mozu-node-sdk/clients/commerce/customer/credit')(apiContext);
/*
 * Exercise 13.1 GET CUSTOMER ACCOUNTS
 */
customerAccountResource.getAccounts().then(console.log);

customerAccountResource.getAccount({
    accountId: 1050
}).then(console.log);

customerAccountResource.getAccounts({
    filter: 'emailAddress eq <emailaddress>'
}).then(console.log);

creditResource.getCredits({
    filter: 'customerId eq 1050'
}).then(console.log);
 /*
 * Exercise 13.2 CREATE A NEW CUSTOMER ACCOUNT
 */
// 1.
const accountBody = {
    account: {
        acceptsMarketing: true,
        accountType: "B2C",
        username: "me@kibocommerce.com",
        emailAddress: "me@kibocommerce.com",
        isActive: true,
        firstName: "YourFirstName",
        lastName: "YourLastName",
        isAnonymous: false,
        taxExempt: false
    },
    password: 'test1234',
    isImport: true
};

// 2.
customerAccountResource.addAccountAndLogin({}, {
    body: accountBody
}).then(console.log);

// 3.
const contactBody = {
    address: {
       address1: "717 N Harwood St",
       addressType: "Commercial",
       cityOrTown: "Dallas",
    countryCode: "US",
    isValidated: "false",
    postalOrZipCode: "75201",
    stateOrProvince: "TX"
    },
    email: "andrew.goode@kibocommerce.com",
    firstName: "Andrew",
    lastNameOrSurname: "Goode",
    phoneNumbers: {
       mobile: "1231231234"
    },
    types: [
       {
          isPrimary: "true",
          name: "Shipping"
       }
    ]
 }

 customerContactResource.addAccountContact({
     accountId: 1050
 }, {
     body: contactBody
 }).then(console.log);

// 4.

const creditBody1 = {
    activationDate: new Date(),
    code: "credit1",
    creditType: "StoreCredit",
    currencyCode: "USD",
    currentBalance: "25",
    customCreditType: "string",
    initialBalance: "25"
}
const creditBody2 = {
    activationDate: new Date(),
    code: "credit2",
    creditType: "StoreCredit",
    currencyCode: "USD",
    currentBalance: "100",
    customCreditType: "string",
    initialBalance: "100",
    customerId: "1050"
}

creditResource.addCredit({}, {
    body: creditBody1
}).then(console.log);

creditResource.addCredit({}, {
    body: creditBody2
}).then(console.log);