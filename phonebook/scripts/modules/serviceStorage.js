
export const getStorage = () => (localStorage.getItem('phonebook') ?
  JSON.parse(localStorage.getItem('phonebook')) : []);

export const setStorage = data => {
  localStorage.setItem('phonebook', JSON.stringify(data));
};

export const addContactData = contact => {
  const data = getStorage('phonebook');
  data.push(contact);
  setStorage(data);
};

export const removeStorage = phone => {
  const data = getStorage('phonebook');
  const newData = data.filter(item => item.phone !== phone);
  setStorage(newData);
};
