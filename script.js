const apiURL = "http://localhost:3000";

// Load all movies
async function loadMovies() {
    let category = document.getElementById("categoryFilter").value;
    let url = apiURL + "/movies";

    if (category !== "all") {
        url += "?category=" + category;
    }

    const response = await fetch(url);
    const movies = await response.json();

    let table = document.getElementById("movieTable");
    table.innerHTML = "";

    movies.forEach(m => {
        table.innerHTML += `
            <tr>
                <td>${m.name}</td>
                <td>${m.category}</td>
            </tr>
        `;
    });
}

// Submit form
document.getElementById("movieForm").addEventListener("submit", async function(e){
    e.preventDefault();

    let name = document.getElementById("movieName").value;
    let category = document.getElementById("movieCategory").value;

    if (name.trim() === "") {
        alert("Movie name cannot be empty!");
        return;
    }

    await fetch(apiURL + "/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category })
    });

    document.getElementById("movieName").value = "";
    loadMovies();
});

loadMovies();
