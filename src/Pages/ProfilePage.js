import React, { useState, useEffect, useContext } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { UserContext } from "../contexts/userContext";
import Card from "../components/UI/Card/Card";

import style from "../Pages/style/ProfilePage.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProfilePage() {
  const { currentUser } = useContext(UserContext);
  const [name, SetName] = useState("Your Name");
  const [email, SetEmail] = useState("Your Email");
  const [score, SetScore] = useState("Your Score");
  const [city, setCity] = useState("");
  const [sosmed, setSosmed] = useState("");
  const [bio, setBio] = useState("");
  const [pp, setPp] = useState("");

  useEffect(() => {
    if (currentUser) fetchUser();
  }, [currentUser]);

  const fetchUser = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/users/${currentUser.uid}`))
      .then((snapshot) => {
        console.log(snapshot.val());
        SetName(snapshot.val().username);
        SetEmail(snapshot.val().email);
        SetScore(snapshot.val().total_score);
        setPp(snapshot.val().photo_profile);
        setCity(snapshot.val().city);
        setSosmed(snapshot.val().sosmed);
        setBio(snapshot.val().bio);
      })
      .catch((error) => {
        console.error(error);
        console.log("gagal");
      });
  };
  const nameEdit = () => {
    console.log("ini edit nama");
  };
  const changePicture = () => {
    console.log("change picture");
  };

  return (
    <Card className={style["profile__card"]}>
      <div className={style.user}>
        <div className={style["user__left"]}>
          <img src={pp} alt="user avatar"></img>
          <i onClick={changePicture} class="bi bi-images"></i>
        </div>
        <div className={style["user__right"]}>
          <h2>{currentUser.displayName}</h2>
          <h3>Score: {score} </h3>
        </div>
      </div>
      <div className={style["user__detail"]}>
        <div className={style.detail}>
          <h2>Username:</h2>
          <h3>{name}</h3>
          <i onClick={nameEdit} class="bi bi-stickies"></i>
        </div>
        <div className={style.detail}>
          <h2>Email:</h2>
          <h3>{email}</h3>
          <i class="bi bi-stickies"></i>
        </div>
        <div className={style.detail}>
          <h2>Password:</h2>
          <h3>********</h3>
          <i class="bi bi-stickies"></i>
        </div>
        <div className={style.detail}>
          <h2>City:</h2>
          <h3>{city}</h3>
          <i class="bi bi-stickies"></i>
        </div>
        <div className={style.detail}>
          <h2>Sosial Media:</h2>
          <h3>{sosmed}</h3>
          <i class="bi bi-stickies"></i>
        </div>
        <div className={style.detail}>
          <h2>Biografi:</h2>
          <h3>{bio}</h3>
          <i class="bi bi-stickies"></i>
        </div>
      </div>
    </Card>
  );
}

export default ProfilePage;
