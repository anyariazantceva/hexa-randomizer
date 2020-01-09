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

    const createBlock = (num) => {
        for(let i = 0; i<num; i++) {
            let block = document.createElement('div');
            block.classList.add('page__block-item');
            let colorBlock = randomHexaNumberGenerator();
            block.style.backgroundColor = colorBlock;
            block.textContent = colorBlock;
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



    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let activeInput = document.querySelector('.page__control').value;

        if ( activeInput <= 0) {
            console.log(activeInput);
            alert('You should enter a number greater than 0');
            clearForm()
        } else {
            addBlock();
        }

    });

});
