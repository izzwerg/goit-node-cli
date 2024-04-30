import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  return await fs
    .readFile(contactsPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err.message);
        return;
      }
      return JSON.parse(data);
    })
}

export async function getContactById(contactId) {
  return await fs
    .readFile(contactsPath)
    .then((data) => {
      let mass = JSON.parse(data);
      let needContact = mass.find((contact) => contact.id === contactId);
      if (needContact === undefined) {
        return null;
      } else {
        return needContact;
      }
    })
    .catch((err) => console.log(err.message));
}

export async function removeContact(contactId) {
  return await fs
    .readFile(contactsPath)
    .then((data) => {
      let mass = JSON.parse(data);
      let delContact = mass.find((contact) => contact.id === contactId);
      if (delContact === undefined) {
        return null;
      } else {
        let filteredMass = mass.filter((contact) => contact.id != contactId);
        fs.writeFile(contactsPath, JSON.stringify(filteredMass), (err) => {
          if (err) {
            console.log(err.message);
          }
        });
        return delContact;
      }
    })
    .catch((err) => console.log(err.message));
}

export async function addContact(name, email, phone) {
  let newContact = {
    name: name,
    email: email,
    phone: phone,
    id: nanoid(),
  };
  let allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts), (err) => {
    if (err) {
      console.log(err.message);
    }
  });
  return newContact;
}
