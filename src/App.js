import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Work from "./Pages/Work";
import GameList from "./Pages/GameList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import ProfilePage from "./Pages/ProfilePage";
import Play from "./Pages/Play";
import Game from "./Pages/Game";
import Header from "./Pages/Header";
import firebase from "./services/firebase";
import AdminDashboard from "./Pages/AdminDashboard";
import { getDatabase, ref, child, get, remove, update } from "firebase/database";
import Navigation from "./components/Navigation";
import EditForm from "./Pages/EditForm";
import { UserProvider } from "./contexts/userContext";
import IsUser from "./middlewares/IsUser"
import IsAdmin from "./middlewares/IsAdmin"
import Footer from "./Pages/Footer";

function App() {
  const [playerChoice, setplayerChoice] = useState("");
  const [score, setScore] = useState(0);

  const [playerData, setPlayerData] = useState([]);
  const [del, setDel] = useState(false);


  useEffect(() => {
    fetchUser();
  }, [playerData]);

  const fetchUser = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "users"))
      .then((snapshot) => {
        setPlayerData(snapshot.val());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDelete = (uuid) => {
    const dbRef = ref(getDatabase());
    remove(child(dbRef, `users/${uuid}`));
    setDel(!del);
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "score"))
      .then((snapshot) => {
        setScore(snapshot.val());
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);


  const HandleSubmit = (uuid) => {
    const dbRef = ref(getDatabase());
    update(child(dbRef, `users/${uuid}`), {
      total_score: score
    });
  }

  return (
    <>
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="home/login" element={<Login />} />
            <Route path="work" element={<Work />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="gamelist" element={<GameList />} />
            <Route path="gamelist/game" element={
              <>
                <Game
                  playerChoice={playerChoice}
                  score={score}
                  setScore={setScore} />
                <Footer handleSubmit={HandleSubmit} />
              </>

            } />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={
              <IsUser>
                <ProfilePage />
              </IsUser>
            } />
            <Route path="startgame" element={
              <>
                <Play
                  setplayerChoice={setplayerChoice}
                  score={score}
                  setScore={setScore}
                />
                <Footer handleSubmit={HandleSubmit} />
              </>
            } />
            <Route
              path="game"
              element={
                <>
                  <Game
                    playerChoice={playerChoice}
                    score={score}
                    setScore={setScore}
                  />
                  <Footer handleSubmit={HandleSubmit} />
                </>
              } />
            <Route
              path="admin"
              element={
                <IsAdmin>
                  <>
                    <Navigation />
                    <AdminDashboard
                      data={playerData}
                      onDelete={onDelete} />
                  </>
                </IsAdmin>
              }
            />
            <Route path="edit" element={<EditForm />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
