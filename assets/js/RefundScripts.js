import {
    address_reg,
    checkFields,
    loading_div,
    sale_id_reg,
    total_points_reg,
    validateOnKeyPressings
} from "./Script.js";

let sale_id_add = $("#refund-sales-id-add");
let description_add = $("#refund-description-add");
let qty_add = $("#refund-qty-add");

let selected_sale = null;
let cart_list_ar = [];

validateOnKeyPressings([sale_id_add , description_add , qty_add] , [sale_id_reg , address_reg , total_points_reg])

sale_id_add.on('keydown' , function (e) {
    if (
        (e.keyCode ===  13) &&
        checkFields([sale_id_reg] , [sale_id_add] , ["Sale Id"])
    ) {
        loading_div.show();
        $.ajax({
            url: `http://localhost:8080/hello-shoe/api/v1/sale/${sale_id_add.val()}`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {

                console.log(new Date(data.date));
                console.log(new Date(Date.now()));
                const diffInMs = new Date(Date.now()) - new Date(data.date);

                const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
                console.log(diffInDays);

                if (diffInDays > 3) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sale Refund Date Expired',
                        text: 'There are over 3 days sorry !'
                    });

                    loading_div.hide();
                    return;
                }

                selected_sale = data;

                console.log(selected_sale);
                loading_div.hide();

                cart_list_ar = selected_sale.saleCartDTOList;
                loadItemCartRefundAdd(selected_sale.saleCartDTOList , true);

            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Sale load failed',
                    text: 'Check Sale Id !'
                });
                $('#response').text('Error: ' + error);
                loading_div.hide();

                selected_sale = null;
                cart_list_ar = [];
                loadItemCartRefundAdd(cart_list_ar , true);
            }
        });

    } else {


    }

});

function loadItemCartRefundAdd(saleItemCartList, withBtns) {

    let tempWrapperHTML = "";

    saleItemCartList.map(function (cartItem) {
        let tempSize = cartItem.size.startsWith("SIZE_") ? cartItem.size.split("_")[1] : cartItem.size.charAt(0);

        let tempBorderStyle = `1px solid ${cartItem.colour}`;

        let temp_url = `url('${cartItem.image}')`;

        if (withBtns) {

            tempWrapperHTML += `
                    <div class="cart-item" data-cart-item-index=${cartItem.itemIndex}>
                        <div class="cart-item-close-btn"></div>
                        <div class="cart-item-img" style="background-image: ${temp_url}"></div>
                        <div class="cart-item-body-wrapper">
                            <h4 class="cart-item-name">${cartItem.description}</h4>
                            <div class="size" style="background-color: darkgray">${tempSize}</div>
                            <div class="colour" style="border: ${tempBorderStyle}">
                                <div style="background-color: ${cartItem.colour}"></div>
                            </div>
                            <div class="price-single">${cartItem.priceSingle} LKR</div>
                            <h4 class="cart-item-code">${cartItem.iCode}</h4>
                            <div class="qty-adjuster-wrapper">
                                <i class="fi fi-rr-minus"></i>
                                <span>${cartItem.qty}</span>
                                <i class="fi fi-rr-plus"></i>
                            </div>
                            <div class="price-all">${cartItem.priceTotal} LKR</div>
                        </div>
                    </div>
            `

        } else {
            tempWrapperHTML += `
                    <div class="cart-item" data-cart-item-index=${cartItem.itemIndex}>
                        <div class="cart-item-close-btn"></div>
                        <div class="cart-item-img" style="background-image: ${temp_url}"></div>
                        <div class="cart-item-body-wrapper">
                            <h4 class="cart-item-name">${cartItem.description}</h4>
                            <div class="size" style="background-color: darkgray">${tempSize}</div>
                            <div class="colour" style="border: ${tempBorderStyle}">
                                <div style="background-color: ${cartItem.colour}"></div>
                            </div>
                            <div class="price-single">${cartItem.priceSingle} LKR</div>
                            <h4 class="cart-item-code">${cartItem.iCode}</h4>
                            <div class="qty-adjuster-wrapper">
                                <span>${cartItem.qty}</span>
                            </div>
                            <div class="price-all">${cartItem.priceSingle} LKR</div>
                        </div>
                    </div>
            `
        }

    });

    $("#refund-sec #refund-add-wrapper .item-cart-wrapper").html(tempWrapperHTML);

}

// $("#refund-sec .item-cart-wrapper").on('click', '.qty-adjuster-wrapper > i:first-child', function () {
//     let cartItem = getSaleCartItem($(this).closest(".cart-item").data("cart-item-index"));
//     if (cartItem.qty - 1 === 0) {
//         return;
//     }
//
//     cartItem.qty -= 1;
//     cartItem.priceTotal = cartItem.priceSingle * cartItem.qty;
//
//     editQtyHolder(cartItem, false);
//
//     qtyAdjusterValuesSet(cartItem);
//
// });
//
// $("#refund-sec .item-cart-wrapper").on('click', '.qty-adjuster-wrapper > i:nth-child(3)', function () {
//     let cartItem = getSaleCartItem($(this).closest(".cart-item").data("cart-item-index") , cart_list_ar);
//
//     cart_list_ar.map(function (saleItem) {
//         if (saleItem.iCode !== cartItem.iCode) {
//             return;
//         }
//
//         let holder = saleItem.saleItemQtyHolderDTOList.find(
//             qtyHolder =>
//                 qtyHolder.size === cartItem.size &&
//                 qtyHolder.colour === cartItem.colour
//         );
//
//         isOk = holder.qty !== 0;
//
//     });
//
//     if (!isOk) {
//         Swal.fire({
//             icon: 'info',
//             title: 'Out Of Stock',
//             text: 'Out of stock with this colour and size !'
//         });
//         return;
//     }
//
//     cartItem.qty += 1;
//     cartItem.priceTotal = cartItem.priceSingle * cartItem.qty;
//
//     editQtyHolder(cartItem, true);
//
//     qtyAdjusterValuesSet(cartItem);
//
// });
//
// function qtyAdjusterValuesSet(cartItem) {
//     $("#sale-sec .item-cart-wrapper > .cart-item").map(function () {
//         let tempCard = getSaleCartItem($(this).data("cart-item-index") , cart_list_ar);
//
//         if (tempCard.itemIndex === cartItem.itemIndex) {
//             $(this).closest(".cart-item").find(".qty-adjuster-wrapper > span").html(cartItem.qty);
//             $(this).closest(".cart-item").find(".price-all").html(cartItem.priceTotal + "LKR");
//             return;
//         }
//
//     });
//
//     calcTotal(saleItemCartList);
// }
//
// function getSaleCartItem(index , list) {
//     return list.find(saleCartItem => saleCartItem.itemIndex === index);
//
// }



