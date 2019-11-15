const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    axios.get(queryUrl).then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });
      const repoNamesStr = repoNames.join("\n");
      return HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
</head>
<body>
      <div>${repoNamesStr}</div>
</body>
</html>
`;
    })
    .then(HTML => {
      fs.writeFile("index.html", HTML, () => {
      });
    });
  });