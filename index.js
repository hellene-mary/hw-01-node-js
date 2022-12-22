const { Command } = require("commander")
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts")

const program = new Command()
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("Action list, calling a function listContacts")
      const list = await getContacts()
      console.table(list)
      break

    case "get":
      console.log("Action get, calling a function getContactById")
      const contact = await getContactById(id)
      console.log(contact)
      break

    case "add":
      console.log("Action add, calling a function addContact")

      const newContact = await addContact(name, email, phone)
      console.log("newContact", newContact)
      break

    case "remove":
      console.log("Action remove, calling a function removeContact")
      removeContact(id)
      break

    default:
      console.warn("\x1B[31m Unknown action type!")
  }
}

invokeAction(argv)
