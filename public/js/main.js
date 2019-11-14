//jQuery file for the index.hbs file
(function () {

    //Login form
    $("#login").submit(function(e){

        //Restricting multiple entries
        e.preventDefault();

        var email = $("#email").val();
        var password = $("#password").val();

        console.log(email + password);






    })
     

})();