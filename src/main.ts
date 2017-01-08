import * as $ from "jquery";
import "./main.scss";
import "../node_modules/normalize.css/normalize.css";

$(() => {
    $(".side-panel").click(() => $("#root").toggleClass("shift-left"));
});