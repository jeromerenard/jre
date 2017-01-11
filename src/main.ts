import * as $ from "jquery";
import "./main.scss";
import "../node_modules/normalize.css/normalize.css";

$(() => {
    let pageTurnTimeout: number | undefined = undefined;

    $(".side-panel").click(() => {
        const root: JQuery = $("#root");

        if (pageTurnTimeout) {
            window.clearTimeout(pageTurnTimeout);
        }

        root.addClass("turning-page");
        root.toggleClass("view-page-2");

        pageTurnTimeout = window.setTimeout(() => {
            root.removeClass("turning-page");
            pageTurnTimeout = undefined;
        }, 1100);
    });
});

