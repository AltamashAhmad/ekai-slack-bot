import fs from 'fs';
import axios from 'axios';
import slackifyMarkdown from 'slackify-markdown';

const staticResponses = [
    "Hi! How can I help you today?",
    "Hello! What can I assist you with?",
    "Hey there! How may I help you?",
    "Greetings! What do you need help with?",
    "Hi! How can I be of assistance today?"
];

const messageListener = (app) => {
    app.message(async ({ message, client }) => {
        if (message.subtype && message.subtype === 'bot_message') {
            return;
        }

        try {
            if (message.files && message.files.length > 0) {
                for (const file of message.files) {
                    const fileUrl = file.url_private_download;
                    const fileName = file.name;

                    const response = await axios({
                        url: fileUrl,
                        method: 'GET',
                        responseType: 'stream',
                        headers: {
                            'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`
                        }
                    });

                    const path = `./downloads/${fileName}`;
                    response.data.pipe(fs.createWriteStream(path));

                    await client.chat.postMessage({
                        channel: message.channel,
                        text: `File ${fileName} has been downloaded.`
                    });
                }
            } else {
                const randomResponse = staticResponses[Math.floor(Math.random() * staticResponses.length)];
                const formattedMessage = slackifyMarkdown(randomResponse);
                await client.chat.postMessage({
                    channel: message.channel,
                    text: formattedMessage
                });
            }
        } catch (error) {
            console.error('Error handling message:', error);
            await client.chat.postMessage({
                channel: message.channel,
                text: 'Oops! Something went wrong. Please try again later.'
            });
        }
    });
};

export {messageListener};