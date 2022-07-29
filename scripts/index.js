import Api from '../utils/Api.js'

const api = new Api();

const template = document.querySelector('.template')
const popup = document.querySelector('.popup')
const usersList = document.querySelector('.users__list')
const inputSearch = document.querySelector('.header__search-input')
const usersError = document.querySelector('.users__error')
const popupCrossButton = document.querySelector('.popup__cross-button')

api.getUsersInfo()
  .then((data) =>
    data.forEach((item) => {

      render(item)
    })
  )
  .catch((err) => console.log(err));

inputSearch.addEventListener('input', (e) => {
  usersList.innerHTML = ''
  api.getSearchUsers(e.target.value)
    .then((data) => {
      usersError.classList.add('users__error_open')
      data.forEach((item) => {
        render(item)
        usersError.classList.remove('users__error_open')
      })
    })
    .catch((err) => console.log(err))
})

popupCrossButton.addEventListener('click', closePopup);
popup.addEventListener('click', onOverlayClickClose)
document.addEventListener('keydown', onEscClose);

function render(item) {
  let users = getUser(item)
  usersList.append(users);
}

function getUser(item) {
  const newUser = template.content.cloneNode(true);

  const userItem = newUser.querySelector('.users__item');
  const userTitle = newUser.querySelector('.users__title');
  const userNumber = newUser.querySelector('.users__contacts_phone');
  const userPhone = newUser.querySelector('.users__contacts_email');

  userTitle.textContent = item.name;
  userNumber.textContent = item.phone;
  userPhone.textContent = item.email;

  userItem.addEventListener('click', handleOpenPopup)

  return newUser;
}

function openPopup() {
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function onEscClose(e) {
  if (e.key === 'Escape' && popup !== null) {
    closePopup();
  }
}

function onOverlayClickClose(e) {
  if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
    closePopup();
  }
}

function handleOpenPopup(e) {
  openPopup()
  const element = e.target.closest('.users__item');
  const userTitle = element.querySelector('.users__title')

  api.getUsersInfo()
    .then((data) =>
      data.forEach((item) => {
        if (item.name === userTitle.textContent) {
          generatePopup(item)
        }
      })
    )
    .catch((err) => console.log(err))
}

function generatePopup(item) {
  const nameTitle = document.querySelector('.popup__title');
  const phoneItem = document.querySelector('.popup__item_type_phone');
  const emailItem = document.querySelector('.popup__item_type_adress');
  const hireDateItem = document.querySelector('.popup__item_type_hire-date');
  const positionNameItem = document.querySelector('.popup__item_type_position-name');
  const departmentItem = document.querySelector('.popup__item_type_department');

  nameTitle.textContent = item.name
  phoneItem.textContent = item.phone;
  emailItem.textContent = item.email;
  hireDateItem.textContent = item.hire_date;
  positionNameItem.textContent = item.position_name;
  departmentItem.textContent = item.department;
}