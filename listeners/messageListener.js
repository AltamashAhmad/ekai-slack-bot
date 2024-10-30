import fs from 'fs';
import axios from 'axios';
import slackifyMarkdown from 'slackify-markdown';

const staticMarkdownResponse = `
# List of items

* item 1
* item 2
* item 3

[here is an example](https://example.com)
`;

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
                const formattedMessage = slackifyMarkdown(staticMarkdownResponse);
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