const tabs = (selector) => {
    let tabs = document.querySelectorAll(selector);

    if ( tabs.length === 0 ) return;

    tabs.forEach(tabsItem => {
        tabsItem.querySelectorAll('.tabs__nav li').forEach(tabNav => {
            tabNav.addEventListener('click', (event) => {
                let { tab } = event.target.dataset;
    
                if ( !tab ) return;
                tabsItem.querySelectorAll('.tabs__nav li').forEach(item => item.classList.remove('active'));
                event.target.classList.add('active');
                tabsItem.querySelectorAll('.tabs__item').forEach(item => item.classList.remove('active'));
                tabsItem.querySelector(`[data-tab-id="${tab}"]`).classList.add('active');
            });
        });
    });
}

export default tabs;