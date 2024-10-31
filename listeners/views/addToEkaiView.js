// listeners/views/addToEkaiView.js

import { privacyModal } from '../model/privacyModal.js';

const addToEkaiView = async ({ ack, body, view, client }) => {
    await ack();

    // Extract the actual text from the rich text structure
    const richTextValue = view.state.values.text_input.input.rich_text_value;
    const userText = richTextValue.elements[0].elements[0].text;

    try {
        await client.views.open({
            trigger_id: body.trigger_id,
            view: {
                ...privacyModal(),
                private_metadata: JSON.stringify({ userText })
            }
        });
    } catch (error) {
        console.error('Error opening privacy modal:', error);
    }
};

export{addToEkaiView};