async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="article-title"]').value;
    const text = document.querySelector('input[name="article-text"]').value;
  
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