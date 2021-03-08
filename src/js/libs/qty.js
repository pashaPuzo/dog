const qty = ( selector, callback ) => {
    let blocks = document.querySelectorAll(selector);
    if ( blocks.length === 0 ) return false;

    blocks.forEach(block => {
        let input = block.querySelector('.qty__input');
        let { step, price, min, max } = block.dataset;
        if ( !step ) step = 1;

        let resultPrice = 0;

        const qtyRound = ( num, step, exclude = [] ) => {
            step = parseFloat(step);

            if ( exclude.findIndex(i => i === num) === -1 ) {
                if  ( num % step !== 0 ) num = Math.ceil(num / step) * step;
            }

            return num;
        }

        block.querySelector('.qty__btn--plus').addEventListener('click', () => {
            let valueInitial = parseFloat(input.value);
            valueInitial += parseFloat(step);

            if ( valueInitial <= min ) {
                input.value = parseFloat(min);
                resultPrice = input.value * price;

                callback(resultPrice, block);
                return;
            }

            if ( valueInitial >= max && max !== '' && max !== undefined ) {
                input.value = parseFloat(max);
                resultPrice = input.value * price;

                callback(resultPrice, block);
                return;
            }

            input.value = qtyRound(valueInitial, step, [min, max]);
            resultPrice = input.value * price;

            callback(resultPrice, block);
        });

        block.querySelector('.qty__btn--minus').addEventListener('click', () => {
            let valueInitial = parseFloat(input.value);
            valueInitial -= parseFloat(step);

            if ( valueInitial <= min ) {
                input.value = parseFloat(min);
                resultPrice = input.value * price;

                callback(resultPrice, block);
                return;
            }

            if ( valueInitial >= max && max !== '' && max !== undefined ) {
                input.value = parseFloat(max);
                resultPrice = input.value * price;

                callback(resultPrice, block);
                return;
            }

            input.value = qtyRound(valueInitial, step, [min, max]);
            resultPrice = input.value * price;

            callback(resultPrice, block);
        });

        block.querySelector('.qty__input').addEventListener('change', ( event ) => {
            let valueInitial = parseFloat(event.target.value);
            let tmp = 0;

            if ( valueInitial <= min ) {
                valueInitial = min;
                event.target.value = valueInitial;

                return;
            }

            if ( valueInitial >= max ) {
                valueInitial = max;
                event.target.value = valueInitial;

                return;
            }

            valueInitial = qtyRound(valueInitial, step, [min, max]);
            event.target.value = valueInitial;


            // callback(resultPrice, block);
        });
    });
}

export default qty;