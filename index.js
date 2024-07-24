const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose')
const URL = require('./model/url')
const shortid = require('shortid');
require('dotenv').config()

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDb connected'))

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('create')) {
        const url = message.content.split('create')[1].trim( )
        const shortId = shortid.generate()
        await URL.create({
            shortId,
            redirectUrl: url,
        })
        return message.reply({
            content: `Generated Short ID for ${url}: http://localhost:3000/${shortId}`
        })
    }
    message.reply({
        content: "Hi From Bot"
    })
})

client.login(process.env.DISCORD_TOKEN)