import { useState } from "react";

const Home = () => {
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
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
