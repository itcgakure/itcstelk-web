function masukAkun(){
    let determ;
    var nis = $("#inputNIS"). val();
    var email = nis+"@itcstelk.com";
    var password = $("#inputPASS"). val();

    if( nis == '' || nis.length < 5 ) {
        alert('Kolom NIS kosong atau salah format');
        return false;
    } else if( password == '' || password.length < 5 ) {
        alert('Kolom Kata Sandi kosong atau salah format');
        return false;
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            determ = false;
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Code: "+errorCode+"   Message: "+errorMessage);
            if (errorCode === 'auth/wrong-password') {
                alert('Kata Sandi salah');
            } else {
                alert(errorMessage);
                window.location.href = 'asieraitc.html';
            }
        }).then(function() {
            if(determ == false) {
                return false;
            } else {
                window.location.href = 'bsieraitc.html';
            }
        });
    };
};
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href = 'bsieraitc.html';
    }
});