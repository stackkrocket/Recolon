/* Show page */
//By default the comment section card is displayed
// This code block toggles between collapsed state and display stat
const commentIcon = document.querySelector('.comment-icon');
commentIcon.addEventListener('click', function(){
    const commentThread = document.querySelector('.comment-section-wrapper');
    commentThread.classList.toggle('comment-toggle-display');
})