const { Command } = require("commander")
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts")

// listContacts()
// getContactById("2")
// addContact("Ann2a", "email2", "154r3789")
// removeContact("ngmoKSmTGLw_f1Y1TRzuN")

const program = new Command()
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")

program.parse(process.argv)

const argv = program.opts()

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      console.log("Action list, calling a function listContacts")
      listContacts()
      break

    case "get":
      // ... id
      console.log("id", id)
      console.log("Action get, calling a function getContactById")
      // getContactById(id)
      break

    case "add":
      // ... name email phone
      console.log("Action add, calling a function addContact")
      // addContact(name, email, phone)
      break

    case "remove":
      // ... id
      console.log("id", id)
      console.log("Action remove, calling a function removeContact")
      // removeContact(id)
      break

    default:
      console.warn("\x1B[31m Unknown action type!")
  }
}

invokeAction(argv)
