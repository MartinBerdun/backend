import messagesModel from "../models/messages.model.js";

class MessagesManager {
    constructor(){}

    createMessage = async (message) => {
        try {
            const messageCreate = await messagesModel.create(message);
            return messageCreate;
        } catch (error) {
            console.log(error);
        }
    }

    getMessages = async () =>{
        try {
            const messages = await messagesModel.find();
            return messages;
        } catch (error) {
            console.log(error);
        }
    }

}

export default MessagesManager;