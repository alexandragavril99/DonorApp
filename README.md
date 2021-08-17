# Donor App

Progressive web application developed for bachelor's degree, dealing with the administration of a blood donation center.

The app is built in Node.js with Express and Sequelize for the server-side and Vue.js with Quasar for the client-side.

*Main functionalities:*
- create and manage personal account
- login system with *passport*
- donors can create appointments (if the time passed since the last donation is bigger than 60 days) or cancel them
- donors can view their appointments history and download the blood analysis bulletin
- donor ranking based on their personal score 
- doctors manage the donors, the appointments (upload documents) and the emergencies
- doctors can view center's statistics
