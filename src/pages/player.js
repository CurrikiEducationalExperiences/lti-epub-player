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
const tokenDummy = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybVVybCI6Imh0dHBzOi8vY2FudmFzLmluc3RydWN0dXJlLmNvbSIsImNsaWVudElkIjoiMjA4ODMwMDAwMDAwMDAwMTM4IiwiZGVwbG95bWVudElkIjoiMTU3OmE1MTJjY2Y0ZGE4NTFlMzA1MjZmYTJlZWEyZjEyN2I1YjA0MmQ1N2QiLCJwbGF0Zm9ybUNvZGUiOiJsdGlhSFIwY0hNNkx5OWpZVzUyWVhNdWFXNXpkSEoxWTNSMWNtVXVZMjl0TWpBNE9ETXdNREF3TURBd01EQXdNVE00TVRVM09tRTFNVEpqWTJZMFpHRTROVEZsTXpBMU1qWm1ZVEpsWldFeVpqRXlOMkkxWWpBME1tUTFOMlElM0QiLCJjb250ZXh0SWQiOiJodHRwcyUzQSUyRiUyRmNhbnZhcy5pbnN0cnVjdHVyZS5jb20yMDg4MzAwMDAwMDAwMDAxMzgxNTclM0FhNTEyY2NmNGRhODUxZTMwNTI2ZmEyZWVhMmYxMjdiNWIwNDJkNTdkYTE2NGM4YTMzYzljZmNjODQxM2I4YjA5ZWQ5N2E3MjU0MDhiMDI2OV9ORiIsInVzZXIiOiJjZmZkZTQ2ZC04NjlmLTQzMmEtODVkNC1jNmFmZDVhZmE5MmIiLCJzIjoiMzVkMWFlZTQxNGZkYmYwOTIzODU0Y2Q5ZGUwNWQ2OGM0NzJmY2MwYmQ3ZTM3NjIxODMiLCJpYXQiOjE3MDE4ODMxOTB9.2tTIP6VlLSFxBbtXUB_IjJl2M3YsqqtleFNfl0KccCI`;

const Epub = () => {
  useEffect(() => {});
  const [activeC2E, setActiveC2e] = useState(false);
  const [c2eResource, setC2eResource] = useState(null);
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
        Authorization: `Bearer ${param2 || tokenDummy}`,
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
        const c2edata = await returnContentFromUrl("c2e.json");

        setActiveC2e(c2edata);
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
            const resoruces = c2edata?.c2eContainer?.filter(
              (x) => x["@id"] === "c2ens:c2eResources"
            );
            const resoruce =
              Array.isArray(resoruces) && resoruces.length > 0
                ? resoruces[0]?.c2eResources.find(
                    (r) => r.url === "/" + AllEpubData1.unsafeOriginalName
                  )
                : null;
            setC2eResource(resoruce);

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
            getRendition={(rendition) => {
              renditionRef.current = rendition;
              rendition.hooks.content.register(async function (contents) {
                const scriptEle = contents.document.createElement("script");
                scriptEle.type = "text/javascript";
                scriptEle.async = true;
                scriptEle.src = window.location.origin + "/tincan.js";

                scriptEle.addEventListener("load", (ev) => {
                  const c2eIdSplit = activeC2E["@id"].split(":");
                  const c2eId =
                    Array.isArray(c2eIdSplit) && c2eIdSplit.length > 1
                      ? c2eIdSplit[1]
                      : "NIL";
                  const licensee =
                    activeC2E?.c2eMetadata?.copyright?.license?.licensee;
                  console.log("c2eResource >>", c2eResource);
                  console.log("activeC2E >>", activeC2E);
                  console.log("c2eId >>", c2eId);
                  console.log("licensee >>", licensee);
                  console.log("licensee.name >>", licensee.name);
                  console.log("licensee.email >>", licensee.email);

                  var tincan = new contents.window.TinCan({
                    recordStores: [
                      {
                        endpoint: "https://c2e-player-service.curriki.org/xapi",
                        username: "9491dfe3-fd45-4bb8-b9d5-3480bcddd780",
                        password: "8a290a3a-ff9b-4d5c-a4e9-96550d85b393",
                        allowFail: false,
                        headers: {
                          Authorization: `Bearer ${param2 || tokenDummy}`,
                        },
                      },
                    ],
                  });

                  if ("atStart" in renditionRef.current.location) {
                    var statement = {
                      actor: {
                        mbox: licensee.email,
                        name: licensee.name,
                      },
                      verb: {
                        id: "http://activitystrea.ms/schema/1.0/consume",
                        display: {
                          "en-US": "consumed",
                        },
                      },
                      object: {
                        id: "https://c2e.curriki.org/" + c2eId,
                        definition: {
                          name: {
                            "en-US": activeC2E?.c2eMetadata?.general?.title,
                          },
                          extensions: {},
                        },
                      },
                    };

                    const c2eResourceXapi = {
                      "@id": c2eResource?.["@id"].replace(
                        "c2ens:",
                        "https://c2e.curriki.org/"
                      ),
                      "@type": "https://schema.org/DigitalDocument",
                      "https://schema.org/identifier": {
                        "@type": "https://schema.org/PropertyValue",
                        "https://schema.org/propertyID":
                          c2eResource?.identifier.propertyID,
                        "https://schema.org/value":
                          c2eResource?.identifier.value,
                      },
                      "https://schema.org/fileFormat": c2eResource?.fileFormate,
                      "https://schema.org/url": c2eResource?.url,
                    };
                    statement.object.definition.extensions[
                      "https://c2e.curriki.org/xAPI/c2eResource"
                    ] = c2eResourceXapi;

                    if ("subjectOf" in activeC2E?.c2eMetadata) {
                      const c2eSubjectOfXapi = {
                        ...JSON.parse(
                          JSON.stringify(activeC2E?.c2eMetadata?.subjectOf)
                            .replaceAll("c2ens:", "https://c2e.curriki.org/")
                            .replaceAll("sdons:", "https://schema.org/")
                        ),
                      };
                      statement.object.definition.extensions[
                        "https://c2e.curriki.org/xAPI/c2eSubjectOf"
                      ] = c2eSubjectOfXapi;
                    }

                    tincan.sendStatement(statement);
                  }
                });

                scriptEle.addEventListener("error", (ev) => {
                  console.log({
                    status: false,
                    message: `Failed to load the script ＄{FILE_URL}`,
                  });
                });
                contents.document.body.appendChild(scriptEle);
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Epub;
