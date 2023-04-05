document.addEventListener("DOMContentLoaded", function (event) {
    const signupBtn = document.getElementById("signupBtn");
    const emailInput = document.getElementById("email");
    const passwordInput2 = document.getElementById("pass2");
    const usernameInput = document.getElementById("signup_uname");
    const errorText = document.getElementById("signupErrorEmail");
    const errorText2 = document.getElementById("signupErrorUser");
    const errorText3 = document.getElementById("signupErrorPassword");
    const errorText4 = document.getElementById("signupErrorFields");


    emailInput.addEventListener('keyup', function() {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        var isEmail = regex.test(emailInput.value);

        if (isEmail) {
            errorText.textContent = "";
            emailInput.style.backgroundColor = "white";

            fetch ('/checkEmail?&email=' + emailInput.value)
            .then (res => res.text()
            .then ((data) => {
                if (!data) {
                    errorText.textContent = "";
                    emailInput.style.backgroundColor = "white";
                }
                else {
                    errorText.textContent = "Email address is already registered.";
                    emailInput.style.backgroundColor = "red";
                }
            }));
        }
        else {
            errorText.textContent = "Invalid email address.";
            emailInput.style.backgroundColor = "red";
        }
    })

    usernameInput.addEventListener('keyup', function() {
        fetch ('/checkUsername?&username=' + usernameInput.value)
            .then (res => res.text()
            .then ((data) => {
                if (!data) {
                    errorText2.textContent = "";
                    usernameInput.style.backgroundColor = "white";
                }
                else {
                    errorText2.textContent = "Username is taken.";
                    usernameInput.style.backgroundColor = "red";
                }
        }));
    })

    passwordInput2.addEventListener('keyup', function () {
        const passwordInput1 = document.getElementById("pass1").value;

        if (passwordInput1 != passwordInput2.value) {
            errorText3.textContent = "Passwords do not match.";
            passwordInput2.style.backgroundColor = "red";
        }
        else {
            errorText3.textContent = "";
            passwordInput2.style.backgroundColor = "white";
        }
    })

    signupBtn.addEventListener('click', function (e) {
        e.preventDefault;
        const usernamecheck = usernameInput.value;
        const emailcheck = emailInput.value;
        const passwordcheck = document.getElementById("pass2").value;
        
        //check for error
        if (usernamecheck == "" || emailcheck == "" || passwordcheck == "") {
            errorText4.textContent = "Fill up all fields.";
        }
        else {
            errorText4.textContent = "";
        }

        if (errorText.textContent != "" || errorText2.textContent != "" || errorText3.textContent != "" || errorText4.textContent != "") {
        }
        else {
            const formData = new FormData(document.forms.signup);
            console.log(formData.getAll);
            var reqBody = {};
            for(var data of formData){
                //console.log(data[0] + " " + data[1]);
                reqBody[data[0]] = data[1];
                console.log("reqbody-- " + reqBody[data[0]]);
            }
            console.log("testing " + reqBody);
            fetch ("/signup", {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'    
                }
            })
            .then ((res) => {
                if(res.status >= 200 && res.status < 300) {
                    window.location = '/login';
                }
                else {
                    console.log("response error: " + res.status);
                }
            }).catch ((error) => {
                console.error(error);
            });

            //reset fields
           /* usernameInput.value = "";
            emailInput.value = "";
            document.getElementById("pass").value = "";
            document.getElementById("pass2").value = "";*/
        }
    })

});