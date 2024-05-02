$(".toggle-btn-2").on("click", () => {
    $(".side-bar-body").hide();
    $(".customer-details-wrapper").show();

    toggleBtnColorChanger($(".toggle-btn-2") , $(".toggle-btn-1"));

});

$(".toggle-btn-1").on("click", () => {
    $("#side-bar-body").show();
    $("#customer-details-wrapper").hide();

    toggleBtnColorChanger($(".toggle-btn-1") , $(".toggle-btn-2"));

});

$(".toggle-btn-1").click();

// $("#customer-toggle-btn").click();
function toggleBtnColorChanger(btn1 , btn2) {
    btn1.css({"backgroundColor": "var(--light-green)"});
    btn2.css({"backgroundColor": "unset"});

}

// $(".body-wrapper").css({"padding-top": "0" , "margin-top":"144px" , "height":"1000px" , "backgroundColor":"blue" });

// $(".filter-btn-set-wrapper").hide();
// $("#filter-btn").hide();
// $("#body-item-wrapper").hide();

$("#sale-sec").hide();

