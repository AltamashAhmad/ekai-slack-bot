// listeners/views/privacyView.js

const privacyView = async ({ ack, body, view, client }) => {
    await ack();

    try {
        // Get the stored text input from private_metadata
        const { userText } = JSON.parse(view.private_metadata);
        
        // Get the selected privacy option
        const selectedPrivacy = view.state.values.privacy_options.select_privacy.selected_option.value;
        const userId = body.user.id;

        // Send a confirmation message with both the text and privacy setting
        await client.chat.postMessage({
            channel: userId,
            text: `Your submission has been received! Text: ${userText} | Privacy Setting: ${selectedPrivacy}`,
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Your submission has been received!*"
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Text:*\n${userText}\n\n*Privacy Setting:* ${selectedPrivacy}`
                    }
                }
            ]
        });
        
    } catch (error) {
        console.error('Error processing submission:', error);
    }
};

export{privacyView };