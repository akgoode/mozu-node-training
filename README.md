# Mozu Node Training

### Prerequisites
1. Mozu Dev Center account.
2. Access to at least one developer account.
3. Familiarity with Javascript and the Node.js runtime environment.

### Instructions

1. Create an application record in Dev Center.
3. Install ngrok from [here](https://ngrok.com/download).  If you use a Mac and Homebrew, you can run `brew cask install ngrok` in your terminal.
4. Download or clone this repository.
3. From the root of this project, install dependencies by running `npm install`.
7. Create a `mozu.config.json` file in the root of your project using your application key and secret from dev center.
4. Start dev server by running `npm run start`.  The server uses port 8080 by default.
5. In a separate terminal, run `ngrok http 8080` to create an endpoint to which you can link in Dev Center.  Depending on how you installed it, you may need to run this command from the directory ngrok was installed in.  This will generate a URL which will serve your configuration app with HTTPS.
8. From your application screen in Dev Center, under the packages tab, enter the HTTPS URL in the box and hit save.
9. Subscribe to events.  This app comes with one preconfigured route to handle event notifications, but you can add as many as you need.
2. Install your application in a sandbox.


### Resources
* Mozu Api documentation: https://www.mozu.com/docs/api/index.htm
* Mozu Events: https://www.mozu.com/docs/Developer/applications/event-subscription.htm
* Node Documentation: https://nodejs.org/en/docs/