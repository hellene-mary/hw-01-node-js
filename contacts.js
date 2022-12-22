const { nanoid } = require("nanoid")
// Зроби імпорт модулів fs і path для роботи з файловою системою
const fs = require("fs/promises")
const path = require("node:path")

// Створи змінну contactsPath і запиши в неї шлях до файлу contacts.json. Для складання шляху використовуй методи модуля path.

const contactsPath = path.resolve(__dirname, "./db/contacts.json")

// Додай функції для роботи з колекцією контактів. У функціях використовуй модуль fs та його методи readFile() і writeFile()

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" })
  const contactsList = JSON.parse(data)
  // console.log("contactsList", contactsList)
  return contactsList
}
// listContacts()

async function getContactById(contactId) {
  const contactsList = await listContacts()
  const index = contactsList.findIndex((contact) => contact.id === contactId)

  const contactById = contactsList[index]
  // console.log("contactById", contactById)
  return contactById
}

// getContactById("2")

async function removeContact(contactId) {
  const contactsList = await listContacts()
  const updatedContactList = contactsList.filter(
    (contact) => contact.id !== contactId
  )
  // console.log("updatedContactList", updatedContactList)
  await fs.writeFile(contactsPath, JSON.stringify(updatedContactList))
}

// removeContact("R8urq4GsKxDzRtBFtpMl4")

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  }
  // console.log("newContact", newContact)

  const contactsList = await listContacts()
  // console.log("contactsList", contactsList)

  const newContactsList = [...contactsList, newContact]
  console.log("newContactsList", newContactsList)
  // const newContactsList = data + JSON.stringify(newContact)
  // console.log("newContactsList", newContactsList)
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
}

// addContact("Ann2a", "email2", "154r3789")

// Зроби експорт створених функцій через module.exports
module.exports = { listContacts, getContactById, removeContact, addContact }
