import {loading_div} from "./Script.js";

let saleItemList = null;

$("#sales-nav-btn").on('click', function () {
    console.log("hello");
    getAllItems();

});

// fetch all items
function getAllItems() {
    loading_div.show();
    $.ajax({
        url: 'http://localhost:8080/hello-shoe/api/v1/item/getAll',
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            saleItemList = data;

            console.log(data.length);
            console.log("ok");
            loading_div.hide();

            loadItemCards(saleItemList);


        },
        error: function (xhr, status, error) {
            loading_div.hide();
            Swal.fire({
                icon: 'error',
                title: 'Suppliers load failed',
                text: 'Try again!'
            });
            // $('#response').text('Error: ' + error);
        }
    });

}

function loadItemCards(itemList) {
    let itemCardSetWrapper = $("#body-item-wrapper");
    itemCardSetWrapper.html("");

    let itemCardListHtml = "";

    itemList.map(function (saleItem) {
        let temp_url = `url('${saleItem.saleItemImageHolderDTOList[0].image}')`;
        var tempStyle = 'background-image:' + temp_url


        itemCardListHtml +=
            `
                <div class="sale-item-card" data-sale-item={JSON.stringify(saleItem)}>
                    <div class="sale-item-img" style=${tempStyle}></div>
                    <div class="sale-item-body">
                        <h4 class="sale-item-name">${saleItem.description}</h4>
                        <h4 class="sale-item-id">${saleItem.iCode}</h4>
                        <div class="sale-item-category-set">
                            ${getTags(saleItem.tags)}
                        </div>

                        <div class="size-set-wrapper">
                            <span>Size</span>

                            ${getSizes(saleItem.availableSizeList)}

                        </div>

                        <div class="colour-set-wrapper">
                            <span>Colour</span>

                            ${getColours(saleItem.availableColourList)}
                        </div>

                        <div class="sale-item-price">${saleItem.price} LKR</div>

                        <div class="add-to-cart-btn">Add to cart</div>
                    </div>
                </div>
        `

    });

    itemCardSetWrapper.html(itemCardListHtml);

}

function getTags(tagList) {
    let tempTags = "";

    tagList.map(function (tag) {
        tempTags += `<span>${tag} </span>`;
    });

    return tempTags;

}

function getSizes(sizeList) {
    let tempSizeList = "";

    sizeList.map(function (size) {
        tempSizeList += `<span class="sale-item-size">${size.split("_")[1]}</span>`;
    });

    return tempSizeList;

}

function getColours(colourList) {
    let tempColourList = "";

    colourList.map(function (colour) {
        let tempColour = "";

        switch (colour) {
            case "GREEN": tempColour="green"; break;
            case "BLUE": tempColour="blue"; break;
            case "RED": tempColour="red"; break;
            case "OTHER": tempColour="grey"; break;
        }

        var style = "background-color:" + tempColour;

        tempColourList += `<div class="sale-item-colour ${tempColour}" style=${style}></div>`;

    });


    return tempColourList;

}







