import { connection } from "./jsstore_con";

export class ContactService {

    constructor() {
        this.tableName = "contacts";
    }

    getContacts() {
        return connection.select({
            from: this.tableName,
        });
    }

    addContact(contact) {
        return connection.insert({
            into: this.tableName,
            values: [contact],
            return: true
        });
    }

    getContactById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        });
    }

    removeContact(id) {
        return connection.remove({
            from: this.tableName,
            where: {
                id: id
            }
        });
    }

}
