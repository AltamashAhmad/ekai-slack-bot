// listeners/views/privacyView.js

 const privacyView = async ({ ack, body, view, client }) => {
    await ack(); // Acknowledge the privacy modal submission

    // Retrieve selected privacy option
    const selectedPrivacy = view.state.values.privacy_options.select_privacy.selected_option.value;
    const userId = body.user.id;

    // Send a confirmation message to the user
    try {
        await client.chat.postMessage({
            channel: userId,
            text: `Your privacy setting is set to: ${selectedPrivacy}. Thank you!`
        });
    } catch (error) {
        console.error('Error sending confirmation message:', error);
    }
};

export{privacyView };