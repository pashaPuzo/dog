// Init jQuery
import jquery from "jquery";
window.jQuery = jquery;
window.$ = jquery;

import svg4evrybody from "svg4everybody";

// Init local libs
import DynamicAdapt from "./libs/dynamic-adaptive";
import testWebP from "./libs/webp";

import Modal from "./libs/modal"

// You code
document.addEventListener("DOMContentLoaded", () => {
    /* Инит для SVG */
    svg4evrybody();

    /* Использование WebP в CSS background */
    testWebP((support) => {
        if (support == true) document.querySelector("body").classList.add("webp");
        else document.querySelector("body").classList.add("no-webp");
    });

    /* Инит динамического адаптива */
    const da = new DynamicAdapt("max");
    da.init();

    /* Инит модалок */
    let modal = new Modal;

    let body = $("body");
});
