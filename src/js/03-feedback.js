import throttle from "lodash.throttle";

const FEEDBACK = 'feedback-form-state';

let formData = JSON.parse(localStorage.getItem(FEEDBACK)) || {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500))

saveFormData();

function onFormSubmit(evt) {
    evt.preventDefault();

    const { email, message } = evt.currentTarget.elements;

    if (email.value === "" || message.value === "") {
        alert("Please, fill in all the fields!");
        return;
    }

    evt.currentTarget.reset();

    localStorage.removeItem(FEEDBACK);

    console.log(formData); 
};

function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;

    const formInputData = JSON.stringify(formData);
    
    localStorage.setItem(FEEDBACK, formInputData)
};

function saveFormData() {
    const savedFormData = JSON.parse(localStorage.getItem(FEEDBACK));

    if (savedFormData) {
        const { email, message } = savedFormData;
        form.elements.email.value = email || "";
        form.elements.message.value = message || "";
    }
}
