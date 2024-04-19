import {renderGroupsSelect, renderGroupsModal} from "./render";
import {
  buttonShowContactModal,
  buttonCloseContactModal,
  buttonShowGroupModal,
  buttonCloseGroupModal,
  groupModal,
  contactModal,
  contactForm,
  groups,
} from "./elements";

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
});

export function closeGroupModal() {
  groupModal.classList.remove("active");
  groups.innerHTML = "";
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
