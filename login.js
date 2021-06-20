function validate(){
    var login=document.getElementById("login").value;
    var password=document.getElementById("password").value;
    
    if(login == "admin" && password == "admin"){
        ;
        return false;
    }
    else{
        alert("login failed");
    }
}