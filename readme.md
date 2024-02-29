# GitHub Code Search App

This repository contains code for a simple web application that allows users to search for code snippets on GitHub using the GitHub API.

## Usage

1. Clone or download the repository.
2. Set up a virtual environment (optional but recommended).
3. Install dependencies using `pip install -r requirements.txt`.
4. Obtain a GitHub personal access token with the `repo` scope.
5. Set the GitHub token as an environment variable named `GITHUB_TOKEN`.
6. Run the Flask app using `python main.py`.
7. Open the web browser and navigate to `http://localhost:8080`.
8. Enter your search query in the provided input field and submit the form.

## Files

### main.py

This file contains the main application logic implemented using Flask. It includes routes for rendering the search page (`/`) and handling search queries (`/search`). It also provides an endpoint to fetch the GitHub token for client-side authorization (`/get-github-token`).

### script.js

This JavaScript file handles the client-side functionality of the application. It makes use of the GitHub token obtained from the server to authenticate requests to the GitHub API. The script fetches search results asynchronously and displays them in a table format on the web page.

## Customization

You can customize the application by:

- Modifying the HTML and CSS templates in the `templates` directory to change the appearance of the search page.
- Adding additional functionality such as pagination or filtering options to enhance the user experience.
- Implementing error handling and refining the UI to provide better feedback to users.

## GitHub Token

To obtain a GitHub personal access token:

1. Go to your GitHub account settings.
2. Navigate to the "Developer settings" section.
3. Click on "Personal access tokens" and generate a new token with the `repo` scope.
4. Copy the generated token and set it as the value of the `GITHUB_TOKEN` environment variable.

## Shields

![GitHub language count](https://img.shields.io/github/languages/count/barandev/Search-Code-using-Github-API)
![GitHub repo size](https://img.shields.io/github/repo-size/barandev/Search-Code-using-Github-API)
[![License](https://img.shields.io/github/license/barandev/Search-Code-using-Github-API)](https://github.com/barandev/Search-Code-using-Github-API/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/barandev/Search-Code-using-Github-API)](https://github.com/barandev/Search-Code-using-Github-API/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/barandev/Search-Code-using-Github-API)](https://github.com/barandev/Search-Code-using-Github-API/pulls)
[![GitHub stars](https://img.shields.io/github/stars/barandev/Search-Code-using-Github-API)](https://github.com/barandev/Search-Code-using-Github-API/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/barandev/Search-Code-using-Github-API)](https://github.com/barandev/Search-Code-using-Github-API/network)
