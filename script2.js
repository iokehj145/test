class Message {
    constructor(id, numberid, email, text, createdAt) {
        this.id = id;
        this.numberid = numberid;
        this.email = email;
        this.text = text;
        this.createdAt = createdAt;
    }
    render() {
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = 
        `
                    <img srcset="png/1.svg" alt="User Icon" width="20" height="20"/>
                    <span class="comment-text">
                        <span class="username">${this.email}</span>
                        <span class="timestamp">${this.createdAt} #${this.numberid}</span>
                        <p>${this.text}</p>
                    </span>`;
        return newComment;
    }
}
let ListOfMessange = [];
document.addEventListener("DOMContentLoaded", function() {
    function fetchMessang() {
        fetch('https://server-19y9yra0y-iokehjs-projects.vercel.app/topics/'+localStorage.getItem('id')+'/posts')
            .then(response => response.json())
            .then(data => {
                const commentSection = document.querySelector('.comment-section');
                data.forEach((iteam) => {
                const message = new Message(iteam._id, iteam.numberid, iteam.userEmail, iteam.message, iteam.createdAt);
                commentSection.appendChild(message.render());
                });
                ListOfMessange = data;
            })
            .catch((error) => console.error('Error fetching topics count:', error) )
    }
fetchMessang();
});