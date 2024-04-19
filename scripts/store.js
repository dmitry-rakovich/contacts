export function getStore() {
  const store = localStorage.getItem("contacts-app-store");
  if (store) {
    return JSON.parse(store);
  } else {
    return [];
  }
}

export function setStore(store) {
  localStorage.setItem("contacts-app-store", JSON.stringify(store));
}
