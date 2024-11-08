document.addEventListener("DOMContentLoaded", function() {
    function fetchTopicsCount() {
        fetch('https://server-odq6bxtui-iokehjs-projects.vercel.app/api/topics/count')
            .then(response => response.json())
            .then(data => {
                const postsCountElement = document.getElementById('posts-count');
                postsCountElement.textContent = `Створено постів: ${data.count}`;
            })
            .catch((error) => console.error('Error fetching topics count:', error) )
    }
    function fetchPostsCount() {
        fetch('https://server-odq6bxtui-iokehjs-projects.vercel.app/api/messages/count')
            .then(response => response.json())
            .then(data => {
                const postsCountElement = document.getElementById('message');
                postsCountElement.textContent = `Відправлено повідомлень: ${data.count}`;
            })
            .catch((error) => console.error('Error fetching topics count:', error) )
    }
fetchTopicsCount();
fetchPostsCount();
});
