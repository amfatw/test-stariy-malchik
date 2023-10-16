"use strict";

// выпадающее меню
var menuButton = document.querySelector('.page-header__burger');
var navigation = document.querySelector('.page-header__navigation');
var openMenu = function openMenu() {
  menuButton.classList.add('burger--active');
  navigation.classList.remove('navigation--hide');
};
var closeMenu = function closeMenu() {
  menuButton.classList.remove('burger--active');
  navigation.classList.add('navigation--hide');
};
menuButton.addEventListener('click', function (e) {
  e.preventDefault();
  var isMenuClosed = navigation.classList.contains('navigation--hide');
  isMenuClosed ? openMenu() : closeMenu();
});

// форма
var form = document.querySelector('.page-main__form form');
var numberInput = document.getElementById('form-number');
var mailInput = document.getElementById('form-mail');
var checkbox = document.getElementById('form-checkbox');
var submitFormButton = document.querySelector('.form__button');
var isInputValid = function isInputValid(input, reg) {
  return reg.test(input.value);
};
var updateInputStatus = function updateInputStatus(input, isValid) {
  var inputContainer = input.closest('.input');
  isValid ? inputContainer.classList.remove('input--error') : inputContainer.classList.add('input--error');
};
var updateCheckboxStatus = function updateCheckboxStatus(checkbox, isChecked) {
  var checkboxContainer = checkbox.closest('.checkbox');
  isChecked ? checkboxContainer.classList.remove('checkbox--error') : checkboxContainer.classList.add('checkbox--error');
};
var handleInput = function handleInput(_ref) {
  var target = _ref.target;
  var validationRule = target.dataset.reg;
  if (!validationRule) return;
  var reg = new RegExp(validationRule);
  var isValid = isInputValid(target, reg);
  updateInputStatus(target, isValid);
};
var handleFormSubmit = function handleFormSubmit(e) {
  e.preventDefault();
  var isFormValid = true;
  var inputsToValidate = [numberInput, mailInput];
  inputsToValidate.forEach(function (input) {
    var isValid = isInputValid(input, new RegExp(input.dataset.reg));
    updateInputStatus(input, isValid);
    if (isFormValid && !isValid) isFormValid = false;
  });
  var isChecked = checkbox.checked;
  updateCheckboxStatus(checkbox, isChecked);
  if (isFormValid && !isChecked) isFormValid = false;
  if (isFormValid) {
    form.reset();
    alert('Данные отправлены');
  }
};
submitFormButton.addEventListener('click', handleFormSubmit);
form.addEventListener('input', handleInput);