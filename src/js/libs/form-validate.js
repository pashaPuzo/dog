export default class ValidateForm {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;
        this.elements = [];
        this.options.classValidate =
        "classValidate" in options ? options.classValidate : ".js-validate";
        this.options.render =
        "render" in options ? options.render : false;

        this.options.messages = [
            { type: "mail", message: "E-mail введен не верно" },
            { type: "phone", message: "Телефон введен не верно" },
            { type: "required", message: "Поле пустое" }
        ];

        this.validate = false;

        this.init();
        this.renderMessage();
    }

    init() {
        let elements = ( this.elements.length > 0 ) ? this.elements : [];

        this.selector
        .querySelectorAll(this.options.classValidate)
        .forEach((item, index) => {
            let { type } = item.dataset;
            let idx = elements.findIndex(({ id }) => id == index);
            let element = {};

            if (type == "mail") {
                let validate = this.validateMail(item.value);
                element = { id: index, validate: validate, type: type };
            } else if (type == "phone") {
                let validate = this.validatePhone(item.value);
                element = { id: index, validate: validate, type: type };
            } else if ( type == "required" ) {
                let validate = this.validateRequired(item.value);
                element = { id: index, validate: validate, type: type };
            }

            if ( Object.keys(element).length > 0 ) {
                if ( idx == -1 ) {
                    elements.push(element)
                } else {
                    elements = [...elements.slice(0, idx), element, ...elements.slice(idx + 1)];
                }
            }
        });

        this.elements = elements;

        this.validate = this.formValidate();
    }

    validateRequired( value ) {
        return ( value.length > 0 );
    }

    validateMail(value) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        let validate = this.validateRequired(value);
        return ( validate ) ? re.test(value) : validate;
    }

    validatePhone(value) {
        let re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

        let validate = this.validateRequired(value);
        return ( validate ) ? re.test(value) : validate;
    }

    formValidate() {
        let elements = this.elements;

        if ( Object.keys(elements).length < 0 ) return true;
        else return elements.some((item) => (item.validate != false));
    }

    renderMessage() {
        let elements = this.elements;
        let messages = this.options.messages;
        let selector = this.selector;

        elements.forEach(( { id, type: typeField, validate } ) => {
            let idx = messages.findIndex(({type}) => type === typeField);
            let input = selector.querySelectorAll(this.options.classValidate)[id];
            let { message } = messages[idx];
            if ( input.parentNode.querySelectorAll('.error-message').length >= 1 ) input.parentNode.querySelectorAll('.error-message').forEach((err) => err.remove());
            input.setAttribute('data-valid', validate);
            if ( !this.options.render ) return false;
            if ( !validate ) input.parentNode.insertAdjacentHTML("beforeend", `<span class="error-message">${message}</span>`);
        });
    }
}
