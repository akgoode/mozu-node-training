// instantiate API context object
const apiContext = require('mozu-node-sdk/clients/platform/application')();
// define API resources
const attributeResource = require('mozu-node-sdk/clients/commerce/catalog/admin/attributedefinition/attribute')(apiContext);
/**
 * Exercise 9.1
 * INTERACTING WITH PRODUCT ATTRIBUTES
 */

// Exercise 9.2
// define the attribute name

var attributeToAdd = {
    adminName: "monogram",
    attributeCode: "monogram",
    dataType: "String",
    inputType: "TextBox",
    isExtra: "true",
    isOption: "false",
    isProperty: "false",
    masterCatalogId: 1,
    namespace: "tenant",
    valueType: "ShopperEntered"
 };

attributeResource.getAttribute({
    attributeFQN: "tenant~monogram"
})
    .then(d => {
        d.content = {
            localeCode: "en-US",
            name: "Monogram",
            description: ''
        };
        attributeResource.updateAttribute({
            attributeFQN: 'tenant~monogram'
        },{
            body: d
        })
            .then(console.log)
            .catch(console.log);
    })
    .catch(console.log);


attributeToAdd = {
    adminName: "purse-size",
    attributeCode: "purse-size",
    dataType: "String",
    inputType: "List",
    isExtra: false,
    isOption: true,
    isProperty: false,
    masterCatalogId: 1,
    namespace: "tenant",
    valueType: "predefined",
    content: {
        localeCode: "en-US",
        name: "Purse-size",
        description: ''
    },
    vocabularyValues: [
        {
            value: "Petite",
            content: {
                localeCode: "en-US",
                stringValue: "Petite"
            },
            displayOrder: 1
        },
        {
            value: "Classic",
            content: {
                localeCode: "en-US",
                stringValue: "Classic"
            },
            displayOrder: 2
        },
        {
            value: "Alta",
            content: {
                localeCode: "en-US",
                stringValue: "Alta"
            },
            displayOrder: 3
        }
    ]
 };

 attributeResource.addAttribute({},{
     body: attributeToAdd
 })
    .then(console.log)
    .catch(console.log);



// 9.2.2
// add attribute values
// add new attribute

// update search options, update attributes, return back only the
// attributeFQN and not the whole object


/*
 * Lesson 9.3 add a new option attribute
 */