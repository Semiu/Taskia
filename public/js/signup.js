/**
Client JavaScript file for the signup.hbs file
*/
// Declaring the needed global variables
const alert_dg = document.getElementById("alert_danger")
const alert_sc = document.getElementById("alert_success")
const userEmail = document.getElementById("email")
const userPassword_1 = document.getElementById("password1")
const userPassword_2 = document.getElementById("password2")

//Validating the form input and send error message function if not validated
//START
let validateInputAndSendErrorMsg = function (){document.getElementById("signup").addEventListener('submit', (e) => {

    //Grab the SignUpFormData
    const signUpFormData = document.getElementById("signup")

    //Restricting default behaviour of form
    e.preventDefault();

    //Hold the value of the user email
    const userEmailValue = userEmail.value

    //Regex function to validate the email
    let isEmailValid = function (userEmailValue){
        const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return pattern.test(userEmailValue)
    };

    
    //Declare an empty array for the error messages
    const errorMessage = [];
    // Hold the values for the password fields
    const userPasswordValue_1 = userPassword_1.value
    const userPasswordValue_2 = userPassword_2.value

    //Validation function 
    let isInputValid = function (){
        if (userPasswordValue_1.length < 8){ 
            errorMessage.push("Password cannot be less than 8 characters \n")

        }if (!isEmailValid (userEmailValue) ){
            errorMessage.push("Provide a valid email \n")

        }if(userPasswordValue_1 !== userPasswordValue_2){
            errorMessage.push("Provide matching passwords")

        }
        return errorMessage;
    };

    //SignUp function - to call the createUser or return the errorMessage
    let signUp = function (){
        let errorMessage = isInputValid();
        if(errorMessage.length > 0){
            alert(errorMessage);
            return;
        }
        //Call the createuser function
        createUser(signUpFormData);
    }
    //Call the SignUp function
    signUp();
})};
//END

//Calling the validateInputAndSendErrorMsg function
validateInputAndSendErrorMsg ();

//createUser function (only to be called when the form input is validated)
//START
let createUser = function(signUpFormData){

    //Setting the alert content to null
    alert_dg.textContent = " ";
    alert_sc.textContent = " ";

    //JS method to send the data to the Backend
    fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: signUpFormData.firstname.value,
                lastName: signUpFormData.lastname.value,
                email: signUpFormData.email.value,
                password: signUpFormData.password1.value 
            })

    }).then((data) => {

        console.log(data)

        if(data.status === 400){

            alert_dg.textContent = "Account cannot be created!"

            return;

        } else {

            alert("Your account has been created, " + signUpFormData.firstname.value);

            //The user's page will be loaded after 5000 milliseconds 
	    		setTimeout(function (){
                    alert_sc.textContent = "Wait ...";

                    //Transition to '/users' url
	    			window.location.href = data.url;
                }, 500);

        }

    })
};
//END