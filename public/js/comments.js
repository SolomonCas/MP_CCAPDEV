document.addEventListener("DOMContentLoaded", function (event) {
    const postCommentButton = document.getElementById('post-comment');
    
    function dateFormat(){
        var today = new Date();
    
        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDate();
    
        var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    
        return "" +monthArray[month]+ " " +day+ ", " +year;
    }

    postCommentButton.addEventListener('click', function () {
        const id = document.getElementById("postID").textContent;
        const text = document.getElementById("comment-input-box").value;
        const postTitle = document.getElementById("post-postTitle").textContent;
        var date = dateFormat();
        var postid = id.substring(1);

        if (text)
        {
            fetch('/postComment?&date=' + date + '&text=' + text + '&postid=' + postid + '&postTitle=' + postTitle)
                .then ((res) => {
                    if(res.status >= 200 && res.status < 300) {
                        location.reload();
                    }
                    else {
                        console.log("response error: " + res.status);
                    }
                }).catch ((error) => {
                    console.error(error);
                });
        }
    })

})