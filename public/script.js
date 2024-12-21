function searchPosts() {
    const input = document.getElementById("searchInput");
    const filter = input.value.trim().toLowerCase();
    const posts = document.querySelectorAll(".post");
    const noResultsMessage = document.getElementById("noResultsMessage");
    let visiblePostCount = 0;

    posts.forEach((post) => {
        const title = post.querySelector(".post-title").textContent.toLowerCase();
        if (title.includes(filter)) {
            post.style.display = "block";
            visiblePostCount++;
        } else {
            post.style.display = "none";
        }
    });

    if (visiblePostCount === 0 && filter !== "") {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
    }
}

// Limit content to 150 characters
document.querySelectorAll(".post-content").forEach((content) => {
    const fullText = content.textContent.trim();
    if (fullText.length > 150) {
        content.textContent = fullText.substring(0, 150) + "...";
    }
});

