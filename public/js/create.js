var errorTitle = "Enter a title";
var errorContent =  "Enter description";
const defaultUser = "BigChungus";
var uploaded_image;

var loadFile = function(event) {
	var image = document.getElementById('display-image');
    uploaded_image = event.target.files[0];
	image.src = URL.createObjectURL(event.target.files[0]);
};

document.addEventListener("DOMContentLoaded", function(event){

    const postTitle = document.getElementById('post-title');
    postTitle.addEventListener('keyup', function(){
        var title = postTitle.value;
        var content = document.getElementById('post-content').value;

        if(validateFields(title, content)){
            $('#submit-button').prop('disabled', false);
            showError("");
        }
        else{
            $('#submit-button').prop('disabled', true);
        }
    });

    const postDesc = document.getElementById('post-content');
    postDesc.addEventListener('keyup', function(){
        var content = postDesc.value;
        var title = document.getElementById('post-title').value;
        if(validateFields(title, content)){
            $('#submit-button').prop('disabled', false);
            showError("");
        }
        else{
            $('#submit-button').prop('disabled', true);
        }
    });

    function showError(errorText) {
		$("div#error-text").text(errorText);
	}

    function validateFields(title, content) {
		if(title.length == 0 || content.length == 0){
			if(title.length == 0){
				showError(errorTitle);
			}
			else if(content.length == 0){
				showError(errorContent);
			}
			return false;
		}
		return true;
	}
});

/*
$(document).ready(function(){
    
    console.log("Document Ready");
    //console.log("image: "+ uploaded_image);
    $("#submit-button").click(function(e){
        e.preventDefault();
        
        let title = $("#post-title").val();
        let content = $("#post-content").val();
        let game = $("#selected-game").val();
        //no image yet
        if(validateFields(title, content)){
            console.log('success');
            
            fetch('/create', {
                method: 'POST',
                body: JSON.stringify({
                    username: defaultUser,
                    game: game,
                    postDate: dateFormat(),
                    postTitle: title,
                    postDesc: content,
                    image: uploaded_image
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).catch((error) => {
                console.error('Error: ', error);
            })
            
            location.replace("/forum");
            
        }
        else{
            resetForm();
        } 
    }); 

    function dateFormat(){
        var today = new Date();
    
        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDate();
    
        var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    
        return "" +monthArray[month]+ " " +day+ ", " +year;
    }

    function validateFields(title, content) {
		if(title.length == 0 || content.length == 0){
			if(title.length == 0){
				showError(errorTitle);
			}
			else if(content.length == 0){
				showError(errorContent);
			}
			return false;
		}
		return true;
	}

	function showError(errorText) {
		$("div#error-text").text(errorText);
	}

    function resetForm() {
        $("#post-title").val("");
        $("#post-content").val("");
        $("#uploaded-image").val("");
        $("#selected-game").val("Apex Legends");
        $("#display-image").attr("src", "");
	}
    
});
*/