

//upvote/downvote function
const mainContainer = document.querySelector(".main-container");

mainContainer.addEventListener("click", (e) => {
    if (e.target.classList == "plus") {
        const voteContainer = e.target.closest(".vote-container");
        const count = voteContainer.querySelector('.counter');
        let voteCount = parseInt(count.innerText);
        voteCount++;
        count.innerText = voteCount;
    }
})

mainContainer.addEventListener("click", (e) => {
    if (e.target.classList == "minus") {
        const voteContainer = e.target.closest(".vote-container");
        const count = voteContainer.querySelector('.counter');
        let voteCount = parseInt(count.innerText);
        voteCount--;
        count.innerText = voteCount;
    }
})

//delete function

mainContainer.addEventListener("click", (e) => {
    if (e.target.classList == "delete") {
        const deleteContainer = e.target.closest(".personal-comment");
        const deleteResponse = e.target.closest(".message-container");
        if (deleteContainer) {deleteContainer.remove()};
        if (deleteResponse) {deleteResponse.remove()};
    }
})


//reply function

mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("reply-icon") || e.target.classList.contains("reply")) {
        const messageBox = document.createElement("div");
        messageBox.classList.add("message-container");
        const replyName = e.target.closest(".parent-comment").querySelector(".username").innerText;
        messageBox.innerHTML = `
            <img class="profile-pic" src="images/avatars/image-juliusomo.png" alt="profile picture"/>
            <textarea class="text-input" type="text" placeholder="Add a comment...">@${replyName}</textarea> 
            <div class="reply-delete"> 
                <button type="button" class="reply-btn">REPLY</button>
                <div class="delete-container">
                    <image class="delete-icon" src="images/icon-delete.svg" alt="delete icon"/>
                    <div class="delete">Delete</div>
                </div>
            </div>`;
        const parentComment = e.target.closest(".parent-comment");
        console.log(parentComment.nextElementSibling);
        const nextElement = parentComment.nextElementSibling;
        if (nextElement == null) {
            const targetComment = e.target.closest(".parent-comment");
            targetComment.insertAdjacentElement("afterend", messageBox);
            return
        }
        if (nextElement.classList.contains("message-container")) {
            console.log("contains message container")
        } else if (nextElement.classList.contains("response-container")) {
            console.log("has response container");
            const repliesContainer = nextElement.querySelector(".replies-container");
            if (repliesContainer.lastElementChild.classList.contains("message-container")) {
                return
            } else {
                repliesContainer.appendChild(messageBox);
            }
        } else {
            const targetComment = e.target.closest(".parent-comment");
            targetComment.insertAdjacentElement("afterend", messageBox);
        }
    }
})

//post reply
mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("reply-btn")) {
        const messageContainer = e.target.closest(".message-container")
        const commentText = messageContainer.querySelector(".text-input").value;
        const atRegex = /@(\w+)/g;
        const updatedComment = commentText.replace(atRegex, "<span class='reply-tag'>@$1</span>");
        const responseContainer = document.createElement("div");
        responseContainer.classList.add("response-container");
        const newComment = document.createElement("div");
        newComment.classList.add("personal-comment");
        newComment.innerHTML += `
        <div class="vote-container">
            <div class="plus">+</div>
            <div class="counter">0</div>
            <div class="minus">-</div>
            <div class="mobile edit-container">
                <div class="delete-container">
                    <image class="delete-icon" src="images/icon-delete.svg" alt="delete icon"/>
                    <div class="delete">Delete</div>
                </div>
                <div class="edit-btn-container">
                    <image class="edit-icon" src="images/icon-edit.svg" alt="edit icon"/>
                    <div class="edit">Edit</div>
                </div>    
            </div>
        </div>
        <div class="info-container">
            <div class="user-container">
                <img class="profile-pic" src="images/avatars/image-juliusomo.png" alt="profile picture"/>
                <div class="username">juliusomo</div>
                <div class="you">you</div>
                <div class="time">${timeAgo(Date.now())}</div>
                <div class="edit-container">
                    <div class="delete-container">
                        <image class="delete-icon" src="images/icon-delete.svg" alt="delete icon"/>
                        <div class="delete">Delete</div>
                    </div>
                    <div class="edit-btn-container">
                        <image class="edit-icon" src="images/icon-edit.svg" alt="edit icon"/>
                        <div class="edit">Edit</div>
                    </div>    
                </div>
            </div>
            <div class="comment">${updatedComment}</div>
        </div>`;
        if (e.target.closest(".replies-container") !== null) {
            messageContainer.insertAdjacentElement("beforebegin", newComment);
            messageContainer.remove();
        } else {
            responseContainer.innerHTML +=`
                <div class="vertical-container">
                    <div class="vertical-div"></div>
                </div>`;
            responseContainer.appendChild(newComment);
            messageContainer.insertAdjacentElement("beforebegin", responseContainer);
            messageContainer.remove();
        }
    }
})

