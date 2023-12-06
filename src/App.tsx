import React from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import useStore, { Tabs } from "./stores/useStore";
import NewsScreen from "./screens/BlogScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  const [isLoggedIn, selectedTab] = useStore((state) => [
    state.isLoggedIn,
    state.selectedTab,
  ]);

  return (
    <div className={`screen blue`}>
      {!isLoggedIn ? (
        <LoginScreen />
      ) : (
        <>
          <Header />
          <div className="content">
            {selectedTab === Tabs.home && <HomeScreen />}
            {selectedTab === Tabs.news && <NewsScreen />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
