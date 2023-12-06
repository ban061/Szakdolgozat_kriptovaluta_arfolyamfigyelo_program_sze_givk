import { shallow } from "zustand/shallow";
import useStore from "../stores/useStore";
import { useState } from "react";

export default function LoginScreen() {
  const [setIsLoggedIn] = useStore((state) => [state.setIsLoggedIn], shallow);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  return (
    <div className="login-screen-container">
      {!isRegistering ? (
        <div className="login-container">
          <h3>Belépés</h3>
          <form className="login-form">
            <input type="email" placeholder="Felhasználónév"></input>
            <input type="password" placeholder="Jelszó"></input>
          </form>
          <div className="login-screen-buttons">
            <button
              className="login-button"
              onClick={() => {
                setIsRegistering(true);
              }}
            >
              Regisztráció
            </button>
            <button
              className="login-button"
              onClick={() => {
                setIsLoggedIn(true);
              }}
            >
              Bejelentkezés
            </button>
          </div>
        </div>
      ) : (
        <RegisterForm setIsRegistering={setIsRegistering}></RegisterForm>
      )}
    </div>
  );
}

function RegisterForm({
  setIsRegistering,
}: {
  setIsRegistering: (isRegistering: boolean) => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ email, password, username, phoneNumber });
    if (password === repeatPassword) {
      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, username, phoneNumber }),
        });
        const data = await response.json();
        console.log("Sikeres regisztráció:", data);
        // További teendők a sikeres regisztráció után
      } catch (error) {
        console.error("Hiba a regisztráció során:", error);
      }
    } else {
      alert("Nem egyeznek a jelszavak");
    }
  };

  return (
    <div className="login-container">
      <h3>Regisztráció</h3>
      <form className="login-form">
        <input
          type="text"
          placeholder="Felhasználónév"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email cím"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Jelszó mégegyszer"
          value={repeatPassword}
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Telefonszám"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </form>
      <div className="login-screen-buttons">
        <button
          className="login-button"
          onClick={() => {
            setIsRegistering(false);
          }}
        >
          Vissza
        </button>
        <button
          className="login-button"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Regisztráció
        </button>
      </div>
    </div>
  );
}
