class Topic {
    constructor(id, name, postsCount, lastMessage) {
      this.id = id;
      this.name = name;
      this.postsCount = postsCount;
      this.lastMessage = lastMessage;
    }
  
    render() {
      const row = document.createElement('tr');
      row.id = this.id;
      row.innerHTML = `
        <td>${this.name}</td>
        <td>${this.postsCount}</td>
        <td>${this.lastMessage}</td>
      `;
      return row;
    }
  
    handleClick() {
      localStorage.setItem('id', this.id);
      window.location.href = "Tred.html";
    }
}
const LoginFun = () => {
    if (localStorage.getItem('login') === '1') {
        localStorage.removeItem('google_id_token');
        localStorage.setItem("login", 0);
        console.log("Logged out");
    }
    else window.location.href = 'main.html';
}
document.addEventListener("DOMContentLoaded", function() {
    function LoginRender() {
        const localStorageLogin = localStorage.getItem('login');
        const login = document.getElementsByClassName('auth-button')[0];
        login.innerHTML = localStorageLogin === '1' ? 'Вийти': 'Увійти';
        login.addEventListener('click', LoginFun);
    }
    function fetchTopicsCount() {
        fetch('https://server-j6buz00cb-iokehjs-projects.vercel.app/api/topics/count')
            .then(response => response.json())
            .then(data => {try {
                const postsCountElement = document.getElementById('posts-count');
                postsCountElement.textContent = `Створено постів: ${data.length}`;
                
                const ListThread = document.getElementById('Posts');
                data.forEach((iteam) => {
                    const topic = new Topic(iteam._id, iteam.name, iteam.postsCount, iteam.lastMessage);
                    const row = topic.render();
                    ListThread.appendChild(row);
                    row.addEventListener('click', topic.handleClick.bind(topic));
                });
                console.log(data);
            } catch (error) {}
            }).catch((error) => console.error('Error fetching topics count:', error) )
    }
    function fetchPostsCount() {
        fetch('https://server-j6buz00cb-iokehjs-projects.vercel.app/api/messages/count')
            .then(response => response.json())
            .then(data => {
                const postsCountElement = document.getElementById('message');
                postsCountElement.textContent = `Відправлено повідомлень: ${data.count}`;
            })
            .catch((error) => console.error('Error fetching topics count:', error) )
    }
fetchTopicsCount();
fetchPostsCount();
LoginRender();
});
