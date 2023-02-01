[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/Marcosciaco/UniLife">
    <img src="./assets/icon.png" alt="Logo" width="80" height="80" style="border-radius: 10px">
  </a>
  <p align="center">
    <br />
    <br />
    <a href="https://expo.dev/@marcosciaco/unilife?serviceType=classic&distribution=expo-go">View Demo</a>
    ·
    <a href="https://github.com/Marcosciaco/UniLife/issues">Report Bug</a>
    ·
    <a href="https://github.com/Marcosciaco/UniLife/issues">Request Feature</a>
  </p>
</div>

<h1>Contributors</h1>
<a href="https://github.com/lawitt"><h3>Lara Sophie Witt</h3></a>
<a href="https://github.com/smilisa"><h3>Lisa Mussner</h3></a>
<a href="https://github.com/Marcosciaco"><h3>Marco Sciacovelli</h3><a>
<a href="https://github.com/mirko06854"><h3>Mirko Bandello</h3></a>
<br/>
<br/>
<h1>Table of Contents</h1>
<ol>
    <li>
        <a href="#idea">Idea</a>
    </li>
    <li>
        <a href="#built-with">Built With</a>
    </li>
    <li>
        <a href="#screens">Screens</a>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#login">Login</a></li>
          <li><a href="#all-users">All Users</a></li>
          <li><a href="#rooms">Rooms</a></li>
          <li><a href="#settings">Settings</a></li>
          <li><a href="#socialize">Socialize</a></li>
          <li><a href="#get-to-university">Get to University</a></li>
        </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#starting-the-project">Starting the project</a></li>
      </ul>
    </li>
</ol>

## Idea

The idea was to develop an application that helps students of uniBZ keep in touch with their friends, by giving them the possibility to invite their friends to drinks or dinner. Furthermore, students are able to see free lecture rooms. This allows them to organize group projects since there are only a few available library rooms.

## Built With

-   [React Native][react-url]
-   [Type Script][typescript-url]
-   [Firestore][firestore-url]

## Screens

### Home

![Home-Screenshot]

The home screen was the first one we developed. We kept it simple by having a few and only the most important information on it. On the top we kept the header we use in all of the screens, containing a menu button to access the navigation drawer and an icon to have the brand represented.

Beneath that, we have an image representing today’s weather with the temperature inside and to the right a short greeting with today’s forecast. We placed the notification container at the center of the screen. It allows you to accept and refuse invitations from other users. On the bottom of the screen, there is a map containing the location of your friends and restaurants in your area.

### Login

![Login-Screenshot]

Since the login screen is the first interaction the user has with our application, we wanted to make it spicy. To achieve this, we added animations to the background image, giving a modern touch to the design. By pressing the appropriate buttons, you can choose whether you want to login to your account or register a new user. When you register a new account, you have to insert your:

-   username
-   student-ID
-   email and password

Once you login or register a new account, you are redirected to the home screen. In the future, we would like to implement the login through the university authenticator to get access to more in-depth data about the student.

### All Users

![AllUsers-Screenshot]

Through this screen, the user can add/remove friends and see people that have already made an account on this app. On the top, there is a search bar to facilitate the process of searching for your friends. When you click on an entry, a dialog opens and you see further details about the user and his profile picture and a follow/unfollow button.

### Rooms

![Rooms-Screenshot]

This screen was one of the most difficult and important screens of the application. With this screen, the user has the possibility to see all the occupied/available rooms of the university. To narrow down the search, the user can filter the entries through a special dialog. Once he finds the room he wants, he can see the different time slots of a room and by clicking on a free room, he is able to reserve this room for that timeslot. This can then be seen by other users of the app. If we are able to login through the university in the future, we could display more personalized data for the user.

### Settings

![Settings-Screenshot]

Through this screen, the user can update his data, such as the profile picture, username, phone number, and password. The user has the possibility to toggle on and off him being displayed to other users on their map. The design is kept as simple as possible since its job is simple and minimal.

### Socialize

![Socialize-Screenshot]

Another main function of the app is the possibility to invite friends for a coffee or to a study session. On the main screen, the user is welcomed by a calendar containing all the events he has accepted/created. Clicking on an entry, a dialog opens containing the main data about the event. If the user would like to create a new event, he is able to do that through a custom dialog. In this dialog, the user can set the name and description of the event, as well as the person with whom he would like to meet and where he would like to meet up. After that, he can choose the date and time of the event and assign a color to it, that is used later on in the calendar.

### Get to University

![GTU-Screenshot]

This screen is very simple, containing a full-screen map that shows the position of the users, that have activated the tracking function, and the location of the university. When the user clicks on a marker, he can choose to open Google Maps, with the directions already set to reach this point.

## Getting Started

### Installation

Before you can use the application, you need to install all the required dependencies. This can be done through the following commands

    npm install

    yarn install

### Starting the project

    npm start

[contributors-shield]: https://img.shields.io/github/contributors/Marcosciaco/Unilife.svg?style=for-the-badge
[contributors-url]: https://github.com/Marcosciaco/UniLife/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Marcosciaco/Unilife.svg?style=for-the-badge
[forks-url]: https://github.com/Marcosciaco/UniLife/network/members
[stars-shield]: https://img.shields.io/github/stars/Marcosciaco/Unilife.svg?style=for-the-badge
[stars-url]: https://github.com/Marcosciaco/UniLife/stargazers
[issues-shield]: https://img.shields.io/github/issues/Marcosciaco/Unilife.svg?style=for-the-badge
[issues-url]: https://github.com/Marcosciaco/UniLife/issues
[license-shield]: https://img.shields.io/github/license/Marcosciaco/Unilife.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[home-screenshot]: ./assets/images/renders/Home.png
[login-screenshot]: ./assets/images/renders/Login.png
[allusers-screenshot]: ./assets/images/renders/AllUsers.png
[rooms-screenshot]: ./assets/images/renders/Rooms.png
[settings-screenshot]: ./assets/images/renders/Settings.png
[socialize-screenshot]: ./assets/images/renders/Socialize.png
[gtu-screenshot]: ./assets/images/renders/GTU.png
[react-url]: https://reactnative.dev/
[typescript-url]: https://www.typescriptlang.org/
[firestore-url]: https://firebase.google.com/products/firestore?gclsrc=ds&gclsrc=ds
