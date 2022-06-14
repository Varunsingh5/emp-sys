import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { addDoc, getDocs, collection, where, query,  onSnapshot, updateDoc } from "firebase/firestore";
import { Button, } from "reactstrap";
import Grid from '@mui/material/Grid';
import moment from "moment";
import {  doc } from "firebase/firestore";
// import { setDoc } from "firebase/firestore";
// import { getDoc, doc } from "firebase/firestore";

const UserTable = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loader, setLoader] = useState(false);
  const [userCollection, setUserCollection] = useState(null);
  const [edit, setEdit] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("")


  useEffect(() => {
    try {
      let userArray = [];
      const q = query(collection(db, "userList"), where( "isDeleted","==",false), where( "role","==","user"))
      const unsub = onSnapshot(q, (querySnapshot) => {
        let latestuserArr = [];
        querySnapshot.forEach((doc) => {
          latestuserArr.push({
            'id': doc.id,
            'details': doc.data()
          });
          userArray = latestuserArr;
        });
        setUserCollection([...userArray])
      });
    } catch (error) {
      console.log("=error in snapshot", error);
    }

  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const q = query(collection(db, "userList"), where("phone", "==", phone||"email", "==", email));

    const querySnapshot = await getDocs(q);
    const dd = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      dd.push(doc.data());
    });

    if (edit) {
      if (dd.length > 0) {
        alert("number or email already register with other user")
      }
      else {
        const docRef = doc(db, 'userList', selectedDoc);
        await updateDoc(docRef, {
          name: name,
          email: email,
          phone: phone,
          updated_at: moment.now(),
        }).then((e) => {
          setEmail("");
          setPhone("");
          setName("");
          setAddress("");
          setEdit(false)
        })
        .catch((error) =>
          console.log("error on doc update user list", error)
        );
      }
     
    }
    else {
        const q = query(collection(db, "userList"), where("isDeleted","==",true),where("phone", "==", phone),where("email", "==", email));

        const querySnapshot = await getDocs(q);
        const dd = [];
    
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          dd.push(doc.id);
        });
        if (dd.length > 0) {
          alert("ljkbkhb")
          const docRef = doc(db, 'userList', dd[0]);
          await updateDoc(docRef, {
            isDeleted: false,
            deleted_at: null,
          }) .then((e) => {
            setEmail("");
          setPhone("");
          setName("");
          setAddress("");
          })
          .catch((error) =>
            console.log("error on doc add user list", error)
          );
        }
        else {

        await addDoc(collection(db, "userList"), {
          name: name,
          email: email,
          onlineState: false,
          role: "user",
          phone: phone,
          isVerified: false,
          isDeleted: false,
          created_at: moment.now(),
          updated_at: moment.now(),
          deleted_at: null,
        })
          .then((e) => {
            setEmail("");
            setPhone("");
            setName("");
            setAddress("");
          })
          .catch((error) =>
            console.log("error on doc add user list", error)
          );
        }
      }
  }


  // const invite = (user) => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: JSON.stringify({ email: user.email, phone: user.phone }),
  //     redirect: 'follow'
  //   };

  //   fetch("http://localhost:3005/send_mail", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }
  const deleteUser = async (id) => {
    const docRef = doc(db, 'userList', id);
    await updateDoc(docRef, {
      isDeleted: true,
      deleted_at: moment.now(),
    }) .then((e) => {
      if (userCollection.length == 1) {
        setUserCollection([])
      }
    })
    .catch((error) =>
      console.log("error on doc add user list", error)
    );
    // console.log("d,jbfksdbfjkbjk", userCollection.length);
    // await deleteDoc(doc(db, "userList", id)).then(res => {
      // if (userCollection.length == 1) {
      //   setUserCollection([])
      // }
    // }
    // ).catch((error) =>
    //   console.log("error on doc delete", error)
    // );
  }
  const editUser = (item) => {
    setEmail(item.details.email);
    setName(item.details.name);
    setPhone(item.details.phone);
    setSelectedDoc(item.id)
    setEdit(true);
  }

  return (
    <>
    <form className="form" onSubmit={handleSubmit}>
      <h1>User Table </h1>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">``
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input className="form-control" placeholder="Full Name" name="fullName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>
          <input type="number" className="form-control" placeholder="Mobile" name="mobile"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <input className="form-control" placeholder="Email" name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <textarea className="form-control" placeholder="Address" name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="form-group">
        <Button type="submit" className="rounded-pill my-3" color="secondary-blue"
          style={{ backgroundColor: "blue", color: 'white', borderColor: "blue", marginLeft: "37%" }}>
          {edit ? "Update" : "Add"}
        </Button>
      </div>
      <div  >
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>User Table</h1>
      </div>
    </form>
    <Grid item xs={6}>
      <Grid xs={6} >
        <table className="table table-borderless table-stripped" >
          <thead className="thead-light">
            <tr >
              <th>Full Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Actions</th>
              <th>Invite</th>
            </tr>
          </thead>
          <tbody >
            {
              userCollection?.map((item) => {
                return (
                  <tr>
                    <td>{item.details.name}</td>
                    <td>{item.details.phone}</td>
                    <td>{item.details.email}</td>
                    <button onClick={() => { editUser(item) }}>edit</button>
                    <button onClick={() => { deleteUser(item.id) }}>delete</button>
                    <td> <button onClick={() => { invite(item.details) }}>Invite</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Grid>
    </Grid>
    <Grid xs={6}>
    </Grid>
  </>
  )
}

export default UserTable;
