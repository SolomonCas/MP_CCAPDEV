document.addEventListener("DOMContentLoaded", function(event){
    const username = document.getElementById("username");
    const description = document.getElementById("description-text");
    const editbtn = document.getElementById("editBtn");
    const warning = document.getElementById("editText");
    const editPic = document.getElementById("picBtn");
    const imgUpload = document.getElementById("upload-image-div");
    const submitBtn = document.getElementById("submit-pic");
    const fileInput = document.getElementById("uploaded-image");
    var currentusername = username.textContent;

    fileInput.addEventListener('change', function(){
        if(document.getElementById("uploaded-image").value == ""){
            submitBtn.disabled = true;
        }
        else
            submitBtn.disabled = false;
    })

    fetch("/CurrUsername").then(res => res.text()
        .then(data => {
            if (data != username.textContent){
                editPic.style.display = "none";
            }
            else{
                editPic.addEventListener("click", function(){
                    if(editPic.textContent == "Edit Picture"){
                        editPic.textContent = "Cancel";
                        imgUpload.style.display = "block";
                    }
                    else if(editPic.textContent == "Cancel"){
                        editPic.textContent = "Edit Picture";
                        imgUpload.style.display = "none";
                        location.reload();
                    }
                })
            }
        }))




    fetch("/CurrUsername").then(res => res.text()
        .then(data =>{
                if(data != username.textContent){
                    editbtn.style.display = "none";
                }
                else{
                    editbtn.addEventListener('click', function(){
                        if(editbtn.textContent == "Edit Profile"){
                            editbtn.textContent = "Confirm";
                            description.contentEditable = true;
                            
                        }    
                
                        else if(editbtn.textContent == "Confirm"){
                            editbtn.textContent = "Edit Profile";
                            description.contentEditable = false;
                            warning.textContent = "";
                            description.textContent.trim();
                
                            fetch('/updateProfile?currN=' + currentusername + '&newN=' + username.textContent + '&profDesc=' + description.textContent)
                            .then((res) =>{
                                if(res.status >= 200 && res.status < 300) {
                                    console.log(res);
                                    window.location = '/profile/' + username.textContent;
                                }
                                else {
                                    console.log("response error: " + res.status);
                                }
                            }).catch ((error) => {
                                console.error(error);
                            });
                        }
                    });
                }
            }
        )
    )   
})