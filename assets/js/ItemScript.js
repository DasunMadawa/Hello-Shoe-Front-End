import {ItemModel} from "../models/ItemModel.js";
import {SupplierModel} from "../models/SupplierModel.js";
import {StockModel} from "../models/StockModel.js";
import {ItemImageModel} from "../models/ItemImageModel.js";
import {
    validateOnKeyPressings,
    checkSelectFields,
    checkDateFieldsDifferences,
    checkFields,
    checkDateFields,
    name_reg,
    address_reg,
    mobile_no_reg,
    email_reg,
    postal_code_reg,
    loading_div,
    password_reg,
    item_code_reg,
    price_reg
} from "./Script.js";

let items_ar = null;
let suppliers_ar = null;
let items_ar_search_bar = null;
let item = null;
let item_image_ar = [];

let update_btn_items = false;

let image_green_add = null;
let image_blue_add = null;
let image_red_add = null;
let image_others_add = null;

let image_green = null;
let image_blue = null;
let image_red = null;
let image_others = null;

let item_table = $("#item-sec .customer-table > table");
let item_table_tbody = $("#item-sec .customer-table > table > tbody");

let selected_item = $("#item-sec .sale-order-id");

let item_code_add = $("#item-code-add");
let item_description_add = $("#item-description-add");
let category_add = $("#item-category-add");
let price_buy_add = $("#item-price-buy-add");
let price_sell_add = $("#item-price-sell-add");
let supplier_add = $("#item-supplier-add");

let img_green_holder_add = $("#green-img-holder-add");
let img_blue_holder_add = $("#blue-img-holder-add");
let img_red_holder_add = $("#red-img-holder-add");
let img_others_holder_add = $("#others-img-holder-add");

let img_green_add_file_chooser = $("#green-shoes-img");
let img_blue_add_file_chooser = $("#blue-shoes-img");
let img_red_add_file_chooser = $("#red-shoes-img");
let img_others_add_file_chooser = $("#others-shoes-img");

// add list
let reg_list = [
    item_code_reg,
    name_reg,
    price_reg,
    price_reg

];

let input_list_add = [
    item_code_add,
    item_description_add,
    price_buy_add,
    price_sell_add

];

let mg_list_field_validation = [
    "The Item CODE",
    "item description",
    "price buy",
    "price sell"

];

validateOnKeyPressings(input_list_add, reg_list);

$("#items-nav-btn").click(function () {
    // loading_div.show();

    fetchAllSuppliers()
    // update_btn_supplier = false;
    // fieldsSetEditable(false);
});


[supplier_add , category_add].map(function (select_field) {
    select_field.change(function () {
        checkSelectFields([select_field]);
    });
});

// suppliers load
function fetchAllSuppliers() {
    $.ajax({
        url: 'http://localhost:8080/hello-shoe/api/v1/supplier',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            suppliers_ar = data;
            loadSuppliers();

        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Suppliers load failed',
                text: 'Try again!'
            });
            // $('#response').text('Error: ' + error);
        }
    });

}

function loadSuppliers() {
    supplier_add.empty();
    supplier_add.append('<option value="" selected hidden>Select Supplier</option>');

    suppliers_ar.map(function (supplier) {
        supplier_add.append(`<option value=${supplier.supplierId} >${supplier.supplierName}</option>`);

    });

}

// profile pic action
function setProfilePicAction(imgHolder, fileChooser, isUpdateImgHolders) {
    imgHolder.click(function () {
        if (isUpdateImgHolders && !update_btn_items) {
            return;
        }
        fileChooser.click();

    });
}

function setProfilePicFileChooserAction(imgHolder, fileChooser) {
    fileChooser.change(function (event) {
        var file = event.target.files[0];

        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgHolder.css('background-image', 'url(' + e.target.result + ')');

                if (imgHolder.is(img_green_holder_add)) {
                    image_green_add = e.target.result;
                } else if (imgHolder.is(img_blue_holder_add)){
                    image_blue_add = e.target.result;
                } else if (imgHolder.is(img_red_holder_add)){
                    image_red_add = e.target.result;
                } else if (imgHolder.is(img_others_holder_add)){
                    image_others_add = e.target.result;
                }

            };
            reader.readAsDataURL(file);
        }

    });
}

setProfilePicAction(img_green_holder_add, img_green_add_file_chooser, false);
setProfilePicAction(img_blue_holder_add, img_blue_add_file_chooser, false);
setProfilePicAction(img_red_holder_add, img_red_add_file_chooser, false);
setProfilePicAction(img_others_holder_add, img_others_add_file_chooser, false);

setProfilePicFileChooserAction(img_green_holder_add, img_green_add_file_chooser);
setProfilePicFileChooserAction(img_blue_holder_add, img_blue_add_file_chooser);
setProfilePicFileChooserAction(img_red_holder_add, img_red_add_file_chooser);
setProfilePicFileChooserAction(img_others_holder_add, img_others_add_file_chooser);


// save Item
$("#save-item-btn").click(function () {

    if (
        checkFields(reg_list, input_list_add, mg_list_field_validation) &&
        checkSelectFields([supplier_add , category_add]) &&
        checkImgHolders(true)
    ) {
        console.log("OK");
        loading_div.show();

        console.log(JSON.stringify(getAddPageFieldValues()));

        // $.ajax({
        //     url: `http://localhost:8080/hello-shoe/api/v1/item`,
        //     method: 'POST',
        //     dataType: 'json',
        //     contentType: 'application/json',
        //     data: getAddPageFieldValues(),
        //     success: function (data) {
        //         // customer = data;
        //
        //         loading_div.hide();
        //
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Item Saved',
        //             text: ""
        //         });
        //
        //         // clearAddFields();
        //         // fetchAllCustomers();
        //     },
        //     error: function (xhr, status, error) {
        //         loading_div.hide();
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Customer save failed',
        //             text: 'Check duplicate emails !'
        //         });
        //         $('#response').text('Error: ' + error);
        //     }
        // });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Fill fields correctly !'
        });
    }

});

function getAddPageFieldValues() {
    return new ItemModel(
        item_code_add.val(),
        item_description_add.val(),
        category_add.val(),
        price_buy_add.val(),
        price_sell_add.val(),
        getSupplier(),
        getStockList(),
        item_image_ar
    );

}

function getSupplier() {
    return new SupplierModel(
        supplier_add.val(),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    );

}

function getStockList() {
    item_image_ar = [];

    let temp_ar = [];
    let temp_img_ar = [image_green_add, image_blue_add, image_red_add, image_others_add];
    let temp_colour_ar = ["GREEN", "BLUE", "RED", "OTHER"];

    L1:for (let i = 0; i < temp_img_ar.length; i++) {
        if (temp_img_ar[i] == null) {
            continue L1;
        }

        item_image_ar.push(
            new ItemImageModel(
                temp_colour_ar[i].charAt(0) + "",
                temp_img_ar[i]
            )
        );

        for (let j = 5; j <= 11; j++) {
            temp_ar.push(
                new StockModel(
                    "SIZE_" + j,
                    0,
                    50,
                    temp_colour_ar[i],
                    "NOT_AVAILABLE",
                    temp_colour_ar[i].charAt(0) + ""
                )
            );

        }

    }

    return temp_ar;

}

function checkImgHolders(isAddHolders) {
    if (isAddHolders) {
        return (image_green_add != null || image_blue_add != null || image_red_add != null || image_others_add != null);

    } else {
        return (image_green != null || image_blue != null || image_red != null || image_others != null);


    }


}



