const crudCrudEndpoint = "https://crudcrud.com/api/0e5e657182954405bfb053fb394c8e18/blogs"; // Your unique endpoint

let blogCount = 0;

document.addEventListener('DOMContentLoaded', fetchBlogs);

function fetchBlogs() {
    axios.get(crudCrudEndpoint)
        .then(response => {
            const blogs = response.data;
            blogs.forEach(blog => displayBlog(blog));
        })
        .catch(error => console.error('Error fetching blogs:', error));
}

function postBlog() {
    const imageUrl = document.getElementById('image-url').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (imageUrl && title && description) {
        const newBlog = { imageUrl, title, description };

        axios.post(crudCrudEndpoint, newBlog)
            .then(response => {
                displayBlog(response.data);
                clearForm();
            })
            .catch(error => console.error('Error posting blog:', error));
    } else {
        alert('Please fill all fields');
    }
}

function displayBlog(blog) {
    const blogContainer = document.getElementById('blog-container');
    const template = document.getElementById('blog-template');

    const blogPost = template.cloneNode(true);
    blogPost.style.display = 'block';
    blogPost.setAttribute('data-id', blog._id);

    blogPost.querySelector('img').src = blog.imageUrl;
    blogPost.querySelector('img').alt = blog.title;
    blogPost.querySelector('h3').innerText = blog.title;
    blogPost.querySelector('p').innerText = blog.description;

    blogContainer.appendChild(blogPost);

    blogCount++;
    document.getElementById('blog-count').innerText = blogCount;
}

function clearForm() {
    document.getElementById('image-url').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

function editBlog(button) {
    const blogPost = button.parentElement;
    const blogId = blogPost.getAttribute('data-id');

    document.getElementById('image-url').value = blogPost.querySelector('img').src;
    document.getElementById('title').value = blogPost.querySelector('h3').innerText;
    document.getElementById('description').value = blogPost.querySelector('p').innerText;

    deleteBlogById(blogId);
}

function deleteBlog(button) {
    const blogPost = button.parentElement;
    const blogId = blogPost.getAttribute('data-id');
    deleteBlogById(blogId);
}

function deleteBlogById(blogId) {
    axios.delete(`${crudCrudEndpoint}/${blogId}`)
        .then(() => {
            document.querySelector(`[data-id='${blogId}']`).remove();
            blogCount--;
            document.getElementById('blog-count').innerText = blogCount;
        })
        .catch(error => console.error('Error deleting blog:', error));
}
