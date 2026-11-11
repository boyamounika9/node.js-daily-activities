
const fs = require("fs")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

async function contact() {
    while (true) {
        const option = await getInput(`
===== CONTACT MANAGEMENT =====

1. Add Contact
2. View All Contacts
3. Search Contact
4. Update Contact
5. Delete Contact
6. Exit

Enter your choice: `)

        switch (option) {
            case "1":
                await addcontact()
                break

            case "2":
                viewcontact()
                break

            case "3":
                await searchcontact()
                break

            case "4":
                await updatecontact()
                break

            case "5":
                await deletecontact()
                break

            case "6":
                console.log("Thank you!")
                rl.close()
                return

            default:
                console.log("Invalid choice!")
        }
    }
}


async function addcontact() {
    let jsondata = fs.readFileSync("./contacts.json", "utf8")
    let contactdata = JSON.parse(jsondata)

    const name = await getInput("Enter contact name: ")
    const phone = await getInput("Enter phone number: ")
    const email = await getInput("Enter email: ")
    const address = await getInput("Enter address: ")

    let data = {
        id: Math.floor(Math.random() * 10000),
        name: name,
        phone: phone,
        email: email,
        address: address
    }

    contactdata.push(data)

    fs.writeFileSync("./contacts.json", JSON.stringify(contactdata, null, 2))

    console.log("Contact added successfully!")
}


function viewcontact() {
    let jsondata = fs.readFileSync("./contacts.json", "utf8")
    let contactdata = JSON.parse(jsondata)

    if (contactdata.length == 0) {
        console.log("No contacts available!")
        return
    }

    console.log("\n===== CONTACT LIST =====")

    contactdata.forEach(ele => {
        console.log(`ID: ${ele.id}`)
        console.log(`Name: ${ele.name}`)
        console.log(`Phone: ${ele.phone}`)
        console.log(`Email: ${ele.email}`)
        console.log(`Address: ${ele.address}`)
        console.log("----------------------")
    })
}


async function searchcontact() {
    let jsondata = fs.readFileSync("./contacts.json", "utf8")
    let contactdata = JSON.parse(jsondata)

    const name = await getInput("Enter contact name to search: ")

    let currentcontact = contactdata.find(
        ele => ele.name.toLowerCase() == name.toLowerCase()
    )

    if (currentcontact) {
        console.log("\nContact Found!")
        console.log(currentcontact)
    } else {
        console.log("Contact not found!")
    }
}


async function updatecontact() {
    let jsondata = fs.readFileSync("./contacts.json", "utf8")
    let contactdata = JSON.parse(jsondata)

    const contactid = await getInput("Enter contact ID to update: ")

    let currentcontact = contactdata.find(ele => ele.id == contactid)

    if (currentcontact) {
        const name = await getInput("Enter new name: ")
        const phone = await getInput("Enter new phone: ")
        const email = await getInput("Enter new email: ")
        const address = await getInput("Enter new address: ")

        currentcontact.name = name
        currentcontact.phone = phone
        currentcontact.email = email
        currentcontact.address = address

        fs.writeFileSync("./contacts.json", JSON.stringify(contactdata, null, 2))

        console.log("Contact updated successfully!")
    } else {
        console.log("Contact not found!")
    }
}


async function deletecontact() {
    let jsondata = fs.readFileSync("./contacts.json", "utf8")
    let contactdata = JSON.parse(jsondata)

    const contactid = await getInput("Enter contact ID to delete: ")

    let currentcontact = contactdata.find(ele => ele.id == contactid)

    if (currentcontact) {
        let updateddata = contactdata.filter(ele => ele.id != contactid)

        fs.writeFileSync("./contacts.json", JSON.stringify(updateddata, null, 2))

        console.log("Contact deleted successfully!")
    } else {
        console.log("Contact not found!")
    }
}

contact()
