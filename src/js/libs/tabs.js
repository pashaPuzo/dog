const tabs = (selector) => {
    let body = $('body');

    body.on('click', `${selector} .tabs__nav li`, function(e) {
        e.preventDefault();

        let tab = $(this).closest(`${selector}`);

        tab.find('.tabs__nav li.active').removeClass('active');
        $(this).addClass('active');
        let tabId = $(this).data('tab');

        tab.find(`.tabs__content .tabs__item.active`).removeClass('active');
        tab.find(`.tabs__content .tabs__item[data-tab-id=${tabId}]`).addClass('active');
    });

}

export default tabs;