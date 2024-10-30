import { config } from 'dotenv';
import pkg from '@slack/bolt';
const { App } = pkg;
import { commandListener } from './listeners/commandListener.js';
import { messageListener } from './listeners/messageListener.js';
import { addToEkaiView } from './listeners/views/addToEkaiView.js';
import { privacyView } from './listeners/views/privacyView.js';
import {registerHomeListener} from './home.js'
config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
});

// Register listeners
commandListener(app);
messageListener(app);
registerHomeListener(app);

// Handle modal submission from /add-to-ekai command
app.view('add_to_ekai_modal', addToEkaiView);
app.view('privacy_modal', privacyView);

// Start the app
(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Slack bot is running!');
})();
