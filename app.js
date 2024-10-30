import { config } from 'dotenv';
import pkg from '@slack/bolt';
const { App } = pkg;

import fs from 'fs';
import axios from 'axios';
import slackifyMarkdown from 'slackify-markdown';
config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
});

const staticMarkdownResponse = `
# List of items

* item 1
* item 2
* item 3

[here is an example](https://example.com)
`;

// Slack command event listener for the /ekai command
app.command('/ekai', async ({ body, command, ack, respond, client }) => {
    await ack(); // Acknowledge the command request
    const channelId = body.channel_id;
    // console.log('body:', body);
    // console.log('command:', command);

    try {
        //Attempt to get channel information
        const result = await client.conversations.info({ channel: channelId });
        const isPrivate = result.channel.is_private;
        const isMember = result.channel.is_member;
        // console.log('result:', result);
        // console.log('isPrivate:', isPrivate);
        // console.log('isMember:', isMember);
        if (isPrivate && !isMember) {
            // Bot is not a member of the private channel
            await respond({
                text: "Ekai is not added to this private channel. Please add it to use this feature.",
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Ekai is not added to this private channel. You can add it below to ask your question."
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Add Ekai to Channel"
                                },
                                "url": `slack://app?team=${body.team_id}&id=${body.api_app_id}`
                            }
                        ]
                    }
                ]
            });
        } else {
            // Bot can respond in this channel
            await respond(`Processing your query: ${command.text}`);
        }
    } catch (error) {
        if (error.data && error.data.error === 'channel_not_found') {
            // Bot is not a member of the private channel
            await respond({
                text: "Ekai is not added to this private channel. Please add it to use this feature.",
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Ekai is not added to this private channel. You can add it below to ask your question."
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "text": "Add Ekai to Channel"
                                },
                                "url": `slack://app?team=${body.team_id}&id=${body.api_app_id}`
                            }
                        ]
                    }
                ]
            });
        } else {
            console.error('Error handling /ekai command:', error);
            await respond({
                text: 'Oops! Something went wrong. Please try again later.'
            });
        }
    }
});

// Slack message event listener
app.message(async ({ message, client }) => {
    // Ignore messages from the bot itself
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

// Start your app
(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Slack bot is running!');
})();
