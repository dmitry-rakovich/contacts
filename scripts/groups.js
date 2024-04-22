import {render} from "./render";
import {closeGroupModal} from "./modals";
import {getStore, setStore} from "./store";
import {groupsModal, groupsMain} from "./elements";

export function addGroup() {
  const id = window.crypto.randomUUID();
  groupsModal.insertAdjacentHTML(
    "beforeend",
    `
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
    </div>`
  );
  setValue(id);

  groupsModal.querySelector(`input[data-group-id='${id}']`).focus();
}

export function checkGroups() {
  const allGroups = [...groupsModal.querySelectorAll(".item input")];
  const group = allGroups.find((item) => !item.value.trim());
  if (group) {
    group.focus();
    return;
  } else {
    saveGroups();
  }
}

function saveGroups() {
  const store = getStore();
  const newStore = [];
  groupsModal.querySelectorAll(".item input").forEach((item) => {
    const group = store.find((group) => group.id === item.dataset.groupId);
    if (group) {
      group.title = item.value;
      updateGroup(item.dataset.groupId, item.value);
      newStore.push({
        id: item.dataset.groupId,
        title: item.value,
        contacts: group.contacts,
      });
    } else {
      newStore.push({
        id: item.dataset.groupId,
        title: item.value,
        contacts: [],
      });
      renderGroup(item.dataset.groupId, item.value);
    }
  });
  setStore(newStore);
  render(newStore);
  closeGroupModal();
}

function renderGroup(id, title) {
  groupsMain.innerHTML += `
  <details class="groups__item" data-group-id="${id}">
        <summary>
          <p id="group-title">${title}</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5" clip-path="url(#clip0_1894_90)">
          <path d="M16.885 8.29504L12.295 12.875L7.70498 8.29504L6.29498 9.70504L12.295 15.705L18.295 9.70504L16.885 8.29504Z" fill="black"/>
          </g>
          <defs>
          <clipPath id="clip0_1894_90">
          <rect width="24" height="24" fill="white"/>
          </clipPath>
          </defs>
          </svg>
        </summary>
        <div class="contacts"></div>
      </details>
  `;
}

function updateGroup(id, title) {
  const group = document.querySelector(`details[data-group-id="${id}"]`);
  group.querySelector("p#group-title").textContent = title;
}

function setValue(id) {
  const input = document.querySelector(`input[data-group-id='${id}']`);
  input.addEventListener("input", (event) => {
    input.dataset.value = event.target.value;
  });
}
