let footerNameInput = document.getElementById('footer-form').name;
let footerEmailInput = document.getElementById('footer-form').email;
let footerMessageInput = document.getElementById('footer-form').message;

let footerNameIsValid = false;
let footerEmailIsValid = false;

const validator = {
    rules: {
        footerName: /^[A-ZÍÁÉŰÚŐÓÜÖ]{1}[a-zíáéűúőóüö]{2,15}\s[A-ZÍÁÉŰÚŐÓÜÖ]{1}[a-zíáéűúőóüö]{2,15}(\s[A-ZÍÁÉŰÚŐÓÜÖ]{1}[a-zíáéűúőóüö]{2,15})?$/,
        footerEmail: /^.+@.+\..{2,3}$/
    },
    validate: function(value, rule) {
        return this.rules[rule].test(value);
    }
}

footerNameInput.onmouseout = () => {
    let footerName = footerNameInput.value;
    if (footerName) {
        footerNameIsValid = validator.validate(footerName, 'footerName') ? true : false;
        document.querySelector('.error-footer-name').style.display = footerNameIsValid ? "none" : "block";
        document.getElementById('footer-button').disabled = allInputsAreInvalid();
    } else if (!footerName) {
        document.querySelector('.error-footer-name').style.display = "none";
    }
}

footerEmailInput.onmouseout = () => {
    let footerEmail = footerEmailInput.value;
    if (footerEmail) {
        footerEmailIsValid = validator.validate(footerEmail, 'footerEmail') ? true : false;
        document.querySelector('.error-footer-email').style.display = footerEmailIsValid ? "none" : "block";
        document.getElementById('footer-button').disabled = allInputsAreInvalid();
    } else if (!footerEmail) {
        document.querySelector('.error-footer-email').style.display = "none";
    }
}

document.getElementById('footer-button').addEventListener('click', async() => {
    const contact = {
            name: footerNameInput.value,
            email: footerEmailInput.value,
            message: footerMessageInput.value
        }
        // Fetch api-val:
    const URL = 'http://localhost:3000/contacts';
    const param = {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        method: 'POST',
        body: JSON.stringify(contact)
    }
    const response = await fetch(URL, param)
        .then(data => data.json())
        .then(resp => {
            const savedContact = resp;
            let name = contact.name;
            let email = contact.email;
            popFooterModal(name, email);
            clearInputs();
            // setUserStatus();
            // setCookie(responseTextObj.id, 1);
        })
        .catch(err => console.log(err));
});

function allInputsAreInvalid() {
    let allInvalid = true;
    if (footerNameIsValid && footerEmailIsValid) {
        allInvalid = false;
    }
    return allInvalid;
}

function clearInputs() {
    footerNameInput.value = '';
    footerEmailInput.value = '';
    footerMessageInput.value = '';
}

function popFooterModal(name, email) {

    let welcomeInModal = document.querySelector('.footer-modal h2');
    let welcomeAnswerEmail = document.querySelector('#footer-welcome-email');
    let modalSection = document.querySelector('.footer-modal-section');
    let disappearedElements = document.querySelectorAll('.footer-will-disappear');
    let navbar = document.getElementsByClassName('footer-nav')[0];

    for (let element of disappearedElements) {
        element.style.display = 'none';
    }
    navbar.style.display = 'none';
    modalSection.style.display = 'block';
    welcomeInModal.textContent = `Welcome ${name}!`;
    welcomeAnswerEmail.textContent = `${email}`;

    document.querySelector('.footer-modal-button').onclick = () => {
        modalSection.style.display = 'none';
        for (let element of disappearedElements) {
            element.style.display = 'block';
        }
        navbar.style.display = 'flex';
    }
}