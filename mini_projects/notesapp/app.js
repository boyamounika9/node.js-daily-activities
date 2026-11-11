
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



async function main(params) {
    while (true) {
        const option = await getInput(`
            1. Create Note \n
            2. View All Notes \n
            3. Search Note \n
            4. Edit Note \n
            5. Delete Note \n
            6. Exit 

            Enter your choice:`)


        switch (option) {
            case "1":
                await addnote();
                break;
            case "2":
                await viewnotes();
                break;
            case "3":
                await searchnote();
                break;
            case "4":
                await editnote();
                break;
            case "5":
                await deletenote();
                break;
            case "6":
                console.log("Thank you !!")
                rl.close()
                return
            default:
                console.log("Invalid choice!");

        }
    }
}
main()

let jsondata = fs.readFileSync('./notes.json', "utf8")
let notesdata = JSON.parse(jsondata)
async function addnote(params) {
    const title = await getInput("Enter the title :\n")
    const content = await getInput("Write the Content:\n")

    let data = {
        id: Math.floor(Math.random() * 1000),
        title: title,
        content: content,
    }

    notesdata.push(data)

    fs.writeFileSync("./notes.json", JSON.stringify(notesdata, null, 2))

    console.log("New Note is added sucessfully")
}


async function viewnotes(params) {
    if (notesdata.length == 0) {
        console.log("There no notes to display ... please add any note")
    }
    else {
        notesdata.forEach((ele) => {
            console.log(`ID: ${ele.id}`);
            console.log(`Title: ${ele.title}`);
            console.log(`Content: ${ele.content}`);
            console.log("----------------------");
        });
    }
}


async function searchnote(params) {
    const noteid = await getInput("Enter ID of note which you need to display:\n")
    let note = notesdata.find(ele => ele.id == noteid)
    if (note) {
        console.log(`ID: ${note.id}`);
        console.log(`Title: ${note.title}`);
        console.log(`Content: ${note.content}`);
        console.log("----------------------");
    }
    else {
        console.log("Please enter valid ID")
    }
}


async function editnote() {

    const noteid = await getInput("Enter ID of note to edit:\n");

    let note = notesdata.find(ele => ele.id == noteid);

    if (!note) {
        console.log("Note not found! Please enter a valid ID.");
        return;
    }

    const opt = await getInput(`
        What do you want to edit?

        1. Title
        2. Content
        3. Both

        Enter your choice: `);

    switch (opt) {

        case "1":
            note.title = await getInput("Enter new title:\n");
            break;

        case "2":
            note.content = await getInput("Enter new content:\n");
            break;

        case "3":
            note.title = await getInput("Enter new title:\n");
            note.content = await getInput("Enter new content:\n");
            break;

        default:
            console.log("Invalid choice!");
            return;
    }

    fs.writeFileSync("./notes.json", JSON.stringify(notesdata, null, 2));

    console.log("Note updated successfully!");
}




async function deletenote() {



    const noteid = await getInput("Enter note ID to delete:\n");

    let note = notesdata.find(ele => ele.id == noteid);

    if (!note) {
        console.log("Note not found!");
        return;
    }

    let updateddata = notesdata.filter(ele => ele.id != noteid);

    fs.writeFileSync(
        "./notes.json",
        JSON.stringify(updateddata, null, 2)
    );

    console.log("Note deleted successfully!");
}
