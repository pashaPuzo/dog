// Init jQuery
import jquery from "jquery";
window.jQuery = jquery;
window.$ = jquery;

import svg4evrybody from "svg4everybody";

// Init local libs
import DynamicAdapt from "./libs/dynamic-adaptive";
import testWebP from "./libs/webp";

import Modal from "./libs/modal";
import qty from "./libs/qty";
require('./libs/disabled-copy');

import "simplebar";


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

    /* Модуль кол-ва шт */
    qty('.qty', ( result, block ) => {
        if ( result && block ) {
            let price = `${result} ₽`;
            block.querySelector('.qty__result').innerHTML = price;
        }
    });

    let body = $("body");

    body.on('click', '.js-input-group-edit', function () {
        let parent = $(this).closest('.input-group--edit');
        let button = parent.siblings('.button');

        parent.toggleClass('active');
        parent.find('input').prop('disabled', !parent.find('input').prop('disabled'));
        parent.find('input').prop('readonly', !parent.find('input').prop('readonly'));
    });
    
});
