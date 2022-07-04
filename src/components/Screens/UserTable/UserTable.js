// import React, { useState, useEffect } from "react";
// import { db } from "../../../firebase"
// import { setDoc, doc, getDocs, collection, where, query, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
// import { Button, } from "reactstrap";
// import Grid from '@mui/material/Grid';
// import moment from "moment";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AdminSidebar from "../pages/Sidebar/AdminSidebar"
// import PhoneInput from "react-phone-number-input";

// import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { isEmpty, isUndefined } from "lodash"
// import { AlternateEmail } from "@material-ui/icons";
// // import validator from 'validator';

// var CryptoJS = require("crypto-js");

// const UserTable = () => {

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState();
//   const [phone, setPhone] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [loader, setLoader] = useState(false);
//   const [userCollection, setUserCollection] = useState(null);
//   const [edit, setEdit] = useState(false);
//   const [selectedDoc, setSelectedDoc] = useState("")
//   const auth = getAuth();
//   let user;

//   useEffect(() => {
//     try {
//       let userArray = [];
//       const q = query(collection(db, "userList"), where("isDeleted", "==", false), where("role", "==", "user"))
//       const unsub = onSnapshot(q, (querySnapshot) => {
//         let latestuserArr = [];
//         querySnapshot.forEach((doc) => {
//           latestuserArr.push({
//             'id': doc.id,
//             'details': doc.data()
//           });
//           userArray = latestuserArr;
//         });
//         setUserCollection([...userArray])
//       });
//     } catch (error) {
//       console.log("=error in snapshot", error);
//     }
//   }, []);
//   const generateHash = () => {
//     const array = new Uint32Array(8)
//     const arr = window.crypto.getRandomValues(array)
//     const randomArray = [];
//     for (let index = 0; index < arr.length; index++) {
//       randomArray.push(arr[index].toString(36))
//     }
//     return randomArray.join("");
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoader(true);
//     const q = query(collection(db, "userList"), where("phone", "==", phone || "email", "==", email));
//     const querySnapshot = await getDocs(q);
//     const dd = [];
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//       dd.push(doc.data());
//     });

//     if (edit) {
//       if (dd.length > 0) {
//         alert("number or email already register with other user")
//       }
//       else {
//         const docRef = doc(db, 'userList', selectedDoc);
//         await updateDoc(docRef, {
//           name: name,
//           email: email,
//           phone: phone,
//           updated_at: moment.now(),
//         }).then((e) => {
//           setEmail("");
//           setPhone("");
//           setName("");
//           setEdit(false)
//         })
//           .catch((error) =>
//             console.log("error on doc update user list", error)
//           );
//       }
//     }
//     else {
//       const q = query(collection(db, "userList"), where("isDeleted", "==", false), where("phone", "==", phone), where("email", "==", email));
//       const querySnapshot = await getDocs(q);
//       const dd = [];

//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         dd.push(doc.id);
//       });
//       if (dd.length > 0) {
//         alert(" user already user  ")
//       }
//       else {
//         const res = await createUserWithEmailAndPassword(auth, email, generateHash()).then(async (e) => {
//           user = e?.user;
//           console.log("user", user);

//           await setDoc(doc(db, "userList", user.uid), {
//             name: name,
//             email: email,
//             onlineState: false,
//             role: "user",
//             phone: phone,
//             isVerified: false,
//             isDeleted: false,
//             created_at: moment.now(),
//             updated_at: moment.now(),
//             deleted_at: null,
//             invite_sent: false,
//             // ciphertext

//           })
//             .then(async (e) => {
//               console.log("error on doc add ", e)
//               setEmail("");
//               setPhone("");
//               setName("");
//               await setDoc(doc(db, "userProfile", user.uid), {
//                 isProfileSet: false,
//                 Date_of_birth: "",
//                 Father_Name: "",
//                 Mother_Name: "",
//                 Passport_Number: "",
//                 Adhaar_Card: "",
//                 Pan_Card: "",
//                 Driving_License: "",
//                 About: "",
//                 // ciphertext

//               })
//                 .then((e) => {
//                   console.log("error on doc add ", e)


//                 })
//                 .catch((error) =>
//                   console.log("error on doc add user list", error)
//                 );

