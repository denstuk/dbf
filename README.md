<p align="center">
  <img src="./.README/logo.png" width="120" alt="DBFarmer" />
</p>

<p align="center">
    CLI toolkit to plant your database
<p align="center">

## Description

**DBFarm** is a command-line tool designed to simplify the process of database creation and testing for developers, data analysts, and testers. The core objective of **DBFarm** is to provide a seamless experience in generating and populating databases with vast amounts of fake data, enabling users to practice SQL queries, test database performance, and simulate real-world scenarios in integration stages without the hassle of manual data entry or concerns about data privacy

## Usage

- Install `Node.js` and `Docker`
- Install globally `npm install dbfarm -g` or just use `npx dbfarm`
- Run `dbfarm config` to configure your environment
- Run `dbfarm plant --schema ./schema.json` to plant your environment

## Supported Platforms

- MacOS
- Linux

## Supported Databases

- Postgres
