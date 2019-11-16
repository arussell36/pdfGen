// https://api.github.com/users/arussell36 //

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
let starCount = 0;
inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({username}) {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(function(response) {
      // console.log(response);
      starCount = 0;
      const user = response.data.login;
      let name = response.data.name;
        if (name == null) {
          name = "No name listed";
        };
      const profileIMG = response.data.avatar_url;
      let userBio = response.data.bio;
        if (userBio == null) {
          userBio = "No biography listed";
        };
      const blog = response.data.blog;
      let location = response.data.location;
        if (location == null) {
          location = "No location listed";
        };
      const pubRepos = response.data.public_repos;
      const following = response.data.following;
      const starURL = `https://api.github.com/users/${username}/repos`;
      axios.get(starURL).then(response => {
          response.data.forEach(element => {
              starCount += element.stargazers_count;
              // console.log(starCount);
          });

// --------BELOW IS HARDCODED HTML OUTPUT BASED ON THE ABOVE VARIBLES-------- //
      return HTMLOutput = `
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
</head>
<body>
      <div>Username: ${user}</div>
      <div>Name: ${name}</div>
      <div><img src="${profileIMG}" /></div>
      <div>Biography: ${userBio}</div>
      <div>Blog: ${blog}</div>
      <div>Location: <a href="https://www.google.com/maps/place/${location}">${location}</a></div>
      <div>GitHub Link: <a href="https://github.com/${user}">Profile Link</a></div>
      <div>Public Repos: ${pubRepos}</div>
      <div>Users Followed: ${following}</div>
      <div>Stars: ${starCount}</div>
</body>
</html>
`;
    })
    .then(HTMLOutput => {
      fs.writeFile("index.html", HTMLOutput, () => {
      });
    });
  });
});