//             })
//             .catch((error) =>
//               console.log("error on doc add user list", error)
//             );
//         }).catch((error => { }))
//         console.log(phone);
//         updateProfile(auth.currentUser, {
//           phoneNumber: phone,
//         })
//           .then((userRecord) => {
//             // See the UserRecord reference doc for the contents of userRecord.
//             console.log('Successfully updated user', userRecord);
//           })
//           .catch((error) => {
//             console.log('Error updating user:', error);
//           });
//       }
//     }
//   }
//   const invite = async (item) => {
//     console.log("item",)
//     const docRef = doc(db, "userList", item.id);
//     console.log("docRef", docRef)
//     const docSnap = await getDoc(docRef);
//     console.log("docRef", docSnap.data().email)
//     alert("invitation sent to the user")
//     if (docSnap.exists()) {
//       console.log("4tsdynyjdryjnkdtr", docSnap.data().invite_sent)
//       var data = [{ email: item.details.email, phone: item.details.phone }]
//       // Encrypt
//       var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'df1cbr4ytslujn30aokiqz9mvx6ehw25').toString();
//       console.log(ciphertext, "hvnggngngnhghg");
//       if (!docSnap.data()?.invite_sent) {
//         var myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");
//         var requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//           body: JSON.stringify({ encptyData: ciphertext, email: item.details.email }),
//           redirect: 'follow'
//         };
//         fetch("http://localhost:3007/send_mail", requestOptions)
//           .then(response => response.text())
//           .then(async (result) => {
//             await updateDoc(docRef, {
//               invite_sent: true
//             })
//           })
//           .catch(error => console.log('error', error));
//       }
//     }
//     else {
//     }
//   }
//   const deleteUser = async (id) => {
//     alert("Are you sure!");
//     const docRef = doc(db, 'userList', id);
//     await updateDoc(docRef, {
//       isDeleted: true,
//       deleted_at: moment.now(),
//     }).then((e) => {
//       if (userCollection.length === 1) {
//         setUserCollection([])
//       }
//     })
//       .catch((error) =>
//         console.log("error on doc add user list", error)
//       );
//   }
//   const editUser = (item) => {
//     setEmail(item.details.email);
//     setName(item.details.name);
//     setPhone(item.details.phone);
//     setPhone(item.details.password);
//     setPhone(item.details.confirmPassword);
//     setSelectedDoc(item.id)
//     setEdit(true);
//   }
//   const validateLogin = () => {
//     if (!isUndefined(email)) {
//       if (isEmpty(email)) {
//         setEmailError("Email is a required field")
//       }
//       else if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
//         setEmailError("Please enter valid email")
//       } else {
//         setEmailError("")
//       }
//     }
//     // if (!isUndefined(phone)) {
//     //   if (isEmpty(phone)) {
//     //     setPhone("phone is a required field");
//     //   } else if (
//     //     !validator.isStrongPassword(phone, {
//     //       minLength: 10,
//     //       minNumbers: 10,

//     //     })
//     //   ) {
//     //     setPhoneError("Please enter valid phone");
//     //   } else {
//     //     setPhoneError("");
//     //   }
//     // }
//   }
//   useEffect(() => {
//     validateLogin();
//   }, [email, phone]);

//   return (
//     < div style={{ backgroundColor: "white" }}>

//       <div style={{ width: "30%" }}>
//         <AdminSidebar />
//       </div>
//       <div style={{ width: "70%" }}>
//         <form className="form" onSubmit={handleSubmit} style={{ marginLeft: '50%' }}>
//           <h1 style={{ marginTop: "5%" }}>Add User  </h1>
//           <div>
//             <input className="form-control" placeholder="Full Name" name="fullName"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div> <br />
//           <div>
//             {/* <input type="number" className="form-control" placeholder="Mobile" name="mobile"
//               value={phone} onChange={(e) => { setPhone(e.target.value) }}
//             /> */}
//             <PhoneInput
//               defaultCountry="IN"
//               value={phone}
//               onChange={setPhone}
//               placeholder="Enter Phone Number"
//             />
//           </div>
//           <br />
//           <div>
//             <input className="form-control" placeholder="Email" name="email"
//               value={email}
//               // onChange={(e) => setEmail(e.target.value)}
//               onChange={(e) => {
//                 setEmail(e.target.value)
//               }}
//             />
//             <span className="text-danger">{emailError}</span>
//             <br />
//           </div>

//           <div className="form-group">
//             <Button type="submit" className="rounded-pill my-3" color="secondary-blue"
//               style={{ backgroundColor: "blue", color: 'white', borderColor: "blue", padding: " 5px 32px 5px 26px", }}
//               disabled={
//                 isUndefined(email) || isUndefined(phone) || !(isEmpty(emailError) && isEmpty(phoneError))
//               }  >
//               {edit ? "Update" : "Add"}
//             </Button>

//           </div>
//           <div  >
//             <h1 style={{ textAlign: "center", marginTop: "20px" }}>User Table</h1>
//           </div>
//         </form>

//         <Grid >
//           <Grid >
//             <table className="table table-borderless table-stripped" style={{ marginLeft: "30%" }} >
//               <thead className="thead-light">
//                 <tr >
//                   <th>Full Name</th>
//                   <th>Mobile</th>
//                   <th>Email</th>
//                   <th>Actions</th>
//                   <th>Invite</th>
//                 </tr>
//               </thead>
//               <tbody >
//                 {
//                   userCollection?.map((item) => {
//                     return (
//                       <tr>
//                         <td>{item.details.name}</td>
//                         <td>{item.details.phone}</td>
//                         <td>{item.details.email}</td>

