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

$("#suppliers-nav-btn").click(function () {
    navigateSections($("#suppliers-sec"));

});

$("#employees-nav-btn").click(function () {
    navigateSections($("#employees-sec"));

});

$("#resupply-nav-btn").click(function () {
    navigateSections($("#resupply-sec"));

});

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


});


///////////////////////////////////////////////////////////////////////////////////

$("#add-new-item-btn").click(function () {
    $("#item-add-wrapper").toggle();

});

$("#add-new-customer-btn").click(function () {
    $("#customer-add-wrapper").toggle();

});

$("#add-new-supplier-btn").click(function () {
    $("#supplier-add-wrapper").toggle();

});

$("#add-new-employee-btn").click(function () {
    $("#supplier-add-wrapper").toggle();

});

$("#add-new-employee-btn").click(function () {
    $("#employees-add-wrapper").toggle();

});




$("#item-form > i:first-child").click(function () {
    $("#item-add-wrapper").toggle();

});

$("#customer-form > i:first-child").click(function () {
    $("#customer-add-wrapper").toggle();

});

$("#supplier-form > i:first-child").click(function () {
    $("#supplier-add-wrapper").toggle();

});

$("#employee-form > i:first-child").click(function () {
    $("#employees-add-wrapper").toggle();

});

$("#resupply-nav-btn").click();


/////////////////////////////////////////////////////////////////////////////////

/*$(document).ready(function(){
    // When the button is clicked, trigger the hidden file input
    $("#photoSelectButton").click(function() {
        $("#photoInput").click();
    });

    // When a photo is selected, handle it
    $("#photoInput").change(function() {
        // Get the selected photo
        var photo = this.files[0];

        // Ensure a photo was selected
        if (photo) {
            // Do something with the photo, such as displaying it
            displayPhoto(photo);
        }
    });

    // Function to display the selected photo
    function displayPhoto(photo) {
        var reader = new FileReader();

        reader.onload = function(e) {
            // Create an image element and set its source to the selected photo
            var img = $("<img>").attr("src", e.target.result);

            // Append the image to a container element
            $("#photoContainer").empty().append(img);
        };

        // Read the selected photo as a data URL
        reader.readAsDataURL(photo);
    }
});*/







