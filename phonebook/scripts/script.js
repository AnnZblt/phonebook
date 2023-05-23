
import {
  getStorage as dataStorage,
} from '/phonebook/scripts/modules/serviceStorage.js';
import render from '/phonebook/scripts/modules/render.js';
import * as control from '/phonebook/scripts/modules/control.js';
{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = dataStorage();
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = render.renderPhoneBook(app, title);

    // Функционал
    const allRow = render.renderContacts(list, data);
    const {
      closeModal,
    } = control.modalControl(btnAdd, formOverlay);

    render.hoverRow(allRow, logo);
    control.deleteControl(btnDel, list);
    control.formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
}
