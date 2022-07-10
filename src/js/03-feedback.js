import throttle from "lodash.throttle";

const FEEDBACK = 'feedback-form-state';

let formData = JSON.parse(localStorage.getItem(FEEDBACK)) || {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500))

saveFormData();

function onFormSubmit(e) {
    e.preventDefault();

    if (e.currentTarget.elements.email.value === "" || e.currentTarget.elements.message.value === "") {
    alert("Please, fill in all the fields!")
    }

    e.currentTarget.reset();

    localStorage.removeItem(FEEDBACK);

    console.log(formData); 
 };

function onFormInput(event) {
    formData[event.target.name] = event.target.value;

    const formInputData = JSON.stringify(formData);

    localStorage.setItem(FEEDBACK, formInputData)
 };

function saveFormData() {
    const savedFormData = JSON.parse(localStorage.getItem(FEEDBACK));

    if (savedFormData) {
        form.elements.email.value = savedFormData.email || "";
        form.elements.message.value = savedFormData.message || "";
    }
}
