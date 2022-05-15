const contact = require(process.cwd() + '/public/contact.json')

const getContactList = () => {
    return contact
}

module.exports = {
    getContactList
}