{/* <script src="https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.5/firebase-firestore.js"></script>


<script>
    // Initialize Firebase with your project configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDOxXnPn6JVA6jFpkp_JZX8KaDZdKxrt3M",
        authDomain: "final-project-4bdf1.firebaseapp.com",
        projectId: "final-project-4bdf1",
        storageBucket: "final-project-4bdf1.appspot.com",
        messagingSenderId: "936352800987",
        appId: "1:936352800987:web:f7a5641fa10ac35be0ecfe",
        measurementId: "G-ZS71X98BCH"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    function get_diary(){
        var username = document.getElementById("get_username").value;
        var date = document.getElementById("get_date").value;
        
        db.collection("diary")
        .where("userName", "==" , username)
        .where("date", "==", date)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                document.getElementById("user_name").value = doc.data().userName;
                document.getElementById("save_date").value = doc.data().date;
                document.getElementById("description").value = doc.data().description;
            });
        });
    }

    function save_diary(){
        var username = document.getElementById("user_name").value;
        var date = document.getElementById("save_date").value;
        var description = document.getElementById("description").value;

        db.collection("diary").add({
            userName : username,
            date : date,
            description : description
        }).then(() => {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }
</script> */}