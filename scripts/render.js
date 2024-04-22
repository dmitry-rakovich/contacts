import {getStore} from "./store";
import {removeContact, editContact} from "./contacts";
import {groupSelect, groupsModal, groupsMain, buttonAddGroup} from "./elements";

render(getStore());

export function render(store) {
  groupsMain.innerHTML = renderGroups(store);
  removeContact();
  editContact();
}

export function renderGroups(store) {
  if (store.length < 1) {
    return `<div class="no-contacts">Список контактов пуст</div>`;
  } else {
    return `${store
      .map((groups) => {
        return `
      <details class="groups__item" data-group-id="${groups.id}">
        <summary>
          <p id="group-title">${groups.title}</p>
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
        <div class="contacts">${renderContacts(
          groups.contacts,
          groups.id
        )}</div>
      </details>
      `;
      })
      .join("")}`;
  }
}

function renderContacts(contacts, groupId) {
  return contacts
    .map((contact) => {
      return `
    <div class="contacts__item">
      <span class="full-name">${contact.fullName}</span>
      <span class="phone">${contact.phone}</span>
      <button class="edit-button edit-contact" data-contact-id="${contact.id}" data-group-id="${groupId}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_7085_17)">
        <path opacity="1" d="M3 17.2501V21.0001H6.75L17.81 9.94006L14.06 6.19006L3 17.2501ZM20.71 7.04006C21.1 6.65006 21.1 6.02006 20.71 5.63006L18.37 3.29006C17.98 2.90006 17.35 2.90006 16.96 3.29006L15.13 5.12006L18.88 8.87006L20.71 7.04006Z" fill="black"/>
        </g>
        <defs>
        <clipPath id="clip0_7085_17">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      </button>
      <button class="remove-button remove-contact" data-contact-id="${contact.id}" data-group-id="${groupId}">
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
    </div>
    `;
    })
    .join("");
}

export function renderGroupsSelect() {
  const store = getStore();
  if (store.length < 1) {
    groupSelect.innerHTML = `<option value="" disabled selected>Создайте группу</option>`;
  } else {
    groupSelect.innerHTML = store
      .map((item) => {
        return `<option value="${item.id}">${item.title}</option>`;
      })
      .join("");
  }
}

export function renderGroupsModal() {
  const store = getStore();
  groupsModal.innerHTML = store
    .map((group) => {
      return `
        <div class="item">
        <input type"text" value="${group.title}" data-value="${group.title}" data-group-id="${group.id}"/>
          <button class="remove-button remove-group" data-group-id="${group.id}" >
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
        </div>
      `;
    })
    .join("");
}
