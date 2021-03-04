class Select {
    constructor(selector, options = {}) {
        this.el = $(selector);
        this.options = options;
        this.selector = selector;
        this.options.dropdownClass = ( 'dropdownClass' in options ) ? options.dropdownClass : '.select__dropdown';
        this.options.placeholder = ( 'placeholder' in options ) ? options.placeholder : 'Placeholder';
        this.options.valueClass = ( 'valueClass' in options ) ? options.valueClass : '.select__value';
        this.selected = {};
        this.init();
    }

    init() {
        let elements = this.el;
        let body = $('body');
        if ( elements.length >= 0 ) {
            $.each(elements, (idx, element) => {
                this.checkSelectedItems($(element));
            });
        }

        body.on('click', this.el, (e) => this.clickHandler(e));
    }

    checkSelectedItems (element) {
        let placeholder = ( element.data('placeholder') ) ? element.data('placeholder') : this.options.placeholder;

        if ( element.find('input').length <= 0 ) return false;

        let selected = $.map(element.find('input:checked'), function(element, index){
            return { name: $(element).attr('name'), value: $(element).val() }
        });

        this.selected = selected;

        let selectedValues = selected.map(({value}) => value);
        if ( !selectedValues.length ) element.find(this.options.valueClass).html(placeholder);
        else element.find(this.options.valueClass).html(selectedValues.join(', '));
    }


    clickHandler(event) {
        let element = $(event.target);
        let select = element.closest(this.selector);
        let elementType = element.closest('[data-type]')
        let type = elementType.data('type');

        if ( type == 'input' ) {
            this.open(element.closest(this.selector));
            elementType.data('type', 'backdrop');
        } else if ( type == 'item' ) {
            this.checkSelectedItems(element.closest(this.selector));
        } else if ( type == 'backdrop' ) {
            this.close(element.closest(this.selector));
            elementType.data('type', 'input');
        } else if ( type == 'clear' ) {
            this.clear(element.closest(this.selector));
        } else if (!select.is(event.target)) {
            this.closeAll();
        }

    }

    clear (el) {
        el.find('input').prop('checked', false);
        this.checkSelectedItems(el);
    }

    closeAll () {
        this.el.removeClass('open');
        this.el.find(this.options.dropdownClass).slideUp();
    }

    open (el) {
        this.closeAll();
        el.addClass('open');
        el.find(this.options.dropdownClass).slideDown();
    }

    close (el) {
        el.removeClass('open');
        el.find(this.options.dropdownClass).slideUp();
    }
}

export default Select;
