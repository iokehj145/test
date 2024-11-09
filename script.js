document.addEventListener("DOMContentLoaded", function() {
    function fetchTopicsCount() {
        fetch('https://server-hw6ax8jnj-iokehjs-projects.vercel.app/api/topics/count')
            .then(response => response.json())
            .then(data => {
                const postsCountElement = document.getElementById('posts-count');
                postsCountElement.textContent = `Створено постів: ${data.length}`;
                const ListThread = document.getElementById('Posts');
                data.forEach((item) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.postsCount}</td>
                    <td>${item.lastMessage}</td> `;
                    ListThread.appendChild(row);
                });
                console.log(data);
            })
            .catch((error) => console.error('Error fetching topics count:', error) )
    }
    function fetchPostsCount() {
        fetch('https://server-hw6ax8jnj-iokehjs-projects.vercel.app/api/messages/count')
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
