# ℹ️ Introduction

### How to submit the exercice ?

**1.** Create your **private** repo by using this repository as template.

<img width="750" alt="Screenshot 2022-08-02 at 20 46 19" src="https://user-images.githubusercontent.com/20050165/182450543-33f96cf9-81f7-425f-93ce-0ca26568128d.png">

**2.** Code the exercice.

**3.** When you are done, send the link of your repository to your interviewer, while making sure he/she can access it.

# ✋ Before you get started

### Required tech stack

In order to run the project, there is a couple of technologies you need to install to your device.

- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/) and [Mongo Database Tools](https://www.mongodb.com/docs/database-tools/installation/installation/)
- Redis
- Npm or [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- Typescript

### How to run the Project ?

- Install both `front/` and `back/` packages using ➝ `npm install` or `yarn i`
- Start back `npm run dev` or `yarn dev`
- Start front `npm run web` or `yarn web`

**Everything should now run smoothly, you are all set !**

# 📝 Brief

The project is to finish the creation of an application that will allow its users to check Velib bikes statuses available in Paris in order to easily get home from work (and vice-versa).
The project was started by another developer who already took care of preparing database models and API endpoints for you to use and improve on, based on the front-end implementation requirements.

Your goal will be to **discover the architecture**, **implement the front-end**, and **make any back-end changes** required to fulfill the user stories listed below.

# ☑️ Tasks

## 🚴 User stories

1. As a user I should be able to **register**, **log-in** and **log-out** in order to **access and use the application**.
2. As a user I should be able to get displayed a **list of stations** with any **relevant details** in order to know **how many bikes are available** for each of them.
3. As a user I should be able to **search** through the list of stations **by name**, in order to check its available bikes.
4. As a user, I should be able to **click on a button that filters the list of stations that have available bikes by types** (electrical or manual), in order to easily get displayed stations with available bikes of my prefered type.

## ℹ️ Informations

- The API endpoint in the `back/` folder uses the [Velib' Open Data API](https://www.velib-metropole.fr/donnees-open-data-gbfs-du-service-velib-metropole) to fill the database via a cron job. The station statuses are updated **every 2 minutes**.
- The repository should already include everything needed to fulfill the tasks, but you are free to add any additional libraries that you might find useful to complete the assignement.

## 🛠️ Requirements

> :warning: The code needs to be written in Typescript !

> :warning: The code needs to use [react-native-web](https://necolas.github.io/react-native-web/) components. All components should be functional and their props typed.

- The application produced should work on **web** and be **responsive**. It is not required to run the project on native mobile (ios / android).
- There should be an implementation of a **state management system**.
- The list of stations should be displayed as an **infinite or a paginated list**.
- User login informations should be **persisted** client side.
- The station list bikes availability status should be **re-fetched and updated automatically at frequent intervals**.
- Make it look good, and have fun with it 😊

---

### All **informations** about this exercise should have been provided in this **README**, but if you have any questions, feel free to contact us!
