import React from "react";
import LayoutComponent from "../../layouts/LayoutComponent";
import Games from "../../components/games/Games";
const GamesPage = () => {
  return (
    <LayoutComponent>
      <main className="mx-auto my-6">
        <Games />
      </main>
    </LayoutComponent>
  );
};

export default GamesPage;
