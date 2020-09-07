async function deleteFormHandler(event) {
    event.preventDefault();

    const article_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/articles/${article_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-article-btn').addEventListener('click', deleteFormHandler);