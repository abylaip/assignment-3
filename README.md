## ExpressJS App

Use `npm run dev` or `node index.js` to run the project

Use `Insomnia_2024-03-04.json` to see all endpoints and request bodys

Need to **DISABLE CERT VALIDATION** on your client

Get requests: `/` to get all data from JSON

Post requests: 
- `/` to get all data of student
- `/CS548` to get student IDs of all student who has CS548
- `/expect` to get all students and their IDs who have the same course as student in the request body except CS548
