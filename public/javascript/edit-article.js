async function editFormHandler(event) {
    event.preventDefault();

    const article_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const title = document.querySelector('input[name="article-title"]').value;
    const response = await fetch(`/api/articles/${article_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title // grabbing the title of the article to be edited
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-article-form').addEventListener('submit', editFormHandler);