import * as $ from "jquery";
import "../node_modules/normalize.css/normalize.css";
import "./main.scss";
import "./player.js";
import * as inobounce from "inobounce";
import { router } from "./router";

const root = $("#root");
let onPage1 = true;
let currentSection = 1;
let pageSwitchTimeout: number | undefined = undefined;

inobounce.enable();

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

function section(index: number) {
    $("#section-container > .section").each((i, e) => {
        if (i === index) $(e).addClass("active");
        else $(e).removeClass("active");
    });

    $("#top-menu > a").each((i, e) => {        
        if (i === index) $(e).addClass("active");
        else $(e).removeClass("active"); 
    })

}

router
    .on("/", () => {
        page1();
    })
    .on("/about", () => {
        page2();
        section(0);
    })
    .on("/what-i-do", () => {
        page2();
        section(1);
    })
    .on("/studio", () => {
        page2();
        section(2);
    })
    .on("/works", () => {
        page2();
        section(3);
    })
    .on("/contact", () => {
        page2();
        section(4);
    })
    /*.on("/project", () => { // Add test
        page2();
        section(5);
    })*/
    .listen();