$(".toggle-btn-2").on("click", () => {
    $(".side-bar-body").hide();
    $(".side-bar-body-2").show();

    toggleBtnColorChanger($(".toggle-btn-2"), $(".toggle-btn-1"));

});

$(".toggle-btn-1").on("click", () => {
    $(".side-bar-body").show();
    $(".side-bar-body-2").hide();

    toggleBtnColorChanger($(".toggle-btn-1"), $(".toggle-btn-2"));

});

$(".toggle-btn-1").click();

// $("#customer-toggle-btn").click();
function toggleBtnColorChanger(btn1, btn2) {
    btn1.css({"backgroundColor": "var(--light-green)"});
    btn2.css({"backgroundColor": "unset"});

}

// $(".body-wrapper").css({"padding-top": "0" , "margin-top":"144px" , "height":"1000px" , "backgroundColor":"blue" });

// $(".filter-btn-set-wrapper").hide();
// $("#filter-btn").hide();
// $("#body-item-wrapper").hide();

function navigateSections(section) {
    $("section").hide();

    section.show();

}

// navigateSections($(".sale-sec"));

// $("#admin-panel-nav-btn").click(function () {
//     navigateSections($(""));
//
// });

$("#sales-nav-btn").click(function () {
    console.log("helloooooo");
    navigateSections($("#sale-sec"));

});

$("#items-nav-btn").click(function () {
    navigateSections($("#item-sec"));

});

$("#customers-nav-btn").click(function () {
    navigateSections($("#customer-sec"));

});
//
// $("#suppliers-nav-btn").click(function () {
//     navigateSections($(""));
//
// });
//
// $("#employees-nav-btn").click(function () {
//     navigateSections($(""));
//
// });
//
// $("#resupply-nav-btn").click(function () {
//     navigateSections($(""));
//
// });
//
// $("#refund-nav-btn").click(function () {
//     navigateSections($(""));
//
// });

$("#sale-history-btn").click(function () {
   $("#order-history-body-wrapper").toggle();
   $("#body-item-wrapper").toggle();

});

// $("#item-customer-toggle-set > div").click(function () {
//    $(".item-details-wrapper").hide();
//    // $("").toggle();
//
// });

$("#save-item-btn").click(function () {
    $("#item-add-wrapper").toggle();

});

$("#add-new-item-btn").click(function () {
    $("#item-add-wrapper").toggle();
});

$("#customers-nav-btn").click();


