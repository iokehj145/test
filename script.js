let AllTopics = [];
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
        const topic = AllTopics.find((obj) => obj._id === this.id);
        localStorage.setItem('topicDes', topic.describe);
        localStorage.setItem('name', topic.name);
        localStorage.setItem('id', this.id);
        window.location.href = "Tred.html";
    }
}
const LoginFun = () => {
    if (localStorage.getItem('login') === '1') {
        localStorage.removeItem('google_id_token');
        localStorage.setItem("login", 0);
        console.log("Logged out");
        location.reload();
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
        fetch('https://server-m3ye5bmvz-iokehjs-projects.vercel.app/api/topics/count')
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
                AllTopics = data;
            } catch (error) {}
            }).catch((error) => console.error('Error fetching topics count:', error) )
    }
    function fetchPostsCount() {
        fetch('https://server-m3ye5bmvz-iokehjs-projects.vercel.app/api/messages/count')
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
function CreatePopup() {
    document.body.innerHTML += `
    <div class="overlay" onclick="hidePopup()"></div>
    <div class="container-unique">
            <div class="title">ТРЕД</div>
            <div class="label">Назва</div>
            <input type="text" class="input-field" maxlength="31" placeholder=" " />
            <div class="label">опис</div>
            <textarea class="input-field" maxlength="500" rows="10" placeholder=" "></textarea>
            <div class="button-thread"><button onclick="CreatThread()" class="create-thread-button" >Створити тред</button></div>
        </div>
    `;
    console.log(AllTopics);
};

const CreatThread = async () => {
    const name = document.getElementsByClassName('input-field')[0].value;
    const description = document.getElementsByClassName('input-field')[1].value;
    const data = {name: name, describe: description}
    fetch('https://server-m3ye5bmvz-iokehjs-projects.vercel.app/topic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('google_id_token')}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
        if (!data.message) location.reload();
        else if(data.message === "A topic with this name already exists") 
            alert("A topic with this name already exists");
        else console.error("failed to create thread:", data.message);
        })
        .catch((error) => console.error('Error fetching topics count:', error) )
};
const hidePopup = () => {
        location.reload();
};