//edit comment
mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit") || e.target.classList.contains("edit-icon")) {
        const targetContainer = e.target.closest(".personal-comment");
        const comment = targetContainer.querySelector(".comment").innerText;
        const infoContainer = targetContainer.querySelector(".info-container");
        const oldComment = infoContainer.querySelector(".comment");
        const editTextBox = document.createElement("div");
        editTextBox.classList.add("edit-comment-container");
        // const textArea = document.createElement("textarea");
        // textArea.classList.add("text-input");
        editTextBox.innerHTML += `
        <textarea class="text-input" type="text" placeholder="Add a comment...">${comment}</textarea>
            <button type="button" class="update-btn">UPDATE</button>
        `;
        oldComment.remove();
        infoContainer.appendChild(editTextBox);
    }
    if (e.target.classList.contains("update-btn")) {
        const infoContainer = e.target.closest(".info-container");
        const textArea = infoContainer.querySelector(".text-input");
        const textInput = textArea.value;
        const atRegex = /@(\w+)/g;
        const updatedText = textInput.replace(atRegex, "<span class='reply-tag'>@$1</span>");
        const editCommentContainer = infoContainer.querySelector(".edit-comment-container");
        const comment = document.createElement("div");
        comment.classList.add('comment');
        comment.innerHTML += `${updatedText}`;
        editCommentContainer.remove();
        infoContainer.appendChild(comment);
    }
})

//send comment
const sendBox = document.querySelector(".send-message-container");
const sendBtn = document.querySelector(".send-btn");

sendBtn.addEventListener("click", () => {
    const inputValue = sendBox.querySelector(".text-input").value;
    const parentComment = document.createElement("div");
    parentComment.classList.add('personal-comment');
    parentComment.innerHTML += `
    <div class="vote-container">
        <div class="plus">+</div>
        <div class="counter">0</div>
        <div class="minus">-</div>
        <div class="mobile edit-container">
            <div class="delete-container">
                <image class="delete-icon" src="images/icon-delete.svg" alt="delete icon"/>
                <div class="delete">Delete</div>
            </div>
            <div class="edit-btn-container">
                <image class="edit-icon" src="images/icon-edit.svg" alt="edit icon"/>
                <div class="edit">Edit</div>
            </div>    
        </div>
    </div>
    <div class="info-container">
        <div class="user-container">
            <img class="profile-pic" src="images/avatars/image-juliusomo.png" alt="profile picture"/>
            <div class="username">juliusomo</div>
            <div class="you">you</div>
            <div class="time">${timeAgo(Date.now())}</div>
            <div class="edit-container">
                <div class="delete-container">
                    <image class="delete-icon" src="images/icon-delete.svg" alt="delete icon"/>
                    <div class="delete">Delete</div>
                </div>
                <div class="edit-btn-container">
                    <image class="edit-icon" src="images/icon-edit.svg" alt="edit icon"/>
                    <div class="edit">Edit</div>
                </div>    
            </div>
        </div>
        <div class="comment">${inputValue}</div>
    </div>`
    sendBox.insertAdjacentElement("beforebegin", parentComment);
})

//time function

const timeAgo = (time) => {
    const currentTime = new Date();
    const posted = new Date(time);
    const timeDifference = currentTime - posted;
    const msPerMinute = 1000 * 60;
    const minutesAgo = Math.floor(timeDifference / msPerMinute);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    if (minutesAgo < 60) {
        return `${minutesAgo} min ago`;
    }
    if (hoursAgo < 24) {
        return `${hoursAgo} hours ago`;
    }
    return `${daysAgo} days ago`
}