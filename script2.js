const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};
const filterComments = (value) => {
    if (value === 'new')
        ListOfMessange.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else
        ListOfMessange.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    document.querySelectorAll('.comment').forEach((section) => section.remove());
    ListOfMessange.forEach((iteam) => {
        const message = new Message(iteam._id, iteam.numberid, iteam.userEmail, iteam.message, iteam.createdAt);
        const commentSection = document.querySelector('.comment-section-main');
        commentSection.appendChild(message.render());
    });
}
let Deletevar = false;
const handleDelete = async(id) => {
    if (Deletevar) {
    const commit = document.querySelector(`.DeleteMode[id="${id}"]`);
    const res = await fetch('https://server-m1bv0wp85-iokehjs-projects.vercel.app/topics/'+id+'/delete',{
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('google_id_token')}`
    }});
    if(res.ok) commit.remove();
    else console.error(res.message);
    }
}
const DeleteMode = () => {
    const commentDivs = document.querySelectorAll('.comment');
    commentDivs.forEach(div => div.classList.toggle('DeleteMode'));
    Deletevar = !Deletevar;
    document.querySelector('.comment-delete').style.filter = Deletevar ? 'sepia(2) saturate(90) brightness(1)' : '';
}
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
        const formattedDate = formatDate(this.createdAt);
        newComment.className = 'comment';
        newComment.id = this.id;
        newComment.addEventListener('click', () => handleDelete(this.id));
        newComment.innerHTML = `
                    <img srcset="png/1.svg" alt="User Icon" width="20" height="20"/>
                    <span class="comment-text">
                        <span class="username">${this.email}</span>
                        <span class="timestamp">${formattedDate} #${this.numberid}</span>
                        <p>${this.text}</p>
                    </span>`;
        return newComment;
    }
}
let ListOfMessange;
document.addEventListener('keydown', async (e) => {
    const message = document.getElementById('comment_input');
    if (e.key === 'Enter' && message.value !== "") {
        const text = message.value;
        message.value += "...";
        message.disabled = true;
        const response = await fetch('https://server-m1bv0wp85-iokehjs-projects.vercel.app/topics/'+localStorage.getItem('id')+'/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('google_id_token')}`
            },
            body: JSON.stringify({ message: text })
        });
        message.value = "";
        message.disabled = false;
        const data = await response.json();
        if (response.ok) {
            console.log();
            location.reload();
        }
        else console.error(data.message);
    }
  });
document.addEventListener("DOMContentLoaded", function() {
    function fetchMessang() {
        fetch('https://server-m1bv0wp85-iokehjs-projects.vercel.app/topics/'+localStorage.getItem('id')+'/posts')
            .then(response => response.json())
            .then(data => {
                const commentSection = document.querySelector('.comment-section-main');
                data.forEach((iteam) => {
                const message = new Message(iteam._id, iteam.numberid, iteam.userEmail, iteam.message, iteam.createdAt);
                commentSection.appendChild(message.render());
                });
                console.log(data);
                ListOfMessange = data;
            })
            .catch((error) => console.error('Error fetching topics count:', error) )
    }
    const TopicRender =()=> {
        document.getElementsByTagName('h2')[0].innerHTML = localStorage.getItem('name');
        document.getElementsByTagName('p')[0].innerHTML = localStorage.getItem('topicDes');
    }
fetchMessang();
TopicRender();
});