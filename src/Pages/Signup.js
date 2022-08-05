import "./style/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../components/Navigation";

import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const userId = userCredential.user.uid
      writeUserData(email, password, username,userId);
      updateProfile(userCredential.user, {displayName: username})
      alert("Registrasi berhasil...")
      navigate("/login")
    })

  };

  function writeUserData(email, password, username,userId) {
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
      email: email,
      password: password,
      username: username,
    });
  }
  return (

    <div class="body">
      <Navigation />
      <div class="row">
        <div class="col-lg-6 col-sm-12 m-auto">
          <div class="card p-5">
            <h1 class="mb-5">Sign Up</h1>

            <form onSubmit={handleSubmit} class="row g-3">
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Username</label>

                <div class="col-sm-8">
                  <input type="username" name="username" class="form-control" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </div>

              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label"> Email </label>

                <div class="col-sm-8">
                  <input type="email" name="email" class="form-control" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label"> Password </label>

                <div class="col-sm-8">
                  <input type="password" name="password" class="form-control" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>

              <div class="row">
                <button type="submit" class="btn btn-primary text-right float-end mb-3">
                  Submit
                </button>
              </div>
              <div class="row m-auto">
                <h6>
                  Sudah Punya Akun? <a href="/login">Login Here</a>
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Signup;
