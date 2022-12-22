const { nanoid } = require("nanoid")

const fs = require("fs/promises")
const path = require("node:path")

const contactsPath = path.resolve(__dirname, "./db/contacts.json")

async function getContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" })
  const contactsList = JSON.parse(data)
  return contactsList
}

async function getContactById(contactId) {
  const contactsList = await getContacts()
  const contactById = contactsList.find((contact) => contact.id === contactId)
  return contactById
}

async function removeContact(contactId) {
  const contactsList = await getContacts()
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
  const contactsList = await getContacts()

  contactsList.push(newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contactsList))
  return newContact
}

module.exports = { getContacts, getContactById, removeContact, addContact }
