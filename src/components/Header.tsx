import { shallow } from "zustand/shallow";
import useStore, { Tabs } from "../stores/useStore";

export default function Header() {
  const [selectedTab, setSelectedTab, setIsLoggedIn] = useStore(
    (state) => [state.selectedTab, state.setSelectedTab, state.setIsLoggedIn],
    shallow
  );

  return (
    <header className="header">
      <h1 className="title">Kriptovaluta Árfolyamváltozás Előrejelző</h1>
      <nav className="navbar">
        <div>
          <a href="#home" onClick={() => setSelectedTab(Tabs.home)}>
            Kezdőlap
          </a>
          <a href="#news" onClick={() => setSelectedTab(Tabs.news)}>
            Blogok
          </a>
        </div>
        <button
          className="logout-button"
          onClick={() => {
            setIsLoggedIn(false);
          }}
        >
          Kilépés
        </button>
      </nav>
    </header>
  );
}
