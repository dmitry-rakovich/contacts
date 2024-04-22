import {renderGroupsSelect, renderGroupsModal} from "./render";
import {
  buttonShowContactModal,
  buttonCloseContactModal,
  buttonShowGroupModal,
  buttonCloseGroupModal,
  groupModal,
  contactModal,
  contactForm,
  groupsModal,
  buttonAddGroup,
  buttonSaveGroup,
} from "./elements";
import {addGroup, checkGroups} from "./groups";

buttonShowContactModal.addEventListener("click", showContactModal);

buttonCloseContactModal.addEventListener("click", closeContactModal);

contactModal.addEventListener("click", (event) => {
  if (event.target === contactModal) {
    closeContactModal();
  }
});

buttonShowGroupModal.addEventListener("click", showGroupModal);

buttonCloseGroupModal.addEventListener("click", closeGroupModal);

groupModal.addEventListener("click", (event) => {
  if (event.target === groupModal) {
    closeGroupModal();
  }
  if (event.target === buttonAddGroup) {
    addGroup();
  }
  if (event.target === buttonSaveGroup) {
    checkGroups();
  }
  if (event.target.classList.contains("remove-group")) {
    event.target.parentElement.remove();
  }
});

export function closeGroupModal() {
  groupModal.classList.remove("active");
  groupsModal.innerHTML = "";
}
function showGroupModal() {
  renderGroupsModal();
  groupModal.classList.add("active");
}
export function closeContactModal() {
  contactModal.classList.remove("active");
  contactForm.reset();
}

export function showContactModal() {
  renderGroupsSelect();
  contactModal.classList.add("active");
}
