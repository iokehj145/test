document.addEventListener("DOMContentLoaded", function() {
    function fetchTopicsCount() {
        fetch('https://server-66cx9x2ve-iokehjs-projects.vercel.app/api/topics/count')
            .then(response => response.json())
            .then(data => {
                const postsCountElement = document.getElementById('posts-count');
                postsCountElement.textContent = `Створено постів: ${data.count}`;
            })
            .catch((error) => console.error('Error fetching topics count:', error) )
    }
fetchTopicsCount();
});
