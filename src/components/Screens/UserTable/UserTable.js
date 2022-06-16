import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"
import { addDoc, getDocs, collection, where, query, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import { Button, } from "reactstrap";
import Grid from '@mui/material/Grid';
import moment from "moment";
import { doc } from "firebase/firestore";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from "../pages/Sidebar/AdminSidebar"
// import {encrypt} from 'encryption';

import { isEmpty, isUndefined } from "lodash"
import validator from 'validator';


const UserTable = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState("");

  const [loader, setLoader] = useState(false);
  const [userCollection, setUserCollection] = useState(null);
  const [edit, setEdit] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("")
  // const [status, setStatus] = useState("");



  useEffect(() => {
    try {
      let userArray = [];
      const q = query(collection(db, "userList"), where("isDeleted", "==", false), where("role", "==", "user"))
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

    const q = query(collection(db, "userList"), where("phone", "==", phone || "email", "==", email));
    const querySnapshot = await getDocs(q);
    const dd = [];

    querySnapshot.forEach((doc) => {
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
          setEdit(false)
        })
          .catch((error) =>
            console.log("error on doc update user list", error)
          );
      }
    }
    else {
      const q = query(collection(db, "userList"), where("isDeleted", "==", true), where("phone", "==", phone), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      const dd = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        dd.push(doc.id);
      });
      if (dd.length > 0) {
        alert("previous user  ")
        const docRef = doc(db, 'userList', dd[0]);
        await updateDoc(docRef, {
          isDeleted: false,
          deleted_at: null,
        }).then((e) => {
          setEmail();
          setPhone("");
          setName("");
        })
          .catch((error) =>
            console.log("error on doc add user list", error)
          );
      }
      else {
        // var CryptoJS = require("crypto-js");
        // let data;
        // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), password).toString();
        // console.log(ciphertext);

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
          invite_sent: false,
          password: "",
          // ciphertext
        })
          .then((e) => {
            setEmail("");
            setPhone("");
            setName("");

          })
          .catch((error) =>
            console.log("error on doc add user list", error)
          );
      }
    }
  }

  const invite = async (item) => {
    console.log("item",)
    const docRef = doc(db, "userList", item.id);
    const docSnap = await getDoc(docRef);
    // alert("invitation sent to the user")
    if (docSnap.exists()) {
      console.log("4tsdynyjdryjnkdtr", docSnap.data().invite_sent)
      if (!docSnap.data()?.invite_sent) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({ userID: window.btoa(item.details.phone), email: item.details.email }),
          redirect: 'follow'
        };

        fetch("http://localhost:3007/send_mail", requestOptions)
          .then(response => response.text())
          .then(async (result) => {
            await updateDoc(docRef, {
              invite_sent: true
            })
          })
          .catch(error => console.log('error', error));
      }
    }
    else {
    }

  }
  const deleteUser = async (id) => {
    alert("Are you sure!");
    const docRef = doc(db, 'userList', id);
    await updateDoc(docRef, {
      isDeleted: true,
      deleted_at: moment.now(),
    }).then((e) => {
      if (userCollection.length === 1) {
        setUserCollection([])
      }
    })
      .catch((error) =>
        console.log("error on doc add user list", error)
      );
  }

  const editUser = (item) => {
    setEmail(item.details.email);
    setName(item.details.name);
    setPhone(item.details.phone);
    setPhone(item.details.password);
    setPhone(item.details.confirmPassword);
    setSelectedDoc(item.id)
    setEdit(true);
  }

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
 

  const validateLogin = () => {
    if (!isUndefined(email)) {
      if (isEmpty(email)) {
        setEmailError("Email is a required field")
      }
      else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
        setEmailError("Please enter valid email")
      } else {
        setEmailError("")
      }
    }
    // if (!isUndefined(password)) {
    //   if (isEmpty(password)) {
    //     setPasswordError("Password is a required field")
    //   }
    //   else if (!validator.isStrongPassword(password, {
    //     minLength: 6,
    //     minNumbers: 1,
    //     minSymbols: 1
    //   })) {
    //     setPasswordError("Please enter valid Password")
    //   } else {
    //     setPasswordError("")
    //   }
    // }
  }
  useEffect(() => {
    validateLogin();
  }, [email,phone ]);

  return (
    < div style={{ backgroundColor: "white" }}>

      <div style={{ width: "30%" }}>
        <AdminSidebar />
      </div>

      <div style={{ width: "70%" }}>
        <form className="form" onSubmit={handleSubmit} style={{ marginLeft: '50%' }}>
          <h1 style={{ marginTop: "5%" }}>Add User  </h1>
          <div>
            <input className="form-control" placeholder="Full Name" name="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div> <br />
          <div>
            <input type="number" className="form-control" placeholder="Mobile" name="mobile"
              value={phone} onChange={(e) => { setPhone(e.target.value) }}
            />
          </div>
          <br />
          <div>
            <input className="form-control" placeholder="Email" name="email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <span className="text-danger">{emailError}</span>
            <br />
            {/* <div>
              <input className="form-control" placeholder="Password" name="password"
                type="password"
                value={password}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              /> <br />
              <span className="text-danger">{passwordError}</span>
            </div> */}
            {/* <div>
              <input className="form-control" placeholder="Confirm-password" name="Confirm-password"
                type="password"
                value={confirmPassword}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              /> <br />
              <span className="text-danger">{confirmPasswordError}</span>
            </div> */}
          </div>


          <div className="form-group">
            <Button type="submit" className="rounded-pill my-3" color="secondary-blue"
              style={{ backgroundColor: "blue", color: 'white', borderColor: "blue", padding: " 5px 32px 5px 26px", }}
              disabled={
                isUndefined(email) || isUndefined(phone) || !(isEmpty(emailError) && isEmpty(phoneError))
              }  >
              {edit ? "Update" : "Add"}
            </Button>

          </div>
          <div  >
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>User Table</h1>
          </div>
        </form>

        <Grid >
          <Grid >
            <table className="table table-borderless table-stripped" style={{ marginLeft: "30%" }} >
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

                        <EditIcon onClick={() => { editUser(item) }} style={{ fontSize: "45px" }} />
                        {/* <button onClick={() => { editUser(item) }}>edit</button> */}
                        <DeleteIcon onClick={() => { deleteUser(item.id) }} style={{ fontSize: "45px" }} />
                        {/* <button onClick={() => { deleteUser(item.id) }}>delete</button> */}
                        <td> <button
                          //  disabled={item.details?.invite_sent}
                          onClick={() => { invite(item) }}>{!item.details?.invite_sent ? "Invite" : "user Invited "}</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </Grid>
        </Grid>
        <Grid >
        </Grid>
      </div>
    </div>
  )
}

export default UserTable;
