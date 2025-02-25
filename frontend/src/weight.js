import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeightTracker() {
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [weights, setWeights] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encodedUsername = encodeURIComponent(username);
    await axios.post("http://localhost:8000/weight", {
      username,
      weight,
      date,
    });
    fetchWeights(encodedUsername);
  };

  const fetchWeights = async (encodedUsername) => {
    const response = await axios.get(
      `http://localhost:8000/weights/${encodedUsername}`
    );
    setWeights(response.data);
  };

  const data = {
    labels: weights.map((entry) => entry.date),
    datasets: [
      {
        label: "Weight",
        data: weights.map((entry) => entry.weight),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div>
      <h2>Track Your Weight</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight in lbs"
        />
        <button type="submit">Add Record</button>
      </form>
      <h2>Weight History</h2>
      {weights.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>No data available for the specified user.</p>
      )}
    </div>
  );
}

export default WeightTracker;
