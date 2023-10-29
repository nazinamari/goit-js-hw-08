import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('form.feedback-form'),
    emailInput: document.querySelector('input[name="email"]'),
    textarea: document.querySelector('textarea[name="message"]')
};

const STORAGE_KEY = 'feedback-form-state';
const formData = { email: '', message: '' };
populateForm();

refs.form.addEventListener('submit', onFormSubmit);
refs.emailInput.addEventListener('input', throttle(onEmailInput, 500));
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));


function onFormSubmit (evt) {
    evt.preventDefault();

    const { email, message } = evt.currentTarget.elements;

    if (email.value === "" || message.value === "") {
        alert("Please, fill in all the fields!");
        return;
    }

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

function onEmailInput (evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function onTextareaInput (evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

function populateForm () {
    const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(savedForm) {
        refs.emailInput.value = savedForm.email || "";
        refs.textarea.value = savedForm.message || "";
        console.log(savedForm);
    }
};

