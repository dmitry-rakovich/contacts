import {render} from "./render";
import {closeGroupModal} from "./modals";
import {getStore, setStore} from "./store";
import {buttonAddGroup, buttonSaveGroup, groups} from "./elements";

buttonAddGroup.addEventListener("click", addGroup);

buttonSaveGroup.addEventListener("click", saveGroup);

function addGroup() {
  const id = window.crypto.randomUUID();
  groups.innerHTML += `
    <div class="item">
        <input type="text" value="" data-group-id="${id}"/>
        <button class="remove-button remove-group" data-group-id="${window.crypto.randomUUID()}" >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1894_240)">
                <path opacity="1"
                d="M6.66664 20.3889C6.66664 21.55 7.61664 22.5 8.77775 22.5H17.2222C18.3833 22.5 19.3333 21.55 19.3333 20.3889V7.72222H6.66664V20.3889ZM9.26331 12.8733L10.7516 11.385L13 13.6228L15.2378 11.385L16.7261 12.8733L14.4883 15.1111L16.7261 17.3489L15.2378 18.8372L13 16.5994L10.7622 18.8372L9.27386 17.3489L11.5116 15.1111L9.26331 12.8733ZM16.6944 4.55556L15.6389 3.5H10.3611L9.30553 4.55556H5.61108V6.66667H20.3889V4.55556H16.6944Z"
                fill="black" />
            </g>
            <defs>
                <clipPath id="clip0_1894_240">
                <rect width="25.3333" height="25.3333" fill="white" transform="translate(0.333252 0.333313)" />
                </clipPath>
            </defs>
            </svg>
        </button>
    </div>`;
  setValue(id);
  removeGroup();

  groups.querySelector(`input[data-group-id='${id}']`).focus();
}

function saveGroup() {
  groups.querySelectorAll(".item input").forEach((item) => {
    if (!item.value.trim()) {
      item.parentElement.remove();
    } else {
      const store = getStore();
      const group = store.find((group) => group.id === item.dataset.groupId);
      if (group) {
        group.title = item.value;
      } else {
        store.push({
          id: item.dataset.groupId,
          title: item.dataset.value,
          contacts: [],
        });
      }
      setStore(store);
      render(store);
    }
    closeGroupModal();
  });
}

export function removeGroup() {
  document.querySelectorAll(".remove-group").forEach((button) => {
    button.addEventListener("click", (event) => {
      const groupId = event.currentTarget.dataset.groupId;
      event.currentTarget.parentElement.remove();
      const store = getStore();
      const newStore = store.filter((item) => item.id !== groupId);
      localStorage.setItem("contacts-app-store", JSON.stringify(newStore));
      closeGroupModal();
      render(newStore);
    });
  });
}

function setValue(id) {
  const input = document.querySelector(`input[data-group-id='${id}']`);
  input.addEventListener("input", (event) => {
    input.dataset.value = event.target.value;
  });
}
