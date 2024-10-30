import slackifyMarkdown from 'slackify-markdown';
import { addEkaiModal } from './model/addEkai.js';


 const commandListener = (app) => {
    // Listener for the /ekai command
    app.command('/ekai', async ({ body, command, ack, respond, client }) => {
        await ack();
        const channelId = body.channel_id;

        try {
            const result = await client.conversations.info({ channel: channelId });
            await respond(`Processing your query: ${command.text}`);
        } catch (error) {
            if (error.data && error.data.error === 'channel_not_found') {
                await respond({
                    text: "Ekai is not added to this private channel. Please add it to use this feature.",
                    blocks: [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Ekai is not added to this private channel. You can add it below to ask your question."
                            }
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

    // Listener for the /add-to-ekai command that opens a modal
    app.command('/add-to-ekai', async ({ ack, body, client }) => {
        await ack();

        try {
            // Open the modal
            await client.views.open({
                trigger_id: body.trigger_id,
                view: addEkaiModal()
            });
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    });
};

export{commandListener};
