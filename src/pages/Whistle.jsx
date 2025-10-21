import React, { useState } from "react";

const SkatingStart = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [timestamps, setTimestamps] = useState({});

  const playVoice = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1.1;
    utterance.pitch = 1.1;
    utterance.voice =
      speechSynthesis
        .getVoices()
        .find(
          (v) =>
            v.name.toLowerCase().includes("male") ||
            v.name.toLowerCase().includes("referee")
        ) || null;
    speechSynthesis.speak(utterance);
  };

  const playWhistle = () => {
    const whistle = new Audio("/whistle.mp3");
    whistle.volume = 1.0;
    whistle.play().catch((err) => console.log("Whistle playback failed:", err));
  };

  const startSequence = () => {
    setCurrentWord("");
    setTimestamps({});
    document.body.style.background = "linear-gradient(135deg, #000000, #111111)";

    const t1 = Math.random() * 800; // "Get"
    const t2 = t1 + 100 + Math.random() * 1000; // "Steady"
    const t3 = Math.min(t2 + 100 + Math.random() * 1000, 3000); // "Go"

    // "GET"
    setTimeout(() => {
      setCurrentWord("GET");
      setTimestamps((prev) => ({ ...prev, get: (t1 / 1000).toFixed(2) + "s" }));
      document.body.style.background =
        "radial-gradient(circle at center, #1e90ff, #000000)";
      playVoice("Get");
    }, t1);

    // "STEADY"
    setTimeout(() => {
      setCurrentWord("STEADY");
      setTimestamps((prev) => ({
        ...prev,
        steady: (t2 / 1000).toFixed(2) + "s",
      }));
      document.body.style.background =
        "radial-gradient(circle at center, #ffcc00, #000000)";
      playVoice("Steady");
    }, t2);

    // Whistle / "GO"
    setTimeout(() => {
      setCurrentWord("🏁");
      setTimestamps((prev) => ({ ...prev, go: (t3 / 1000).toFixed(2) + "s" }));
      document.body.style.background =
        "radial-gradient(circle at center, #32cd32, #000000)";
      playWhistle();
    }, t3);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#00fff7",
        fontFamily: "'Orbitron', sans-serif",
        transition: "background 0.5s ease",
        padding: "0 20px",
      }}
    >
      {/* Current word display */}
      <div
        style={{
          fontSize: "clamp(4rem, 15vw, 8rem)",
          fontWeight: "900",
          letterSpacing: "2px",
          textShadow:
            "0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7, 0 0 40px #00fff7",
          transition: "all 0.3s ease",
        }}
      >
        {currentWord}
      </div>

      {/* Timestamps */}
      <div
        style={{
          marginTop: "20px",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "#00fff7",
          opacity: 0.8,
        }}
      >
        {timestamps.get && <p>Get at: {timestamps.get}</p>}
        {timestamps.steady && <p>Steady at: {timestamps.steady}</p>}
        {timestamps.go && <p>Whistle at: {timestamps.go}</p>}
      </div>

      {/* Start button */}
      <button
        onClick={startSequence}
        style={{
          marginTop: "40px",
          padding: "18px 40px",
          fontSize: "clamp(1rem, 2vw, 1.3rem)",
          fontWeight: "700",
          borderRadius: "15px",
          border: "none",
          cursor: "pointer",
          color: "#000",
          background: "linear-gradient(135deg, #00fff7, #ff00ff)",
          boxShadow:
            "0 0 10px #00fff7, 0 0 20px #ff00ff, 0 0 30px #00fff7, 0 0 40px #ff00ff",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow =
            "0 0 20px #00fff7, 0 0 40px #ff00ff, 0 0 60px #00fff7, 0 0 80px #ff00ff";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow =
            "0 0 10px #00fff7, 0 0 20px #ff00ff, 0 0 30px #00fff7, 0 0 40px #ff00ff";
        }}
      >
        Start Race
      </button>
    </div>
  );
};

export default SkatingStart;
