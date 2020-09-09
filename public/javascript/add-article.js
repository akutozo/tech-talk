async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="article-title"]').value;
    console.log(title);
    const text = document.querySelector('textarea[name="article-text"]').value;
    console.log(text);

    const response = await fetch(`/api/articles`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        text
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
  
  document.querySelector('.new-article-form').addEventListener('submit', newFormHandler);