// listeners/model/addEkai.js
function addEkaiModal() {
    return {
    "type": "modal",
    "title": {
        "type": "plain_text",
        "text": "Let Ekai Learn From You",
        "emoji": true
    },
    "close": {
        "type": "plain_text",
        "text": "Close",
        "emoji": true
    },
    "submit": {
        "type": "plain_text",
        "text": "Next",
        "emoji": true
    },
    "clear_on_close": false,
    "notify_on_close": true,
    "callback_id": "add_to_ekai_modal",
    "blocks": [
        {
            "type": "input",
            "block_id": 'text_input',
            "element": {
                "type": "rich_text_input",
                "action_id": "input",
                "placeholder": {
                    "type": "plain_text",
                    "text": "What's on your mind?"
                }
            },
            "label": {
                "type": "plain_text",
                "text": "Write your thoughts",
                "emoji": true
            },
            "optional": false
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Google Drive* \n Upload Google docx, Google Slides, or Google Spreadsheets etc."
            },
            "accessory": {
                "type": "image",
                "image_url": "https://firebasestorage.googleapis.com/v0/b/idx-tech-8ac99.appspot.com/o/ekai%2Ficons%2FDrive.png?alt=media&token=d1cc08e9-a59d-4131-af42-8b099e8573c1",
                "alt_text": "Google"
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "action_id": "open_drive",
                    "text": {
                        "type": "plain_text",
                        "text": "Open",
                        "emoji": true
                    },
                    "value": "Open"
                }
            ]
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*Upload from my local computer* \n Upload any file formats such as PDF, DOCX, \nPPTX, etc."
            },
            "accessory": {
                "type": "image",
                "image_url": "https://firebasestorage.googleapis.com/v0/b/idx-tech-8ac99.appspot.com/o/ekai%2Ficons%2FLocalComputer.png?alt=media&token=b529cfa3-3697-4b00-a614-db353ef10d0f",
                "alt_text": "LocalComputer"
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "action_id": "open_upload",
                    "text": {
                        "type": "plain_text",
                        "text": "Upload",
                        "emoji": true
                    },
                    "value": "Upload"
                }
            ]
        }
    ]
};
}
export {addEkaiModal};













// export const addEkaiModal = {
//     type: 'modal',
//     callback_id: 'add_to_ekai_modal',
//     title: {
//         type: 'plain_text',
//         text: 'Add to Ekai'
//     },
//     blocks: [
//         {
//             type: 'input',
//             block_id: 'input_block',
//             label: {
//                 type: 'plain_text',
//                 text: 'Enter details to add'
//             },
//             element: {
//                 type: 'plain_text_input',
//                 action_id: 'input_action'
//             }
//         },
//         {
//             type: 'section',
//             text: {
//                 type: 'mrkdwn',
//                 text: "Add any additional instructions or fields here."
//             }
//         }
//     ],
//     submit: {
//         type: 'plain_text',
//         text: 'Submit'
//     }
// };
