function handleSubmit(event) {
    event.preventDefault(); 

    const form = document.getElementById("blogPostForm");
    const formData = new FormData(form);

    console.log("Form Submitted:");
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

    alert("Blog post submitted successfully!");
    form.reset(); 
}