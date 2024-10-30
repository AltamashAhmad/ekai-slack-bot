import pkg from '@slack/bolt'; // Import as a default package
const { App } = pkg; // Destructure the named export

// Function to register the app_home_opened listener
export function registerHomeListener(app) {
    app.event('app_home_opened', async ({ event, client }) => {
        try {
            await client.views.publish({
                user_id: event.user,
                view: {
                    type: 'home',
                    blocks: [
                        {
                            type: 'header',
                            text: {
                                type: 'plain_text',
                                text: "Welcome to Ekai",
                                emoji: true
                            }
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: "Ekai creates your digital twin on Slack :robot_face:, trained by you to respond on your behalf :speaking_head_in_silhouette:. This saves both you and your team's time :alarm_clock: by handling the routine queries automatically :rocket:."
                            }
                        },
                        {
                            type: 'divider'
                        },
                        {
                            type: 'header',
                            text: {
                                type: 'plain_text',
                                text: "Add anything from anywhere",
                                emoji: true
                            }
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: "*`/ekai add`*: Enhances the utility of your Ekai by incorporating content from various sources such as your local drive, Google Drive, and plain text."
                            }
                        },
                        {
                            type: 'actions',
                            elements: [
                                {
                                    type: 'button',
                                    text: {
                                        type: 'plain_text',
                                        text: "ADD to Ekai",
                                        emoji: true
                                    },
                                    value: "click_me_123",
                                    action_id: "actionId-0"
                                }
                            ]
                        },
                        {
                            type: 'header',
                            text: {
                                type: 'plain_text',
                                text: "Ask anything from anywhere",
                                emoji: true
                            }
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: "*`/ekai query`* or *`/ekai gpt`*: Leverage these commands to access information, produce responses, enhance written communication, and more."
                            }
                        },
                        {
                            type: 'actions',
                            elements: [
                                {
                                    type: 'button',
                                    text: {
                                        type: 'plain_text',
                                        text: "Launch Ekai GPT",
                                        emoji: true
                                    },
                                    value: "click_me_123",
                                    action_id: "actionId-0"
                                }
                            ]
                        },
                        {
                            type: 'divider'
                        },
                        {
                            type: 'header',
                            text: {
                                type: 'plain_text',
                                text: "Connect to Your Apps",
                                emoji: true
                            }
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: "Ekai works best when you connect all your apps to it. The system learns directly from the information on that platform."
                            }
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: "Connect your Google Drive"
                            },
                            accessory: {
                                type: 'button',
                                text: {
                                    type: 'plain_text',
                                    text: "Authenticate Google Drive",
                                    emoji: true
                                },
                                value: "click_me_123",
                                action_id: "button-action"
                            }
                        },
                        {
                            type: 'section',
                            text: {
                                type: 'mrkdwn',
                                text: "Connect your Calendar"
                            },
                            accessory: {
                                type: 'button',
                                text: {
                                    type: 'plain_text',
                                    text: "Authenticate Calendar",
                                    emoji: true
                                },
                                value: "click_me_123",
                                action_id: "button-action"
                            }
                        },
                        {
                            type: "divider"
                        },
                        {
                            type: "header",
                            text: {
                                type: "plain_text",
                                text: "Data Privacy",
                                emoji: true
                            }
                        },
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: "*Only the data that is manually entered into Ekai will be retained as your context. The stored information will be in vector embedding format rather than its original form.*"
                            }
                        },
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: "*In the pursuit of finding solutions, we may review your past discussions, which you have access to, in order to craft a reply. Rest assured, no data will be stored.*"
                            }
                        },
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: "*The context utilized to generate responses will be clearly displayed as the source. In cases where no source is provided, it indicates that personal context was not employed, and the response primarily originates from AI.*"
                            }
                        },
                        {
                            type: "divider"
                        },
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: "Learn More: Have questions? Contact us at gtmadmin@yourekai.com or share your feedback from the home page."
                            }
                        }
                    ]
                }
            });
        } catch (error) {
            console.error(error);
        }
    });
}



//         try {
//             await client.views.publish({
//                 user_id: event.user,
//                 view: {
//                     type: 'home',
//                     blocks: [
//                         // ... your existing blocks
//                     ]
//                 }
//             });
//         } catch (error) {
//             console.error(error);
//         }
//     });
// }
