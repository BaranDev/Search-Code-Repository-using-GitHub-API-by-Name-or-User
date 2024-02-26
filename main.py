# Main application file for the GitHub Code Search app
import os
from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)  # Initialize Flask app

GITHUB_API_URL = "https://api.github.com/search/code"  # GitHub API endpoint for code search

@app.route("/")
def root_route():
    # Render the main search page
    return render_template('search.html')

@app.route("/search")
def search():
    # Fetch search query from request arguments
    query = request.args.get('q')
    # Set up headers with GitHub token for authorization
    headers = {'Authorization': f'token {os.environ["GITHUB_TOKEN"]}'}
    params = {'q': query}  # Query parameters for the API request
    # Make a GET request to the GitHub API
    response = requests.get(GITHUB_API_URL, headers=headers, params=params)
    # Return the JSON response if successful
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        # Handle errors in fetching data from GitHub
        return jsonify({'error': 'Failed to fetch data from GitHub'}), response.status_code

@app.route("/get-github-token")
def get_github_token():
    # Provide the GitHub token to the client-side script
    return os.environ["GITHUB_TOKEN"]

if __name__ == "__main__":
    # Run the Flask app
    app.run(host='0.0.0.0', port=8080)