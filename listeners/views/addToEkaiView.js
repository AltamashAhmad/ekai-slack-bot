// listeners/views/addToEkaiView.js

import { privacyModal } from '../model/privacyModal.js';

 const addToEkaiView = async ({ ack, body, client }) => {
    await ack(); // Acknowledge the first modal submission

    try {
        // Open the privacy modal
        await client.views.open({
            trigger_id: body.trigger_id,
            view: privacyModal()
        });
    } catch (error) {
        console.error('Error opening privacy modal:', error);
    }
};

export{addToEkaiView};