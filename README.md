<h1>Overview</h1>
<p>This is an interactive comment section where users can post, reply and vote on the comments. This was a bit more difficult than I anticipated, but it was a fun challenge.</p>

<h2>The Challenge</h2>

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments

<h2>Screenshot</h2>
<img src="https://github.com/ray-mak/comments-page/assets/154634286/8aa8095d-80c4-4802-ae5a-052bf4df1ec6"/>

<h1>My Process</h1>
<p>I started out by creating the layout for desktop, and then using media queries to make it mobile responsive. With how the response/comment containers were set up, it was a little tricky getting the layout down at first.</p>
<p>Once the layour was built, I started writing JS. First I created a function for the upvote and downvote counter. Then I created a function for the delete button. Finally what took the longest was the reply and edit functions. It took some time figuring out how to position the message container when a user responds to a comment.</p>

<h2>Built With</h2>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>Vanilla JS</li>
  </ul>

<h2>What I Learned</h2>
<p>I got a lot of practice in with inserting adjacent and child elements. I also created a time function to track when a comment was posted.</p>

<h2>Continued Development</h2>
<p>I would like to implement localstorage to this project to keep track of the newly added comments as well the the time and amount of votes each comment received. </p>

<h1>Author</h1>
Ray Mak
https://www.frontendmentor.io/profile/ray-mak
