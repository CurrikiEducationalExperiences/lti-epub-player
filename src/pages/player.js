import React, { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

import { ReactReader, ReactReaderStyle } from "react-reader";
import JSZip from "jszip";
import { useSearchParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import LeftArrow from "../assets/images/left-arrow.svg";

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

const tokenDummy = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybVVybCI6Imh0dHBzOi8vY2FudmFzLmluc3RydWN0dXJlLmNvbSIsImNsaWVudElkIjoiMjA4ODMwMDAwMDAwMDAwMTM4IiwiZGVwbG95bWVudElkIjoiMTgwOmE1MTJjY2Y0ZGE4NTFlMzA1MjZmYTJlZWEyZjEyN2I1YjA0MmQ1N2QiLCJwbGF0Zm9ybUNvZGUiOiJsdGlhSFIwY0hNNkx5OWpZVzUyWVhNdWFXNXpkSEoxWTNSMWNtVXVZMjl0TWpBNE9ETXdNREF3TURBd01EQXdNVE00TVRnd09tRTFNVEpqWTJZMFpHRTROVEZsTXpBMU1qWm1ZVEpsWldFeVpqRXlOMkkxWWpBME1tUTFOMlElM0QiLCJjb250ZXh0SWQiOiJodHRwcyUzQSUyRiUyRmNhbnZhcy5pbnN0cnVjdHVyZS5jb20yMDg4MzAwMDAwMDAwMDAxMzgxODAlM0FhNTEyY2NmNGRhODUxZTMwNTI2ZmEyZWVhMmYxMjdiNWIwNDJkNTdkYTE2NGM4YTMzYzljZmNjODQxM2I4YjA5ZWQ5N2E3MjU0MDhiMDI2OV9ORiIsInVzZXIiOiJjZmZkZTQ2ZC04NjlmLTQzMmEtODVkNC1jNmFmZDVhZmE5MmIiLCJzIjoiMThmYzY4MDQyMjYzMDQ5NjFmOTE0OTU4ODc0MWUxNGU4YjgyNWQ5N2RkN2U4Y2U0N2EiLCJpYXQiOjE3MDQyMDY3NTl9.iWHL5JTMd1vZTYqZHbq5CT5uZaUw9cH5wPngLLuedY8`;

const Epub = ({ previewId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {});
  const [activeC2E, setActiveC2e] = useState(false);
  const [c2eResource, setC2eResource] = useState(null);
  const [JSlipParser, setJSlipParser] = useState(null);
  const [allFiles, setAllFIles] = useState(null);
  const [epbFile, setEpbFile] = useState(null);
  const [lmsUserInfo, setUserLMS] = useState(null);
  // And your own state logic to persist state
  const [location, setLocation] = useState(null);
  const renditionRef = useRef(null);
  const tocRef = useRef(null);
  console.log(c2eResource);
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
  const preview = searchParams.get("preview");

  useEffect(() => {
    if (param1 || previewId) {
      getC2E(param1 || previewId);
    }
  }, [param1, previewId]);

  const getC2E = async (ceeId) => {
    const userInfo = await fetch(
      process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_INFO_URL,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${param2 || tokenDummy}`,
        },
      }
    );
    const result = await userInfo.json();
    setUserLMS(result);
    fetch(
      `${
        process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_STREAM_URL
      }?ceeId=${ceeId}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${param2 || tokenDummy}`,
        },
      }
    ).then((response) => {
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

            const AllEpubData1 = await ExtractFromFile(
              AllEpubData.file.charAt(0) === "/"
                ? AllEpubData?.file.substr(1, AllEpubData?.file.length - 1)
                : AllEpubData?.file
            );

            const epubData = await AllEpubData1.async("uint8array");
            const resoruces = c2edata?.c2eContainer?.filter(
              (x) => x["@id"] === "c2ens:c2eResources"
            );
            const resoruce =
              Array.isArray(resoruces) && resoruces.length > 0
                ? resoruces[0]?.c2eResources.find((r) =>
                    AllEpubData1.unsafeOriginalName?.includes(r.url)
                  )
                : null;
            console.log(AllEpubData1);
            console.log(c2edata);
            console.log(resoruce);
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
      {preview && (
        <Link
          to={"/"}
          style={{
            display: "flex",
            alignItems: "center",
            color: "#084892",
            gap: "5px",
            height: "25px",
            width: "auto",
            cursor: "pointer",
            justifyContent: "flex-end",
            margin: "20px 30px 10px 0px",
          }}
        >
          <img
            style={{ width: "18px", transform: "rotate(-180deg)" }}
            src={LeftArrow}
            alt="arrow"
          />
          Back
        </Link>
      )}
      <div style={{ display: "flex", gap: "20px", padding: "30px " }}>
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
                  console.log("user lms >>", licensee.email);
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
                        name: licensee.email,
                      },
                      verb: {
                        id: "http://activitystrea.ms/schema/1.0/consume",
                        display: {
                          "en-US": "consumed",
                        },
                      },
                      context: {},
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

                      statement.object.definition.extensions[
                        "https://c2e.curriki.org/xAPI/c2eSPlayerInfo"
                      ] = {
                        playerClient: lmsUserInfo.token.platformInfo,
                        roles: lmsUserInfo.context.roles,
                        playerServiceEndpoint:
                          lmsUserInfo.context.targetLinkUri,
                      };
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
      {activeC2E && (
        <div className="footer-copyright">
          From {activeC2E?.c2eMetadata?.subjectOf?.name},{" "}
          <span onClick={handleShow}>Copyright Notice</span>. Used by permission
          of John Wiley & Sons, Inc.
        </div>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Copyright Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="copyright-data">
            <p class="copyright-text-title">
              Medical Dosage Calculations<sup>®</sup>
            </p>
            <p class="copyright-text">
              Published by
              <br />
              <span class="zcheltbold">Wiley Publishing, Inc.</span>
              <br />
              111 River St.
              <br />
              Hoboken, NJ 07030-5774
              <br />
              <a href="http://www.wiley.com">www.wiley.com</a>
            </p>
            <p class="copyright-text">
              Copyright © 2011 by Wiley Publishing, Inc., Indianapolis, Indiana
            </p>
            <p class="copyright-text">Published simultaneously in Canada</p>
            <p class="copyright-text">
              No part of this publication may be reproduced, stored in a
              retrieval system, or transmitted in any form or by any means,
              electronic, mechanical, photocopying, recording, scanning, or
              otherwise, except as permitted under Sections 107 or 108 of the
              1976 United States Copyright Act, without either the prior written
              permission of the Publisher, or authorization through payment of
              the appropriate per-copy fee to the Copyright Clearance Center,
              222 Rosewood Drive, Danvers, MA 01923, 978-750-8400, fax
              978-646-8600. Requests to the Publisher for permission should be
              addressed to the Permissions Department, John Wiley &amp; Sons,
              Inc., 111 River Street, Hoboken, NJ 07030, (201) 748-6011, fa I
              will not close if you click outside me. Do not even try to press
              escape key.x (201) 748-6008, or online at{" "}
              <a href="http://www.wiley.com/go/permissions">
                http://www.wiley.com/go/permissions
              </a>
              .
            </p>
            <p class="copyright-text">
              <span class="zcheltbold">Trademarks:</span> Wiley, the Wiley
              Publishing logo, For Dummies, the Dummies Man logo, A Reference
              for the Rest of Us!, The Dummies Way, Dummies Daily, The Fun and
              Easy Way, Dummies.com, Making Everything Easier!, and related
              trade dress are trademarks or registered trademarks of John Wiley
              &amp; Sons, Inc. and/or its affiliates in the United States and
              other countries, and may not be used without written permission.
              All other trademarks are the property of their respective owners.
              Wiley Publishing, Inc., is not associated with any product or
              vendor mentioned in this book.
            </p>
            <p class="copyright-disclaimer-box">
              Limit of Liability/Disclaimer of Warranty: The contents of this
              work are intended to further general scientific research,
              understanding, and discussion only and are not intended and should
              not be relied upon as recommending or promoting a specific method,
              diagnosis, or treatment by physicians for any particular patient.
              The publisher and the author make no representations or warranties
              with respect to the accuracy or completeness of the contents of
              this work and specifically disclaim all warranties, including
              without limitation any implied warranties of fitness for a
              particular purpose. In view of ongoing research, equipment
              modifications, changes in governmental regulations, and the
              constant flow of information relating to the use of medicines,
              equipment, and devices, the reader is urged to review and evaluate
              the information provided in the package insert or instructions for
              each medicine, equipment, or device for, among other things, any
              changes in the instructions or indication of usage and for added
              warnings and precautions. Readers should consult with a specialist
              where appropriate. The fact that an organization or Website is
              referred to in this work as a citation and/or a potential source
              of further information does not mean that the author or the
              publisher endorses the information the organization or Website may
              provide or recommendations it may make. Further, readers should be
              aware that Internet Websites listed in this work may have changed
              or disappeared between when this work was written and when it is
              read. No warranty may be created or extended by any promotional
              statements for this work. Neither the publisher nor the author
              shall be liable for any damages arising herefrom.
            </p>
            <p class="copyright-text">
              For general information on our other products and services, please
              contact our Customer Care Department within the U.S. at
              877-762-2974, outside the U.S. at 317-572-3993, or fax
              317-572-4002.
            </p>
            <p class="copyright-text">
              For technical support, please visit{" "}
              <a href="http://www.wiley.com/techsupport">
                www.wiley.com/techsupport
              </a>
              .
            </p>
            <p class="copyright-text">
              Wiley also publishes its books in a variety of electronic formats.
              Some content that appears in print may not be available in
              electronic books.
            </p>
            <p class="copyright-text">
              Library of Congress Control Number: 2011924132
            </p>
            <p class="copyright-text">ISBN: 978-0-470-93064-9</p>
            <p class="copyright-text">
              Manufactured in the United States of America
            </p>
            <p class="copyright-text">10 9 8 7 6 5 4 3 2 1</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Epub;
