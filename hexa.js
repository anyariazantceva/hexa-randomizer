window.addEventListener('load', () => {
    const blocksList = document.querySelector('.page__blocks');
    const form = document.querySelector('.page__input');


    const randomHexaNumberGenerator = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';

        for(let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const createElement = (name, className ) => {
        let el = document.createElement(name);
        el.classList.add(className);
        return el
    };

    const createBlock = (num) => {
        for(let i = 0; i<num; i++) {
            let block = createElement('div', 'page__block-item');
            let text = createElement('div', 'page__block--text');
            let buttonCopy = createElement('button', 'btn-copy');
            buttonCopy.classList.add('page__btn');
            buttonCopy.textContent = 'Copy';
            let colorBlock = randomHexaNumberGenerator();
            block.style.backgroundColor = colorBlock;
            text.textContent = colorBlock;
            block.append(text);
            block.append(buttonCopy);
            blocksList.append(block);
        }

    };

    const getFormValue = () => {
        let formInput = document.querySelector('.page__control');
        let num = formInput.value;
        return num
    };

    const addBlock = () => {
        if (blocksList.textContent !== '') {
            blocksList.textContent = '';
            createBlock(getFormValue());
            clearForm();

        } else {
            createBlock(getFormValue());
            clearForm();
        }
    };

    const clearForm = () => {
        let formInput = document.querySelector('.page__control');
        return formInput.value = '';
    };

    const formValidation = () => {
        let activeInput = document.querySelector('.page__control').value;
        console.log(activeInput.match(/[a-z][A-Z]/));
        if (activeInput <= 0) {
            console.log(activeInput);
            alert('You should enter a number greater than 0');
            clearForm();
        } else if (activeInput > 100) {
            alert('You should enter a number greater than 100');
            clearForm();
            blocksList.textContent = '';
        } else {
            addBlock();
            startTimer();
            copyText();
        }

    };

    function startTimer () {
        let timer = setInterval(function () {
            let blocks = document.querySelectorAll('.page__block-item');
            blocks.forEach((block) => {
                let color = randomHexaNumberGenerator();
                block.style.backgroundColor = color;
                block.firstChild.textContent = color;

            })
        }, 2000);
        let btnStart = document.querySelector('.btn-run');
        btnStart.addEventListener('click', () => {
            clearInterval(timer);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formValidation();
    });

    function copyText () {
        let buttons = document.querySelectorAll('.btn-copy');
        buttons.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                let color = document.querySelector('.page__block--text');
                let range = document.createRange();
                range.selectNode(color);
                window.getSelection().addRange(range);

                try {
                    let successful = document.execCommand('copy');
                    let msg = successful ? 'successful' : 'unsuccessful';
                    console.log('Copy email command was ' + msg);
                    window.getSelection().removeAllRanges();
                } catch(err) {
                    console.log('Oops, unable to copy');
                }

                window.getSelection().removeAllRanges();
            })
        })
    }


});
