import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import { ReactReader } from "react-reader";
import { useSearchParams } from "react-router-dom";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybVVybCI6Imh0dHBzOi8vY2FudmFzLmluc3RydWN0dXJlLmNvbSIsImNsaWVudElkIjoiMjA4ODMwMDAwMDAwMDAwMTM4IiwiZGVwbG95bWVudElkIjoiMTU3OmE1MTJjY2Y0ZGE4NTFlMzA1MjZmYTJlZWEyZjEyN2I1YjA0MmQ1N2QiLCJwbGF0Zm9ybUNvZGUiOiJsdGlhSFIwY0hNNkx5OWpZVzUyWVhNdWFXNXpkSEoxWTNSMWNtVXVZMjl0TWpBNE9ETXdNREF3TURBd01EQXdNVE00TVRVM09tRTFNVEpqWTJZMFpHRTROVEZsTXpBMU1qWm1ZVEpsWldFeVpqRXlOMkkxWWpBME1tUTFOMlElM0QiLCJjb250ZXh0SWQiOiJodHRwcyUzQSUyRiUyRmNhbnZhcy5pbnN0cnVjdHVyZS5jb20yMDg4MzAwMDAwMDAwMDAxMzgxNTclM0FhNTEyY2NmNGRhODUxZTMwNTI2ZmEyZWVhMmYxMjdiNWIwNDJkNTdkYTE2NGM4YTMzYzljZmNjODQxM2I4YjA5ZWQ5N2E3MjU0MDhiMDI2OV8zZWY2MTI1OS0wODAyLTRmMjYtYTEyMC0yYTI0MDg2NDllNTUiLCJ1c2VyIjoiY2ZmZGU0NmQtODY5Zi00MzJhLTg1ZDQtYzZhZmQ1YWZhOTJiIiwicyI6IjMzNjJmZmIzNjVjYmY2NDNmYzljMDg5Y2ZjNGQ1ZmQzNjI5NTBjZjg3Zjg0ZjhhYmI3IiwiaWF0IjoxNzAxNzgyODYxfQ.IdHPAFxTq-BsjMK5DKXbHlYV30EyXRpl3HbiSvRKGc0`;
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json", // Modify content type if needed
};
const Player = () => {
  let [searchParams] = useSearchParams();
  const [location, setLocation] = useState();
  const param1 = searchParams.get("c2eId");

  useEffect(() => {
    if (param1) {
      const url = new URL(
        `https://c2e-player-service.curriki.org/stream?ceeId=${param1}`
      );

      // Constructing the URL with query parameters

      // Making a GET fetch request
      // fetch(url, {
      //   method: "GET", // Change the method if you're using a different HTTP method
      //   headers: headers,
      // })
      //   .then(async (data) => {
      //     const blob = new Blob([data], {
      //       type: "application/octet-stream",
      //     });

      //     const loadzip = await JSZip.loadAsync(blob);

      //     loadzip.forEach(async (relativePath, zipEntry) => {
      //       console.log(zipEntry);
      //     });
      //   })
      //   .then((data) => {
      //     // Handle the fetched data here
      //   })
      //   .catch((error) => {
      //     // Handle errors here
      //     console.error("There was a problem with the fetch request:", error);
      //   });

      fetch(url, {
        method: "GET", // Change the method if you're using a different HTTP method
        headers: headers,
      }).then((response) => {
        response.arrayBuffer().then(async (data) => {
          const blob = new Blob([data], {
            type: "application/octet-stream",
          });

          const loadzip = await JSZip.loadAsync(blob);

          loadzip.forEach(async (relativePath, zipEntry) => {
            console.log(zipEntry);
          });
        });
      });
    }
  }, [param1]);
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
