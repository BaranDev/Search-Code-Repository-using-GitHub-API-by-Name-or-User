import { Octokit } from "https://esm.sh/@octokit/rest";
let octokit;

fetch('/get-github-token').then(response => response.text()).then(token => {
    octokit = new Octokit({ auth: `token ${token}` });
});

const result_perpage_limit = 100; // How many results are returned per page, maximum is 100
const total_results_limit = 200; // Total number of results to retrieve

const total_pages = Math.ceil(total_results_limit / result_perpage_limit); // Calculate total pages needed

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const query = document.getElementById('searchInput').value;
        const fetchResults = []; // Array to hold the results of fetch requests
        
        // Define a function to fetch results for a specific page using Octokit
        const fetchPage = async (page) => {
            try {
                const response = await octokit.request('GET /search/code', {
                    q: query,
                    per_page: result_perpage_limit,
                    page
                });
                if (response.data) {
                    return response.data;
                }
            } catch (error) {
                if (error.status === 403) {
                    alert('GitHub API Rate limit is exceeded.');
                } else {
                    console.error('Error fetching page:', error);
                }
            }
        };

        // Define a function to process each page of results
        const processPage = async (page) => {
            try {
                const data = await fetchPage(page);
                fetchResults.push(data.items);
            } catch (error) {
                console.error(`Error fetching page ${page}:`, error);
            }
        };

        // Execute fetch requests for each page
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '<tr><td colspan="2">Please wait...</td></tr>'; // Display "Please wait..." message
        for (let page = 1; page <= total_pages; page++) {
            await processPage(page);
        }

        // Display the combined results
        displayResults(fetchResults.flat());
    });
});

// Function to display results in the UI
// Function to display search results in a table format
// Each row includes an index number, the name of the file, and its path
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    // Initialize the table with headers
    resultsContainer.innerHTML = '<table style="width:100%; border-collapse: collapse;">';
    let tableContent = "<thead><tr><th>#</th><th>Name</th><th>Path</th></tr></thead><tbody>";
    // Iterate over each result item to create table rows
    results.forEach((item, index) => {
        // Index starts from 1, and cells have borders for clarity
        tableContent += `<tr><td style="border: 1px solid #30363d;">${index + 1}</td><td style="border: 1px solid #30363d;"><a href="${item.html_url}" target="_blank">${item.name}</a></td><td style="border: 1px solid #30363d;">${item.path}</td></tr>`;
    });
    tableContent += "</tbody></table>";
    // Update the results container with the generated table content
    resultsContainer.innerHTML = tableContent;
}