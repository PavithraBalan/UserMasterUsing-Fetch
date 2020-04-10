var app = new function () {
    var url = "https://localhost:5001/api/UsersMasterControllers";
    users = [];
    this.FetchAll = function () {
        alert();
        fetch(url)
            .then((response) => {
                users = response.json();
                return users;

            }).then((users) => {
                console.log(users);

                var html = "<table border='1|1'>";
                html += "<th>ID</th>";
                html += "<th>NAME</th>";
                html += "<th>EMAILID</th>";
                for (var i = 0; i < users.length; i++) {
                    html += "<tr>";
                    html += "<td>" + users[i].id + "</td>";
                    html += "<td>" + users[i].name + "</td>";
                    html += "<td>" + users[i].emailId + "</td>";
                    html += '<td><button onclick="app.edit(' + users[i].id + ')">Edit</button></td>';
                    html += '<td><button onclick="app.delete(' + users[i].id + ')">Delete</button></td>';
                    html += "</tr>";
                }
                html += "</table>";
                document.getElementById("box").innerHTML = html;
            });

    }
    // SaveAndUpdate
    this.SaveAndUpdate = function () {
        // alert();
        ((document.getElementById('Button').innerHTML == "Save") ? this.add() : this.update());
    }
    // Add
    this.add = function () {
        alert("Add");
        var id = 0;
        var name = document.getElementById("name").value;
        var e = document.getElementById("emailId").value;
        var emailId = "";
        //var emailId = document.getElementById("emailId").value; 
        fetch(url, { method: 'GET' })
            .then((response) => {
                users = response.json();
                return users;
            }).then((users) => {
                if (users.some(o => o.emailId == e)) {
                    alert("EmailId is already exist");
                    return;
                }
                console.log(users);
                emailId = e;
                usersobj = {};
                usersobj.id = id;
                usersobj.name = name;
                usersobj.emailId = emailId;
                alert(JSON.stringify(usersobj));

                fetch(url, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(usersobj)
                })
                    .then((response) => {

                        this.FetchAll();
                        document.getElementById('id').value = '';
                        document.getElementById('name').value = '';
                        document.getElementById('emailId').value = '';
                    });
            });
    }
    // Update  
    this.update = function () {
        alert();
        id = parseInt(document.getElementById('id').value);
        name = document.getElementById('name').value;
        var e = document.getElementById("emailId").value;
        var emailId = "";
        //emailId= document.getElementById("emailId").value;
        fetch(url, { method: 'GET' })
            .then((response) => {
                users = response.json();
                return users;
            }).then((users) => {
                if (users.some(o => o.emailId == e)) {
                    alert("EmailId is already exist");
                    return;
                }
                emailId = e;
                var updateobj = JSON.stringify({ "id": id, "name": name, "emailId": emailId });

                fetch(url + "/" + updateindex, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8'
                    },

                    body: updateobj
                })
                    .then((response) => {

                        this.FetchAll();
                        document.getElementById('id').value = '';
                        document.getElementById('name').value = '';
                        document.getElementById('emailId').value = '';
                    });
            });
        updateindex = 0;
        document.getElementById('Button').innerHTML = "Save";

    }
    // Edit
    this.edit = function (id) {
        alert(id);
        document.getElementById('Button').innerHTML = "Update";

        fetch(url + "/" + id, { method: 'GET' })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (updates) {
                alert(JSON.stringify(updates));
                updateindex = updates.id;
                document.getElementById('id').value = updates.id;
                document.getElementById('name').value = updates.name;
                document.getElementById("emailId").value = updates.emailId;
            })
    }

    // delete
    this.delete = function (deleteid) {
        alert(deleteid);
        fetch(url + "/" + deleteid, {
            method: 'delete',
        }).then((response) => {

            this.FetchAll();
        });
    }
}
