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
import tabs from "./libs/tabs";
// require('./libs/disabled-copy');

import Swiper from "swiper";
import SwiperCore, { Navigation } from "swiper/core"
SwiperCore.use([Navigation]);

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

    /* Табы */
    tabs('.tabs');

    let body = $("body");

    body.on('click', '.js-input-group-edit', function () {
        let parent = $(this).closest('.input-group--edit');
        let button = parent.siblings('.button');

        parent.toggleClass('active');
        parent.find('input').prop('disabled', !parent.find('input').prop('disabled'));
        parent.find('input').prop('readonly', !parent.find('input').prop('readonly'));
    });

    body.on('click', '.product--radio', function(e){
        e.preventDefault();

        $(this).find('input[type="radio"]').prop('checked', true).trigger('change');
    });


    const setHeaderHeight = () => {
        let headerHeight = $('.header--transparent').height();
        if ( headerHeight !== 0 ) {
            $('.content').css({
                marginTop: -headerHeight + "px",
            });
        }
    }

    $(window).on('resize load', setHeaderHeight);

    const initHomeInfo = () => {
        let slides = document.querySelectorAll('.swiper-container.home-info__slider');

        const setOffsetAfterBlock = ( selector, offset = { top: 0, bottom: 0 } ) => {
            selector.nextElementSibling.classList.add('js-has-element-translate');
            selector.nextElementSibling.style.marginTop = `-${ offset.top }px`;
            selector.nextElementSibling.style.paddingTop = `${ offset.top / 2 }px`;
        }

        slides.forEach(slider => {
            let infoSlider = new Swiper(slider, {
                autoHeight: true,
                loop: true,
                on: {
                    transitionEnd: (swiper) => {
                        let sliderHeight = swiper.slides[swiper.activeIndex].clientHeight;
                        setOffsetAfterBlock(slider.closest('.home-info'), { top: sliderHeight, bottom: 0 });
                    }
                }
            });

            let infoSliderPrev = slider.closest('.home-info').querySelector('.home-info__prev')
            let infoSliderNext = slider.closest('.home-info').querySelector('.home-info__next')

            infoSliderPrev.addEventListener('click', () => {
                infoSlider.slidePrev();
            });

            infoSliderNext.addEventListener('click', () => {
                infoSlider.slideNext();
            });
        });
    }
    initHomeInfo();




});
