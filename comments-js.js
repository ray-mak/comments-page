

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
        const parentComment = e.target.closest(".parent-comment");
        console.log(parentComment.nextElementSibling);
        const nextElement = parentComment.nextElementSibling;
        if (nextElement.classList.contains("message-container")) {
            console.log("contains message container")
        } else if (nextElement.classList.contains("response-container")) {
            console.log("has response container");
        }
    }
})