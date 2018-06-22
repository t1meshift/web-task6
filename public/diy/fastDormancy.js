const placeholderSelector = "#page-content";
const preloaderSelector = "#preloader-container";
let historyStateObj = {};

function showPreloader() {
    $(preloaderSelector).css("top", `calc(50% - 100px + ${$(".navbar").height()}px)`);
    $(placeholderSelector).addClass("content-loading");
    $(preloaderSelector).addClass("loading");

}
function hidePreloader() {
    $(preloaderSelector).removeClass("loading");
    $(placeholderSelector).css("animation", "showContent 0.5s ease-in");
    setTimeout(function () {
        $(placeholderSelector).removeClass("content-loading");
        $(placeholderSelector).css("animation", "");
    }, 495);
}
function fastNavigate(destination, pushState = true) {
    showPreloader();
    $.ajax({
        url: destination,
        dataType: "html",
        success: function (data) {
            $(placeholderSelector).html($(data).filter(placeholderSelector).html());
            bindLinkHandler($(placeholderSelector));
            if (pushState)
                history.pushState(historyStateObj, $(data).find("title"), destination);
            hidePreloader();
        },
        error: function () {
            window.location = destination;
        }
    });
}
function bindLinkHandler(context) {
    context.find("a").filter(function() {
        return this.hostname && this.hostname !== location.hostname;
    }).addClass("link-external"); // marking external links cuz they can't be lazy-loaded

    let selector = context.find("a:not(.link-external)");

    selector.click(function (evt) {
        evt.preventDefault(); // prevent navigating to the destination
        evt.stopPropagation();
        let destination = $(this).attr('href');
        fastNavigate(destination);
    });
}

window.onpopstate = function(evt) {
    fastNavigate(document.location, false);
};

$(document).ready(function() {
    console.log("fresh page load");
    bindLinkHandler($("body"));
});
