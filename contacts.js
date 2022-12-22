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
  return contactsList
}

async function getContactById(contactId) {
  const contactsList = await listContacts()
  const index = contactsList.findIndex((contact) => contact.id === contactId)

  const contactById = contactsList[index]
  return contactById
}

async function removeContact(contactId) {
  const contactsList = await listContacts()
  const updatedContactList = contactsList.filter(
    (contact) => contact.id !== contactId
  )
  await fs.writeFile(contactsPath, JSON.stringify(updatedContactList))
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  }
  const contactsList = await listContacts()
  const newContactsList = [...contactsList, newContact]
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
}

// Зроби експорт створених функцій через module.exports
module.exports = { listContacts, getContactById, removeContact, addContact }
