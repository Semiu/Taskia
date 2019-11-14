//Client JavaScript file

const alert_dg = document.getElementById("alert_danger")

const alert_sc = document.getElementById("alert_success")

const userfName = document.getElementById("firstname")


//Signup form - to create user
let createUser = document.getElementById("signup").addEventListener('submit', (e) => {

    //Restricting multiple entries
    e.preventDefault();

    const form = e.target;

    alert_dg.textContent = " ";

    alert_sc.textContent = " ";

    fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: form.profilepic.value,
                firstName: form.firstname.value,
                lastName: form.lastname.value,
                email: form.email.value,
                password: form.password.value
            })

    }).then((data) => {

        if(data.status === 400){

            alert_dg.textContent = "Account cannot be created!"

        } else {

            alert_sc.textContent = "Your account has been created, " + userfName

            
        }

    })

})