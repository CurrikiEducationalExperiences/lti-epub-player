import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ReactReader } from "react-reader";

const Player = () => {
  // Get the "id" parameter from the URL
  const { id } = useParams();
  const [location, setLocation] = useState();

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <ReactReader
          url="https://react-reader.metabits.no/files/alice.epub"
          location={location}
          locationChanged={(epubcfi) => setLocation(epubcfi)}
        />
      </div>
    </div>
  );
};

export default Player;
