// выпадающее меню
const menuButton = document.querySelector('.page-header__burger')
const navigation = document.querySelector('.page-header__navigation')

const openMenu = () => {
  menuButton.classList.add('burger--active')
  navigation.classList.remove('navigation--hide')
}
const closeMenu = () => {
  menuButton.classList.remove('burger--active')
  navigation.classList.add('navigation--hide')
}

menuButton.addEventListener('click', (e) => {
  e.preventDefault()
  const isMenuClosed = navigation.classList.contains('navigation--hide')
  isMenuClosed ? openMenu() : closeMenu()
})


// форма
const form = document.querySelector('.page-main__form form')
const numberInput = document.getElementById('form-number')
const mailInput = document.getElementById('form-mail')
const checkbox = document.getElementById('form-checkbox')
const submitFormButton = document.querySelector('.form__button')

const isInputValid = (input, reg) => reg.test(input.value)

const updateInputStatus = (input, isValid) => {
  const inputContainer = input.closest('.input')

  isValid
    ? inputContainer.classList.remove('input--error')
    : inputContainer.classList.add('input--error')
}

const updateCheckboxStatus = (checkbox, isChecked) => {
  const checkboxContainer = checkbox.closest('.checkbox')

  isChecked
    ? checkboxContainer.classList.remove('checkbox--error')
    : checkboxContainer.classList.add('checkbox--error')
}

const handleInput = ({target}) => {
  const validationRule = target.dataset.reg
  if (!validationRule) return

  const reg = new RegExp(validationRule)
  const isValid = isInputValid(target, reg)
  
  updateInputStatus(target, isValid)
}

const handleFormSubmit = (e) => {
  e.preventDefault()

  let isFormValid = true
  const inputsToValidate = [numberInput, mailInput]

  inputsToValidate.forEach((input) => {
    const isValid = isInputValid(input, new RegExp(input.dataset.reg))
    updateInputStatus(input, isValid)
    if (isFormValid && !isValid) isFormValid = false
  });

  const isChecked = checkbox.checked
  updateCheckboxStatus(checkbox, isChecked)
  if (isFormValid && !isChecked) isFormValid = false

  if (isFormValid) {
    form.reset()
    alert('Данные отправлены')
  }
}

submitFormButton.addEventListener('click', handleFormSubmit)
form.addEventListener('input', handleInput)