import React, { useEffect, useState, useRef } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import JSZip from "jszip";
import { useSearchParams } from "react-router-dom";

const ownStyles = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: "#fff",
    background: "#084892",
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: "#fff",
    background: "#084892",
  },
};

const Epub = () => {
  useEffect(() => {});

  const [JSlipParser, setJSlipParser] = useState(null);
  const [allFiles, setAllFIles] = useState(null);
  const [epbFile, setEpbFile] = useState(null);

  // And your own state logic to persist state
  const [location, setLocation] = useState(null);
  const renditionRef = useRef(null);
  const tocRef = useRef(null);

  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    if (renditionRef.current && tocRef.current) {
      setLocation(epubcifi);
    }
  };
  // detect id

  let [searchParams] = useSearchParams();
  const param1 = searchParams.get("c2eId");
  const param2 = searchParams.get("ltik");
  useEffect(() => {
    if (param1) {
      getC2E(param1);
    }
  }, [param1]);

  const getC2E = async (ceeId) => {
    fetch(`https://c2e-player-service.curriki.org/stream?ceeId=${ceeId}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${param2}`,
      },
    }).then((response) => {
      response.arrayBuffer().then(async (data) => {
        const blob = new Blob([data], {
          type: "application/octet-stream",
        });
        try {
          const loadzip = await JSZip.loadAsync(blob);

          loadzip.forEach(async (relativePath, zipEntry) => {
            if (zipEntry.name.includes(".html")) {
              setJSlipParser(loadzip);
            } else if (zipEntry.name.includes(".c2e")) {
              const loadzip1 = await JSZip.loadAsync(zipEntry.async("blob"));
              setJSlipParser(loadzip1);
            }
          });
        } catch (e) {
          //    setError(true);
        }
      });
    });
  };

  useEffect(() => {
    if (JSlipParser) {
      const contents = [];

      JSlipParser.forEach((relativePath, zipEntry) => {
        contents.push(zipEntry.name);
      });

      setAllFIles(contents);
    }
  }, [JSlipParser]);

  useEffect(() => {
    (async () => {
      if (allFiles) {
        const result = await returnContentFromUrl("content/contents.json");

        if (result) {
          const AllEpub = result?.c2eContents.filter(
            (data) => data.learningResourceType === "EPUB"
          )?.[0];
          if (AllEpub) {
            const AllEpubData = await returnContentFromUrl(
              AllEpub.url.charAt(0) === "/"
                ? AllEpub?.url.substr(1, AllEpub?.url.length - 1)
                : AllEpub?.url
            );

            console.log(AllEpubData);
            const AllEpubData1 = await ExtractFromFile(
              AllEpubData.file.charAt(0) === "/"
                ? AllEpubData?.file.substr(1, AllEpubData?.file.length - 1)
                : AllEpubData?.file
            );

            console.log(AllEpubData1);
            const epubData = await AllEpubData1.async("uint8array");
            setEpbFile(epubData);
          }
        }
      }
    })();
  }, [allFiles]);

  const returnContentFromUrl = async (url) => {
    for (var i = 0; i < allFiles.length; i++) {
      if (allFiles[i].includes(url)) {
        const contentRead = await JSlipParser.files[allFiles[i]].async("text");

        const data = JSON.parse(contentRead);

        return data;
      }
    }
    return;
  };

  const ExtractFromFile = async (url) => {
    for (var i = 0; i < allFiles.length; i++) {
      if (allFiles[i].includes(url)) {
        const data = await JSlipParser.files[allFiles[i]];

        return data;
      }
    }
    return;
  };

  return (
    <>
      <div style={{ display: "flex", gap: "20px", padding: "30px" }}>
        <div id="reader-container" style={{ height: "100vh", width: "100%" }}>
          <ReactReader
            epubOptions={{
              allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
              flow: "scrolled",
              manager: "continuous",
            }}
            location={location}
            locationChanged={locationChanged}
            tocChanged={(toc) => (tocRef.current = toc)}
            url={epbFile}
            showToc={true}
            readerStyles={ownStyles}
          />
        </div>
      </div>
    </>
  );
};

export default Epub;
