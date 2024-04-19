import {getStore, setStore} from "./store";
import {closeContactModal, showContactModal} from "./modals";
import {
  phoneInput,
  fullNameInput,
  saveContactButton,
  groupSelect,
} from "./elements";
import {render} from "./render";

phoneInput.addEventListener("input", (event) => {
  let value = event.target.value;
  value = value.replace(/\D/g, "");
  if (/^\d/.test(value)) {
    value = "+" + value;
  }
  if (value.length > 13) {
    value = value.slice(0, 13);
  }
  event.target.value = value;
});

fullNameInput.addEventListener("input", (event) => {
  let value = event.target.value;
  value = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "");
  event.target.value = value;
});

saveContactButton.addEventListener("click", saveContact);

function saveContact() {
  const fullName = fullNameInput.value;
  const phone = phoneInput.value;
  const group = groupSelect.value;
  const id = saveContactButton.dataset.contactId;
  if (!fullName) {
    fullNameInput.focus();
    return;
  }
  if (!phone) {
    phoneInput.focus();
    return;
  }
  if (!group) {
    groupSelect.focus();
    alert("Сначала создайте группу");
    return;
  }
  const contact = {id: id ? id : window.crypto.randomUUID(), fullName, phone};
  if (id) {
    const store = getStore();
    const newStore = store.map((item) => {
      item.contacts = item.contacts.filter((item) => item.id !== id);
      return item;
    });
    setStore(newStore);
  }
  const store = getStore();
  const newStore = store.map((item) => {
    if (item.id === group) {
      item.contacts.push(contact);
    }
    return item;
  });
  setStore(newStore);
  closeContactModal();
  delete saveContactButton.dataset.contactId;
  render(newStore);
}

export function removeContact() {
  document.querySelectorAll(".remove-contact").forEach((button) => {
    button.addEventListener("click", (event) => {
      const contactId = event.currentTarget.dataset.contactId;
      const groupId = event.currentTarget.dataset.groupId;
      event.currentTarget.parentElement.remove();
      const store = getStore();
      const newStore = store.map((item) => {
        if (item.id === groupId) {
          item.contacts = item.contacts.filter((item) => item.id !== contactId);
        }
        return item;
      });
      localStorage.setItem("contacts-app-store", JSON.stringify(newStore));
    });
  });
}

export function editContact() {
  document.querySelectorAll(".edit-contact").forEach((button) => {
    button.addEventListener("click", (event) => {
      const contactId = event.currentTarget.dataset.contactId;
      const groupId = event.currentTarget.dataset.groupId;
      const store = getStore();
      const contact = store
        .find((group) => group.id === groupId)
        .contacts.find((contact) => contact.id === contactId);
      showContactModal();
      fullNameInput.value = contact.fullName;
      phoneInput.value = contact.phone;
      groupSelect.value = groupId;
      saveContactButton.dataset.contactId = contactId;
    });
  });
}
