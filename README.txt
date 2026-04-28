Practice 11: Deploying Your Application

Platform Used:
Render

Deployment Process:
For this practice, I deployed my Node.js application using Render. I chose Render because it provides a simple free-tier deployment process for Node.js applications and allows the project to be deployed as a live web service.

First, I checked my project files and made sure the main dashboard files were included, including index.html, style.css, and dashboard_project.js. I also added a server.js file so the project could run as a Node.js application instead of only opening as a local static file. The server.js file uses Node's built-in HTTP module to serve the dashboard files.

I made sure package.json included a start script:

"start": "node server.js"

I also made sure server.js used process.env.PORT || 3000 so the application could run correctly on Render and locally. Render assigns the live environment port automatically, while 3000 works for local testing.

The main deployment steps were:
1. Upload/push the project to GitHub.
2. Open Render and choose New +, then Web Service.
3. Connect the GitHub repository.
4. Use Node as the runtime.
5. Use npm install as the build command.
6. Use npm start as the start command.
7. Deploy the web service.
8. Open the Render URL in a browser to verify that the application worked online.

Issues Encountered:
The original project files were front-end files only, so I added server.js and package.json to make the project deployable as a Node.js web service. I also checked the port setup to avoid using only a hardcoded local port.

Live App Verification:
The application was successfully deployed and opened in a browser using the Render live URL. I included a screenshot showing the application running with the Render URL visible in the address bar.
