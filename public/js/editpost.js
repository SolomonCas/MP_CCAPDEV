document.addEventListener("DOMContentLoaded", function (event) {
    const editButton = document.getElementById("frEditBtn");
    const deleteButton = document.getElementById("frDeleteBtn");
    const postDesc = document.getElementById("post-description-text");
    const postID = document.getElementById("postID").textContent;
    const postid = postID.substring(1);

    deleteButton.addEventListener('click', function () {
        fetch('/deletePost?postid=' + postid)
            .then ((res) => {
                if(res.status >= 200 && res.status < 300) {
                    window.location = '/forum';
                }
                else {
                    console.log("response error: " + res.status);
                }
            }).catch ((error) => {
                console.error(error);
            });
    })

    fetch ('/checkUsernamePost?postid=' + postid)
            .then (res => res.text()
            .then ((data) => {
                if (!data) {
                    editButton.style.display = "none";
                }
                else {
                    editButton.style.display = "inline";
                    editButton.addEventListener('click', function () {
                        if (editButton.textContent == "Edit Post")
                        {
                            editButton.textContent = "Confirm";
                            deleteButton.style.display = "inline"
                            postDesc.contentEditable = "true";
                        }
                        else {
                            editButton.textContent = "Edit Post";
                            deleteButton.style.display = "none"
                            postDesc.contentEditable = "false";
                
                            //console.log(postid + " " + postDesc.textContent);
                            fetch('/editPost?postid=' + postid + '&postDesc=' + postDesc.textContent)
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
                }
    }));
})