//                         <EditIcon onClick={() => { editUser(item) }} style={{ fontSize: "45px" }} />
//                         <DeleteIcon onClick={() => { deleteUser(item.id) }} style={{ fontSize: "45px" }} />

//                         <td> <button
//                           //  disabled={item.details?.invite_sent}
//                           onClick={() => { invite(item) }}>{!item.details?.invite_sent ? "Invite" : "user Invited "}</button></td>
//                       </tr>
//                     )
//                   })
//                 }
//               </tbody>
//             </table>
//           </Grid>
//         </Grid>
//         <Grid >
//         </Grid>
//       </div>
//     </div>
//   )
// }

// export default UserTable;


import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"
import { setDoc, doc, getDocs, collection, where, query, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import { Button, } from "reactstrap";
import Grid from '@mui/material/Grid';
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminSidebar from "../pages/Sidebar/AdminSidebar"
import PhoneInput from "react-phone-number-input";
import { getAuth, createUserWithEmailAndPassword, RecaptchaVerifier, linkWithPhoneNumber } from "firebase/auth";
import { isEmpty, isUndefined } from "lodash"

var CryptoJS = require("crypto-js");

const UserTable = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loader, setLoader] = useState(false);
  const [userCollection, setUserCollection] = useState(null);
  const [edit, setEdit] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("")
  const auth = getAuth();
  let user;

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
  const generateHash = () => {
    const array = new Uint32Array(8)
    const arr = window.crypto.getRandomValues(array)
    const randomArray = [];
    for (let index = 0; index < arr.length; index++) {
      randomArray.push(arr[index].toString(36))
    }
    return randomArray.join("");
  }

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
      const q = query(collection(db, "userList"), where("isDeleted", "==", false), where("phone", "==", phone), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      const dd = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        dd.push(doc.id);
      });
      if (dd.length > 0) {
        alert(" user already user  ")
      }
      else {
        const res = await createUserWithEmailAndPassword(auth, email, generateHash()).then(async (e) => {
          user = e?.user;
          console.log("user", user);
          await setDoc(doc(db, "userList", user.uid), {
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
          })
            .then(async (e) => {
              console.log("error on doc add ", e)
              setEmail("");
              setPhone("");
              setName("");
              await setDoc(doc(db, "userProfile", user.uid), {
                isProfileSet: false,
                Photo_url: "",
                Date_of_birth: "",
                Father_Name: "",
                Mother_Name: "",
                Passport_Number: "",
                Adhaar_Card: "",
                Pan_Card: "",
                Driving_License: "",
                About: "",
                Current_Position: "",
                Company_Name: "",
                Schooling: "",
                Graduation: "",
                Current_Address: "",
                Permanent_Address: "",
                City: "",
                Country: "",
              })
                .then((e) => {
                  console.log("error on doc add ", e)
                })
                .catch((error) =>
                  console.log("error on doc add user list", error)
                );
            })
            .catch((error) =>
              console.log("error on doc add user list", error)
            );
          if (!auth.currentUser.phoneNumber) {
            let phoneNumber = window.prompt('Provide your phone number');
            var appVerifier = new RecaptchaVerifier(
              'recaptcha-container', { size: 'invisible' }, auth);
            return linkWithPhoneNumber(auth.currentUser, phoneNumber, appVerifier)
              .then(function (confirmationResult) {
                // Ask user to provide the SMS code.
                var code = window.prompt('Provide your SMS code');
                // Complete sign-in.
                return confirmationResult.confirm(code);
              }).catch((e) => {
                console.log(e);
              });
          }
        }).catch((error => { }))
      }
    }
  }
  const invite = async (item) => {
    console.log("item",)
    const docRef = doc(db, "userList", item.id);
    console.log("docRef", docRef)
    const docSnap = await getDoc(docRef);
    console.log("docRef", docSnap.data().email)
    alert("invitation sent to the user")
    if (docSnap.exists()) {
      console.log("4tsdynyjdryjnkdtr", docSnap.data().invite_sent)
      var data = [{ email: item.details.email, phone: item.details.phone }]
      // Encrypt
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'df1cbr4ytslujn30aokiqz9mvx6ehw25').toString();
      console.log(ciphertext, "hvnggngngnhghg");
      if (!docSnap.data()?.invite_sent) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({ encptyData: ciphertext, email: item.details.email }),
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
  }
  useEffect(() => {
    validateLogin();
  }, [email, phone]);

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
            <PhoneInput
              defaultCountry="IN"
              value={phone}
              onChange={setPhone}
              placeholder="Enter Phone Number"
            />
          </div>
          <br />
          <div>
            <input className="form-control" placeholder="Email" name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <span className="text-danger">{emailError}</span>
            <br />
          </div>
          <div id="recaptcha-container"></div>
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
                        <DeleteIcon onClick={() => { deleteUser(item.id) }} style={{ fontSize: "45px" }} />
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
