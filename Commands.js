const TelegramBot = require("node-telegram-bot-api");

module.exports = class Commands {
    constructor() {
        this.BOT = new TelegramBot(process.env.TELEGRAM_TOKEN, {
            polling: true,
        });

        this.BOT.on(
            "callback_query",
            ({ message, data, id, from, chat_instance }) =>
                this.HandleCallback({ message, data, id, from, chat_instance })
        );

        this.BOT.on("message", ({ from, chat, date, text, entities }) =>
            this.HandleMessage({ from, chat, date, text, entities })
        );

        this.callbacks = {};
        this.messages = {};
    }

    Init(callback) {
        callback(this.BOT);
        return this;
    }

    onCallBack(eventName, callback) {
        this.callbacks[eventName] = callback;
        return this;
    }

    onMessage(eventName, callback) {
        this.messages[eventName] = callback;
        return this;
    }

    Normalize(string) {
        return string.replace("/", "");
    }

    HandleCallback({ message, data, id, from, chat_instance }) {
        if (this.callbacks[this.Normalize(data)]) {
            return this.callbacks[this.Normalize(data)](this.BOT, {
                message,
                data,
                id,
                from,
                chat_instance,
            });
        }

        this.BOT.editMessageText("Opção desconhecida", {
            chat_id: message.chat.id,
            message_id: message.message_id,
        });
    }

    HandleMessage({ from, chat, date, text, entities }) {
        if (this.messages[this.Normalize(text)]) {
            this.messages[this.Normalize(text)](this.BOT, {
                from,
                chat,
                date,
                text,
                entities,
            });
        }
    }
};
