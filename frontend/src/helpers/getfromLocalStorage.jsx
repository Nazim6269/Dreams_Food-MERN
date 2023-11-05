export const setDataLocalStorage = (data) => {
  localStorage.setItem("myCart", JSON.stringify(data));
};

export const getDataFromLocalStorage = () => {
  let data = localStorage.getItem("myCart");
  if (data == []) {
    return [];
  } else {
    return JSON.parse(data);
  }
};

export const setSelectedProduct = (data) => {
  localStorage.setItem("selectedProduct", JSON.stringify(data));
};

export const getSelectedProduct = () => {
  let data = localStorage.getItem("selectedProduct");
  if (data == []) {
    return [];
  } else {
    return JSON.parse(data);
  }
};
