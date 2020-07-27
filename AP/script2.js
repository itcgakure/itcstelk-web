function keluarAkun(){
    firebase.auth().signOut();
    window.location.href = 'asieraitc.html';
};
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var email = user.email;
        $('#halo').text(email.replace('@itcstelk.com',''));
    } else {
        window.location.href = 'asieraitc.html';
    };
});

function hadirAbsen(){
    var dbRef = firebase.database();
    var token = $('#inputTOKEN').val();
    var user = $('#halo').text();
    // console.log(token);
    // console.log(user);
    return firebase.database().ref('absensi/' + user +'/token').once('value').then(function(snapshot) {
        var palu = (snapshot.val());
        // console.log(palu);
        if (palu == token) {
            dbRef.ref('absensi/'+ user).remove();
            // console.log("Yeah");
            firebase.database().ref('kehadiran/' + user).set({
                data: "HADIR"
              }, function(error) {
                if (error) {
                    alert("Terjadi Kesalahan, Hubungi Admin Segera!");
                } else {
                    alert("Anda dinyatakan Hadir");
                }
              });            
        } else {
            alert("Token Absensi Salah")
        }
    });
};

function izinAbsen(){
    var dbRef = firebase.database();
    var user = $('#halo').text();
    var alasan = $('#alasanizin').val();
    firebase.database().ref('kehadiran/' + user).set({
        data: "IZIN",
        alasan: alasan
      }, function(error) {
        if (error) {
            alert("Terjadi Kesalahan, Hubungi Admin Segera!");
        } else {
            alert("Anda dinyatakan Izin");
        }
      }); 
}