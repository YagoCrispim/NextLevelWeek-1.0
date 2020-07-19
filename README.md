<h1 align="center">
    <img alt="NextLevelWeek" title="#NextLevelWeek" src=".github/logo.svg" width="250px" />
</h1>

<h4 align="center"> 
NextLevelWeek 1.0 🚀 Done!
</h4>
  <img alt="Repository size" src="https://img.shields.io/badge/Size-19.8mb-blue">
  <a href="https://www.linkedin.com/in/yago-crispim-66b01619b/">
    <img alt="Made by YagoCrispim" src="https://img.shields.io/badge/made%20by-YagoCrispim-%2304D361">
  </a> 
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

## What's Next Level Week?

NLW is a week with lot of code, learning and networking.

## 💻 Project

Ecoleta is a project with the objective of connecting people to companies that collect specific waste, such as lamps, batteries, cooking oil, etc.

## Technologies

This project was developed with the following technologies:

- Node.js
- TypeScript
- React
- React Native

## How To Use

To clone and run this application you'll need: Git and Node.js installed on your computer.


## Commands

### Install API 
```bash
# Clone this repository
$ git clone https://github.com/YagoCrispim/NextLevelWeek.git

# Go into the repository
$ cd NextLevelWeek/server

# Install dependencies
$ npm i

# Run Migrates
$ npm run knex:migrate

# Run Seeds
$ npm run knex:seed

# Start server
$ npm run dev

# running on port 3333
```

## Routes
```
```
To access the API use [Insomnia](https://insomnia.rest/download/)
```
List itens: GET - http://localhost:3333/items
Get points: GET - http://localhost:3333/points
Get specific point: GET - http://localhost:3333/points/id
Create point: POST - http://localhost:3333/points
 - JSON body:
  {
    "name": "CA",
    "email":"8787",
    "whatsapp":"8787",
    "latitude":"8787",
    "longitude":"8787",
    "city":"8787",
    "uf":"8787",
    "uf":"SP",
    "items":[1,2,3]
  }
```

### Install Front-end
```bash
# Go into the repository
$ cd NextLevelWeek/web

# Install dependencies
$ npm i

# Run
$ npm run start

# running on port 3000
```

### Install Mobile
```bash
# Go into the repository
$ cd NextLevelWeek/mobile

# Install dependencies
$ npm i

# Run
$ npm run start

# If some problem with fonts, execute:
$ expo install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto
```
# License

This project is under the MIT license.

