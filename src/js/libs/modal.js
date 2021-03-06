class Modal {
    constructor(options) {
        this.options = {
            modal: "modal",
            modal_active: "modal--active",
            modal_overlay: "modal-overlay",
            modal_overlay_active: "modal-overlay--active",
            modal_open: "js-modal-open",
            modal_close: "js-modal-close",

            modal_current: false,
            ...options,
        };

        this._reOpen = false;

        this.events();
    }

    events() {
        document.addEventListener("click", (event) => {
            let trigger = event.target.closest(`.${this.options.modal_open}`);
            if (trigger) {
                let { target } = trigger.dataset;

                if (target.length !== 0) {
                    event.preventDefault();
                    this.open(target);
                }
            }

            if (
                (event.target.closest(`.${this.options.modal}`) &&
                    event.target.classList.contains(
                        this.options.modal_close
                    )) ||
                event.target.closest(`.${this.options.modal_overlay_active}`)
            ) {
                this.close();
            }
        });
    }

    open(target) {
        let modal = this.options.modal_current;

        if (modal) {
            if (modal === target) return;
            else {
                this._reOpen = true;
                this.close(modal);
                modal = target;
                this._reOpen = false;
            }
        } else {
            modal = target;
        }

        this.disableScroll();
        this.triggerOverlay(true);
        document
            .querySelector(`.${this.options.modal}[data-target-id=${modal}]`)
            .classList.add(this.options.modal_active);
        this.options.modal_current = target;
    }

    triggerOverlay(isOpen = false) {
        let overlay = document.querySelector(`.${this.options.modal_overlay}`);

        if (!overlay.classList.contains(this.options.overlay_active) && !isOpen)
            overlay.classList.remove(this.options.modal_overlay_active);
        else overlay.classList.add(this.options.modal_overlay_active);
    }

    close(target) {
        let modal = this.options.modal_current;

        if (target) modal = target;
        this.triggerOverlay(false);
        if (!this._reOpen) {
            this.enableScroll();
            this._reOpen = false;
        }

        document
            .querySelector(`.${this.options.modal}[data-target-id=${modal}]`)
            .classList.remove(this.options.modal_active);
        this.options.modal_current = false;
    }

    disableScroll() {
        let paddingOffset =
            window.innerWidth - document.body.offsetWidth + "px";
        document.body.style.paddingRight = paddingOffset;

        let pagePosition = window.scrollY;
        document.body.classList.add("modal-disable-scroll");
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + "px";
    }

    enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);

        setTimeout(function () {
            document.body.classList.remove("modal-disable-scroll");
            document.body.style.top = "auto";
            document.body.style.paddingRight = "0px";

            window.scroll({
                top: pagePosition,
                left: 0,
            });
            document.body.removeAttribute("data-position");
        }, 300);
    }
}

export default Modal;