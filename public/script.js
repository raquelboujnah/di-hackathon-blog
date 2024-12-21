function searchPosts() {
    const input = document.getElementById("searchInput");
    const filter = input.value.trim().toLowerCase(); // Trim input to avoid accidental spaces
    const posts = document.querySelectorAll(".post");
    const noResultsMessage = document.getElementById("noResultsMessage");
    let visiblePostCount = 0;

    posts.forEach((post) => {
        const title = post.querySelector(".post-title").textContent.toLowerCase();
        if (title.includes(filter)) {
            post.style.display = "block"; // Show post if it matches
            visiblePostCount++;
        } else {
            post.style.display = "none"; // Hide post if it doesn't match
        }
    });

    // Show or hide "No results found" message
    if (visiblePostCount === 0 && filter !== "") {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
    }
}
