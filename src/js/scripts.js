// Init jQuery
import jquery from "jquery";
window.jQuery = jquery;
window.$ = jquery;

import svg4evrybody from "svg4everybody";

// Init local libs
import DynamicAdapt from "./libs/dynamic-adaptive";
import testWebP from "./libs/webp";
import { getMaxHeight } from "./libs/helpers";

import Modal from "./libs/modal";
import qty from "./libs/qty";
import tabs from "./libs/tabs";
// require('./libs/disabled-copy');

import Swiper from "swiper";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
SwiperCore.use([Navigation, Pagination]);

import "simplebar";

require("fslightbox");

// You code
document.addEventListener("DOMContentLoaded", () => {
    /* Инит для SVG */
    svg4evrybody();

    /* Использование WebP в CSS background */
    testWebP((support) => {
        if (support == true)
            document.querySelector("body").classList.add("webp");
        else document.querySelector("body").classList.add("no-webp");
    });

    /* Инит динамического адаптива */
    const da = new DynamicAdapt("max");
    da.init();

    /* Инит модалок */
    let modal = new Modal();

    /* Модуль кол-ва шт */
    qty(".qty", (result, block) => {
        if (result && block) {
            let price = `${result} ₽`;
            block.querySelector(".qty__result").innerHTML = price;
        }
    });

    /* Табы */
    tabs(".tabs");

    let body = $("body");

    body.on("click", ".js-input-group-edit", function () {
        let parent = $(this).closest(".input-group--edit");
        let button = parent.siblings(".button");

        parent.toggleClass("active");
        parent
            .find("input")
            .prop("disabled", !parent.find("input").prop("disabled"));
        parent
            .find("input")
            .prop("readonly", !parent.find("input").prop("readonly"));
    });

    body.on("click", ".product--radio", function (e) {
        e.preventDefault();

        $(this)
            .find('input[type="radio"]')
            .prop("checked", true)
            .trigger("change");
    });

    const setHeaderHeight = () => {
        let headerHeight = $(".header--transparent").height();
        if (headerHeight !== 0) {
            $(".content").css({
                marginTop: -headerHeight + "px",
            });
        }
    };

    $(window).on("resize load", setHeaderHeight);

    const initHomeInfo = () => {
        let slides = document.querySelectorAll(
            ".swiper-container.home-info__slider"
        );

        const setOffsetAfterBlock = (
            selector,
            offset = { top: 0, bottom: 0 }
        ) => {
            selector.nextElementSibling.classList.add(
                "js-has-element-translate"
            );
            selector.nextElementSibling.style.marginTop = `-${offset.top}px`;
            selector.nextElementSibling.style.paddingTop = `${
                offset.top / 2
            }px`;
        };

        slides.forEach((slider) => {
            let infoSlider = new Swiper(slider, {
                autoHeight: true,
                loop: true,
                on: {
                    transitionEnd: (swiper) => {
                        let sliderHeight =
                            swiper.slides[swiper.activeIndex].clientHeight;
                        setOffsetAfterBlock(slider.closest(".home-info"), {
                            top: sliderHeight,
                            bottom: 0,
                        });
                    },
                },
            });

            let infoSliderPrev = slider
                .closest(".home-info")
                .querySelector(".home-info__prev");
            let infoSliderNext = slider
                .closest(".home-info")
                .querySelector(".home-info__next");

            infoSliderPrev.addEventListener("click", () => {
                infoSlider.slidePrev();
            });

            infoSliderNext.addEventListener("click", () => {
                infoSlider.slideNext();
            });
        });
    };
    initHomeInfo();

    const initProductInfo = () => {
        let sliders = document.querySelectorAll(
            ".swiper-container.slider-product-info"
        );

        sliders.forEach((slider) => {
            let infoSlider = new Swiper(slider, {
                loop: false,
                watchOverflow: true,
                slidesPerView: 4,
                spaceBetween: 15,
                observer: true,
                observeParents: true,

                pagination: {
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                    clickable: true,
                },

                on: {
                    init: (swiper) => {
                        let maxHeight = getMaxHeight(swiper.slides);

                        swiper.slides.forEach((slide) => {
                            slide.style.height = `${maxHeight}px`;
                        });
                    },
                },
            });
        });
    };
    initProductInfo();

    const initRecipe = () => {
        let sliders = document.querySelectorAll(
            ".swiper-container.slider-recipe"
        );

        sliders.forEach((slider) => {
            let infoSlider = new Swiper(slider, {
                loop: false,
                autoHeight: true,
                watchOverflow: true,
                observer: true,
                observeParents: true,

                pagination: {
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                },
            });
        });
    };
    initRecipe();

    const initYaMap = () => {
        if ( document.getElementById('map') ) {
            ymaps.ready(function () {
                let myMap = new ymaps.Map("map", {
                        center: [55.751574, 37.573856],
                        zoom: 9,
                    }),
    
    
                    clusterer = new ymaps.Clusterer({
                        groupByCoordinates: false,
                        clusterDisableClickZoom: true,
                        clusterHideIconOnBalloonOpen: false,
                        geoObjectHideIconOnBalloonOpen: false,
                        clusterIcons: [
                            {
                                href: "/dist/images/map-placemark-group.png",
                                size: [48, 48],
                                offset: [-24, -24],
                            },
                            {
                                href: "/dist/images/map-placemark-group_62x62.png",
                                size: [62, 62],
                                offset: [-31, -31],
                            },
                        ],
                    }),
                    getPointData = function (index) {
                        return {
                            balloonContentHeader: '',
                            balloonContentBody: '',
                            balloonContentFooter: '',
                            clusterCaption: '',
                        };
                    },
                    points = [
                        [55.831903, 37.411961],
                        [55.763338, 37.565466],
                        [55.763338, 37.565466],
                        [55.744522, 37.616378],
                        [55.780898, 37.642889],
                        [55.793559, 37.435983],
                        [55.800584, 37.675638],
                        [55.716733, 37.589988],
                        [55.775724, 37.56084],
                        [55.822144, 37.433781],
                        [55.87417, 37.669838],
                        [55.71677, 37.482338],
                        [55.78085, 37.75021],
                        [55.810906, 37.654142],
                        [55.865386, 37.713329],
                        [55.847121, 37.525797],
                        [55.778655, 37.710743],
                        [55.623415, 37.717934],
                        [55.863193, 37.737],
                        [55.86677, 37.760113],
                        [55.698261, 37.730838],
                        [55.6338, 37.564769],
                        [55.639996, 37.5394],
                        [55.69023, 37.405853],
                        [55.77597, 37.5129],
                        [55.775777, 37.44218],
                        [55.811814, 37.440448],
                        [55.751841, 37.404853],
                        [55.627303, 37.728976],
                        [55.816515, 37.597163],
                        [55.664352, 37.689397],
                        [55.679195, 37.600961],
                        [55.673873, 37.658425],
                        [55.681006, 37.605126],
                        [55.876327, 37.431744],
                        [55.843363, 37.778445],
                        [55.875445, 37.549348],
                        [55.662903, 37.702087],
                        [55.746099, 37.434113],
                        [55.83866, 37.712326],
                        [55.774838, 37.415725],
                        [55.871539, 37.630223],
                        [55.657037, 37.571271],
                        [55.691046, 37.711026],
                        [55.803972, 37.65961],
                        [55.616448, 37.452759],
                        [55.781329, 37.442781],
                        [55.844708, 37.74887],
                        [55.723123, 37.406067],
                        [55.858585, 37.48498],
                    ],
                    geoObjects = [];
    
                myMap.behaviors.disable(['scrollZoom', 'routeEditor']);
    
                for (let i = 0, len = points.length; i < len; i++) {
                    geoObjects[i] = new ymaps.Placemark(
                        points[i],
                        getPointData(i),
                        {
                            iconLayout: "default#image",
                            iconImageHref:
                                "/dist/images/svg/map-icon-placemark.svg",
                            iconImageSize: [53, 53],
                        }
                    );
                }
    
                clusterer.add(geoObjects);
                myMap.geoObjects.add(clusterer);
    
                myMap.setBounds(clusterer.getBounds(), {
                    checkZoomRange: true,
                });
            });
        }
    };
    initYaMap();

    const initReviews = () => {
        let sliders = document.querySelectorAll(".slider-reviews");

        sliders.forEach((slider) => {

            let reviewSlider = new Swiper(slider.querySelector('.swiper-container'), {
                loop: false,
            });

            let reviewSliderPrev = slider
                .closest(".slider-reviews")
                .querySelector(".slider-reviews__prev");
            let reviewSliderNext = slider
                .closest(".slider-reviews")
                .querySelector(".slider-reviews__next");

            reviewSliderPrev.addEventListener("click", () => {
                infoSlider.slidePrev();
            });

            reviewSliderNext.addEventListener("click", () => {
                infoSlider.slideNext();
            });
        });
    }

    initReviews();


    body.on('click', '.order .order__header', function(e){
        e.preventDefault();

        let block = $(this).closest('.order');

        block.find('.order__header').toggleClass('active');
        block.find('.order__body').slideToggle().toggleClass('active');
    })
});
