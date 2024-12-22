const url = "/post-data"
let options = {
    method: "GET",
    headers: {
        "content_type": "application/json"
    }
}

async function getPosts(url, options) {
    try {
        let result = await fetch(url,options)
        let data = await result.json()
        console.log(data)
        data.forEach(post => {
            $("#blogPosts").append(`
        <article class="post">
            <img src="assets/default-cover.jpg" alt="Image for ${post.title}" class="post-image">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-content">${post.content}</p>
            <button class="read-more" onclick="window.location.href='post/${post.id}'">Read More</button>
        </article>
            `)
        });

    } catch (err){
        console.log(err)
    }
}

getPosts(url,options)

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

// function handleSubmit(event) {
//     event.preventDefault(); 

//     const form = document.getElementById("blogPostForm");
//     const formData = new FormData(form);

//     console.log("Form Submitted:");
//     for (let [key, value] of formData.entries()) {
//         console.log(`${key}:`, value);
//     }

//     alert("Blog post submitted successfully!");
//     form.reset(); 
// }

async function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("blogPostForm");
    const formData = new FormData(form);

    const payload = {
        title: formData.get("title"),
        publish_date: formData.get("publishDate"),
        author: formData.get("author"),
        cover_image: formData.get("coverImage"),
        content: formData.get("content")
    };

    try {
        const response = await fetch("/submit-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert("Blog post submitted successfully!");
            form.reset();
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error("Error submitting post:", error);
        alert("An error occurred while submitting the post.");
    }
}
