// listeners/model/privacyModal.js

function privacyModal() {
    return {
        type: "modal",
        callback_id: "privacy_modal",
        title: {
            type: "plain_text",
            text: "Privacy Settings",
            emoji: true
        },
        close: {
            type: "plain_text",
            text: "Close",
            emoji: true
        },
        submit: {
            type: "plain_text",
            text: "Save",
            emoji: true
        },
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "Please choose your privacy setting:"
                }
            },
            {
                type: "input",
                block_id: "privacy_options",
                element: {
                    type: "radio_buttons",
                    action_id: "select_privacy",
                    options: [
                        {
                            text: {
                                type: "plain_text",
                                text: "Public",
                                emoji: true
                            },
                            value: "public"
                        },
                        {
                            text: {
                                type: "plain_text",
                                text: "Private",
                                emoji: true
                            },
                            value: "private"
                        }
                    ]
                },
                label: {
                    type: "plain_text",
                    text: "Privacy Level",
                    emoji: true
                }
            }
        ]
    };
}

export { privacyModal };
