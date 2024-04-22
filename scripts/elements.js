const buttonAddGroup = document.querySelector("#add-group");
const buttonSaveGroup = document.querySelector("#save-group");
const groupsModal = document.querySelector(".group-modal .groups");
const fullNameInput = document.querySelector("#full-name");
const phoneInput = document.querySelector("#phone");
const groupSelect = document.querySelector("#group");
const saveContactButton = document.querySelector("#save-contact");
const buttonShowContactModal = document.querySelector("#show-contact-modal");
const buttonCloseContactModal = document.querySelector("#close-contact-modal");
const contactModal = document.querySelector("#contact-modal");
const contactForm = document.querySelector("#contact-form");
const buttonShowGroupModal = document.querySelector("#show-group-modal");
const buttonCloseGroupModal = document.querySelector("#close-group-modal");
const groupModal = document.querySelector("#group-modal");
const mainContainer = document.querySelector(".main__container");
const groupsMain = mainContainer.querySelector(".groups");

export {
  buttonAddGroup,
  buttonSaveGroup,
  buttonCloseContactModal,
  buttonShowContactModal,
  contactModal,
  contactForm,
  buttonShowGroupModal,
  buttonCloseGroupModal,
  groupModal,
  fullNameInput,
  phoneInput,
  groupSelect,
  saveContactButton,
  groupsModal,
  mainContainer,
  groupsMain,
};
