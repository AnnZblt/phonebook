'use strict';
const data = [];

{
  const addContactData = contact => {
    data.push(contact);
    console.log('data: ', data);
  };

  const createContainer = () => {
    const container = document.createElement('div');

    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    const headerContainer = createContainer();

    header.classList.add('header');
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');

    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();

    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement('button');

      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-stripped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    tbody.classList.add('contact-list');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    const footerContainer = createContainer();

    footer.classList.add('footer');
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    return footer;
  };

  const createFooterLogo = title => {
    const footerText = document.createElement('p');
    footerText.textContent = `Все права защищены © ${title}`;
    return footerText;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name"
          id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname"
          id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone"
          id="phone" type="number" required>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const { form, overlay } = createForm();
    const footer = createFooter();
    const footerLogo = createFooterLogo(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    footer.footerContainer.append(footerLogo);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement('tr');
    const tdDel = document.createElement('td');
    const buttonDel = document.createElement('button');
    const tdName = document.createElement('td');
    const tdSurname = document.createElement('td');
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');

    tr.classList.add('contact');
    tdDel.classList.add('delete');
    buttonDel.classList.add('del-icon');

    tdName.textContent = firstName;
    tdName.classList.add('contact-name');

    tdSurname.textContent = surname;
    tdSurname.classList.add('contact-surname');

    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    phoneLink.classList.add('contact-phone');
    tr.phoneLink = phoneLink;
    tr.dataset.phone = phone;

    buttonEdit.classList.add('edit-icon');

    tdDel.append(buttonDel);
    tdPhone.append(phoneLink);
    tdEdit.append(buttonEdit);
    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
        console.log('Mouse enter');
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
        console.log('Mouse leave');
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', event => {
      if (event.target === formOverlay ||
        event.target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const getStorage = key => {
    const storageData = localStorage.getItem(key);
    if (storageData) {
      return JSON.parse(storageData);
    } else {
      return [];
    }
  };

  const setStorage = (key, obj) => {
    const newData = getStorage(key);
    newData.push(obj);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  const removeStorage = phoneNumber => {
    const contacts = getStorage('contact-list');
    let removeItemIndex = -1;
    contacts.findIndex((contact, index) => {
      if (contact.phone === phoneNumber) {
        removeItemIndex = index;
        return removeItemIndex;
      }
    });
    console.log(removeItemIndex);

    if (removeItemIndex !== -1) {
      contacts.splice(removeItemIndex, 1);
      localStorage.setItem('contact-list', JSON.stringify(contacts));
    }
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', event => {
      const target = event.target;
      if (target.closest('.del-icon')) {
        let removePhone = target.closest('.contact').dataset.phone;
        removeStorage(removePhone);
        target.closest('.contact').remove();
      }
    });
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const newContact = Object.fromEntries(formData);

      addContactPage(newContact, list);
      addContactData(newContact);
      console.log(newContact);
      setStorage('contact-list', newContact);
      form.reset();
      closeModal();
    });
  };

  const storageContacts = (key, list) => {
    const contactsList = getStorage(key);

    contactsList.forEach(contact => {
      addContactPage(contact, list);
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);


    // Функционал
    const allRow = renderContacts(list, data);
    const { closeModal } = modalControl(btnAdd, formOverlay);

    storageContacts('contact-list', list);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
}
