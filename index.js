require("dotenv").load();
const Commands = require("./Commands");

new Commands()
    .Init((BOT) => {
        BOT.sendMessage(process.env.PRIVATE_CHATID, `O pai tá On!`);
    })
    .onMessage("start", (BOT, { from, chat, date, text, entities }) => {
        BOT.sendMessage(chat.id, "Escolha uma das seguintes opções:", {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: "Botão 1", callback_data: "btn1" }],
                    [{ text: "Botão 2", callback_data: "btn2" }],
                ],
            }),
        });
    })
    .onCallBack("btn1", (BOT, { message, data, id, from, chat_instance }) => {
        BOT.editMessageText("Você clicou no btn 1", {
            chat_id: message.chat.id,
            message_id: message.message_id,
        });
    })
    .onCallBack("btn2", (BOT, { message, data, id, from, chat_instance }) => {
        BOT.editMessageText("Você clicou no btn 2", {
            chat_id: message.chat.id,
            message_id: message.message_id,
        });
    });
