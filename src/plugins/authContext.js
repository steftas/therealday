const getLocalStorage = (key) => {
  let data = window.localStorage.getItem("store") || null;
  data = JSON.parse(data);
  if (!data) return null;
  return key in data ? data[key] : null;
};

const setLocalStorage = (key, value) => {
  let data = window.localStorage.getItem("store") || null;
  data = JSON.parse(data) || {};
  data[key] = value;
  window.localStorage.setItem("store", JSON.stringify(data));
};

export { getLocalStorage, setLocalStorage };
