require('dotenv').load()
const TelegramBot = require('node-telegram-bot-api')
const bot         = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true })

//ID do chat privado. 
//const private_id  = 529720958

//Recebe o callback de um click no botão, por exemplo.
bot.on('callback_query', ({id, from, message, chat_instance, data}) => {
    let text = (data === '1')  ? 'Você clicou no btn 1' : 'Obrigado por clicar'
    bot.editMessageText(text, {
        chat_id: message.chat.id,
        message_id: message.message_id,
    })
})


//recebe mensagens direcionadas ao bot
bot.on( 'message', ({from, chat, date, text, entities}) => {
    if( text.includes('/start') )
    {
        bot.sendMessage(chat.id, `Olá ${from.first_name}, bem vindo!`)

        //Envia botões para delegar ações
        bot.sendMessage(chat.id, "Escolha uma das seguintes opções:", {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Some button text 1', callback_data: '1' }],
                    [{ text: 'Some button text 2', callback_data: '2' }],
                    [{ text: 'Some button text 3', callback_data: '3' }]
                ]
            })
        })
    }
    else
        bot.sendMessage(chat.id, `Comando inválido`)
})
