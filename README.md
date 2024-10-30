# Slack Bot - Ekai

Ekai is a Slack bot designed to help teams automate responses, retrieve data, and handle queries seamlessly. This bot integrates with Slack using commands and file handling features to assist users efficiently.

## Features

- **Command Handling**: Supports commands like `/ekai` to respond to queries and add resources.
- **File Downloads**: Automatically downloads files shared in Slack channels.
- **Interactive Home View**: Provides a customized Home tab for users with buttons to add content, query information, and connect applications.

## Project Structure

- **app.js**: Main server file, listens for Slack commands and messages.
- **home.js**: Handles the Slack home tab setup and interactive features.
- **downloads/**: Folder where downloaded files from Slack are stored.
- **node_modules/**: Contains all project dependencies (not included in the repo).

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Slack App**: Set up a Slack App with the required tokens (SLACK_BOT_TOKEN, SLACK_APP_TOKEN).

## Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ekai-slack-bot.git
    cd ekai-slack-bot
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables**:
    - Rename `.env.example` to `.env`:
      ```bash
      cp .env.example .env
      ```
    - Fill in your Slack tokens:
      ```plaintext
      SLACK_BOT_TOKEN=your-slack-bot-token
      SLACK_APP_TOKEN=your-slack-app-token
      ```

4. **Run the bot**:
    ```bash
    npm start
    ```

## Usage

- **Commands**: Use `/ekai` commands in Slack to interact with the bot.
- **File Handling**: Ekai will download files shared in channels to the `downloads` folder.
- **Home Tab**: Navigate to Ekai's Home tab to add or connect applications and review privacy details.

## Dependencies

- [@slack/bolt](https://www.npmjs.com/package/@slack/bolt): Slack SDK for Node.js
- [dotenv](https://www.npmjs.com/package/dotenv): Environment variable management
- [slackify-markdown](https://www.npmjs.com/package/slackify-markdown): Converts Markdown to Slack-compatible messages

## License

This project is licensed under the ISC License. See [LICENSE](LICENSE) for details.
