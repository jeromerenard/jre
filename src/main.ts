import * as $ from "jquery";
import "./main.scss";
import "../node_modules/normalize.css/normalize.css";
import { router } from './router';

const root = $("#root");
let onPage1 = true;
let pageSwitchTimeout: number | undefined = undefined;

function switchPage() {    
    if (pageSwitchTimeout)
        window.clearTimeout(pageSwitchTimeout);    

    root.addClass("turning-page");
    root.toggleClass("view-page-2");
    onPage1 = !onPage1;

    pageSwitchTimeout = window.setTimeout(() => {
        root.removeClass("turning-page");
        pageSwitchTimeout = undefined;
    }, 1100);
}

function page1() {
    if (!onPage1) switchPage();
}

function page2() {
    if (onPage1) switchPage();
}

router
    .on("/", () => page1()) 
    .on("/about", () => page2())   
    .listen();

// $(() => {
//     $(".side-panel").click(() => switchPage());
// });

