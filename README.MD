# Streamer Spotlight Application

## Introduction

The Streamer Spotlight application is a simple, interactive application that
allows users to add their favorite streamers along with relevant details and
vote on them. The application is built using (MongoDB, Nest.js, React.js,
Node.js)

## Features

### Streamer Submission

Users can add their favorite streamers via a submission form, specifying the
streamer's name, platform (options include Twitch, YouTube, TikTok, Kick,
Rumble), and a brief description.

### Streamer Listing

The application presents a real-time list of all streamers that have been
submitted by users. Alongside each streamer's details, the current count of
upvotes and downvotes is also displayed, reflecting the community's reception of
the streamer.

### Streamer Details

Clicking on a streamer leads to a detailed page featuring more information about
the streamer, including their name, description, streaming platform, and a
static image.

## Backend

The backend of the application provides several endpoints:

- `POST /streamers`: To receive new streamer submissions from the frontend and
  store them in a database.
- `GET /streamers`: To return all the stored streamer submissions in response to
  a request from the frontend.
- `GET /streamer/[streamerId]`: To return data about a specific streamer.
- `PUT /streamers/[streamerId]/vote`: To receive an upvote for a specific
  streamer and update their current upvote/downvote count.

## How to Install and Run

Steps:

* If you want to use the database from the docker MongoDB image, create a .env file in
  the server folder and add an environment variable
  DB_URI='mongodb://localhost:27017/streamer-spotlight'. Then, in the root folder
  of the monorepo, enter `docker compose up`.
* If you want to use MongoDB in the cloud, add an environment variable to .env file with the
  cloud address DB_URI=...

* Next, navigate to the `/server` directory in the terminal by entering the command `cd server `and install the necessary dependencies with `npm install `. Once installed, start the server by entering `npm run start:dev`. The server should
  now be running.
* In a new terminal, navigate to the `/client` directory using the command `cd client `, then install dependencies with `npm install `. After the installation is complete, start the client by entering `npm run dev`. You can
  now open the application in your browser at
  "[http://localhost:5173/](http://localhost:5173/)".
