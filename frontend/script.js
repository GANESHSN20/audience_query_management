const API_URL = "http://localhost:5000/queries";

async function createQuery() {
    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        category: document.getElementById("category").value,
        priority: document.getElementById("priority").value
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    loadQueries();
}

async function loadQueries() {
    const res = await fetch(API_URL);
    const queries = await res.json();

    const container = document.getElementById("queryList");
    container.innerHTML = "";

    queries.forEach(q => {
        const div = document.createElement("div");
        div.className = "query";
        div.innerHTML = `
            <b>${q.name}</b> <span style="color:#777;">(${q.email})</span><br><br>

            ${q.message}<br><br>

            <span class="tag">${q.category}</span>

            <span class="tag priority-${q.priority}">
                ${q.priority.toUpperCase()}
            </span>

            <br><br>
            <small>Status: <b>${q.status}</b></small>
        `;
        container.appendChild(div);
    });
}

loadQueries();
