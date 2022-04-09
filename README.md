# RecieptBook
This is a single page web application created in Angular. It uses TD (template driven) Forms. It allows the user to register and create online Receipts. The user can create receipts and then view the receipts in the system based on a date range or the user can view all their receipts in the system. The receipts are stored for each user based on their email address. They system was designed for accounting purposes, and the user can give their email address to their accountant to view their receipts for tax or other purposes. The accountant can view the receipts based on a date range as well or view all the receipts for that user in the system. The data is stored in a mongoDB backend database. I also created a backend restful apis application using Node.js and deployed the project to Heroku. This Angular application uses the apis from the Node.js restful apis application. That project can also be found on gitHub - https://github.com/mcflav/receiptbook-backend.
Currently this project needs to be ran locally from a machine with Node.js(npm) installed. To run locally follow the below steps: 

•	download the project into a folder on your local machine.

•	launch a command prompt and browse to the folder the project is in.

•	issue the following command to update the project on your local machine: npm install.

•	issue the following command to execute the website: ng serve.

•	Open a web browser and enter the following url: http://localhost:4200/.

•	This will take you to the home page of the web application.
