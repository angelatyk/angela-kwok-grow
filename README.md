# Grow
An app to help make your garden a successful one.

## Introduction
Grow is an application that helps the user plan their garden for the season. There is a collection of plants for the user to choose from. The application will create a to-do list based on the plants chosen by the user. Tasks created will let the user know when to start seeding, when to water, when to harvest, and when plant is ready.

## Tech Stack
![Logo](https://skillicons.dev/icons?i=html,scss,ts,nextjs,prisma,mysql)

## Setup
### Initial setup
1. Clone this repository.
2. Run `npm i` to install all dependancies.
3. Make a local .env file by copying the env.sample file.

### Setting up the database
1. In MySQL create a database. 
```MySQL
CREATE DATABASE databasename;
```
2. Fill in the `DATABASE_URL` with the connection URL to the database you created.
3. In terminal run `npx prisma migrate dev` to apply migrations to your database.

### Setting up Google Authentication
1. Follow https://support.google.com/cloud/answer/6158849?hl=en to set up OAuth 2.0 for Google.
2.  For **Authorized JavaScript origins** put in the home URL to the application. Ex. `http://localhost:3000`
3. For **Authorized redirect URIs** put in the home URL follow by "/api/auth/callback/google". Ex. `http://localhost:3000/api/auth/callback/google`
4. Add a secret.
5. In your local .env file fill in `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

### Setting up NextAuth
1. Fill in `NEXTAUTH_SECRET` and `NEXTAUTH_URL` in your local .env file.
- You can quickly generate a secret using `openssl rand -base64 32` command.

### Generate an API Key for Perenual Plant API
1. Visit https://perenual.com/docs/api
2. Click on the "GET API KEY & ACCESS" button.
3. In your local .env file fill in `NEXT_PUBLIC_PERENUAL_API_KEY`.

### Run the Application
```Run Application
npm run dev
```

## Author
[@angelatyk](https://www.github.com/angelatyk)