$(function() {
    disabledBtn();
});

function disabledBtn() {
    $("#search-btn").attr("disabled", "disabled");
    if ($("#search-input").val() !== "") {
        $("#search-btn").removeAttr("disabled");
    }
}

$("#search-input").on("keyup", disabledBtn)