import { useState, useEffect } from "react";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
const socket = io("ws://localhost:5000");
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [scores, setScores] = useState([]);
  const [seconds, setSeconds] = useState();

  function handleSubmit() {
    if (name && room) {
      setInfo(true);
    }
  }

  useEffect(() => {
    if (name && room) {
      socket.emit("joinRoom", room, name);
    }
  }, [info]);

  useEffect(() => {
    socket.on("message", (message) => {
      toast(`${message} joined`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div>
      <div>quinova</div>
      {!info ? (
        <div>
          <form action={handleSubmit}>
            <input
              type="text"
              placeholder="enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="enter roomId"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button type="submit">click</button>
          </form>
        </div>
      ) : (
        <div>
          <div>remaining time {seconds}</div>
          <div>room id:{room}</div>
          <ToastContainer />
          {question ? (
            <div>
              <div>{question}</div>
              <ul>
                {options.map((option, index) => (
                  <li key={index}>
                    <button>{option}</button>
                  </li>
                ))}
              </ul>
              {scores.map((player, index) => {
                <p>
                  <p key={index}>
                    {player.name}:{player.scores}
                  </p>
                </p>;
              })}
            </div>
          ) : (
            <div>loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
