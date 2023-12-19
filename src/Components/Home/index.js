/* eslint-disable no-script-url */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Accordion, Card, Dropdown, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Player from "../../pages/player";
import Modal from "react-bootstrap/Modal";
import searchIcon from "../../assets/images/search.svg";
import Elipsis from "../../assets/images/elipsis.svg";

import PreviewSm from "../../assets/images/PreviewSmSvg";
import PlusSm from "../../assets/images/PlusSmSvg";
import Arrow from "../../assets/images/arrow.svg";

import "./style.scss";
import "./project.scss";

const tokenDummy = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybVVybCI6Imh0dHBzOi8vY2FudmFzLmluc3RydWN0dXJlLmNvbSIsImNsaWVudElkIjoiMjA4ODMwMDAwMDAwMDAwMTM4IiwiZGVwbG95bWVudElkIjoiMTY0OmE1MTJjY2Y0ZGE4NTFlMzA1MjZmYTJlZWEyZjEyN2I1YjA0MmQ1N2QiLCJwbGF0Zm9ybUNvZGUiOiJsdGlhSFIwY0hNNkx5OWpZVzUyWVhNdWFXNXpkSEoxWTNSMWNtVXVZMjl0TWpBNE9ETXdNREF3TURBd01EQXdNVE00TVRZME9tRTFNVEpqWTJZMFpHRTROVEZsTXpBMU1qWm1ZVEpsWldFeVpqRXlOMkkxWWpBME1tUTFOMlElM0QiLCJjb250ZXh0SWQiOiJodHRwcyUzQSUyRiUyRmNhbnZhcy5pbnN0cnVjdHVyZS5jb20yMDg4MzAwMDAwMDAwMDAxMzgxNjQlM0FhNTEyY2NmNGRhODUxZTMwNTI2ZmEyZWVhMmYxMjdiNWIwNDJkNTdkYTE2NGM4YTMzYzljZmNjODQxM2I4YjA5ZWQ5N2E3MjU0MDhiMDI2OV9ORiIsInVzZXIiOiJjZmZkZTQ2ZC04NjlmLTQzMmEtODVkNC1jNmFmZDVhZmE5MmIiLCJzIjoiNTY4NjRmOTU3NTc3MjBhNzNmMGQ2YjU3NWJiMTQ4MDBjNGVmOTk3OThmYTcxOWE4MjIiLCJpYXQiOjE3MDIzOTk4OTB9.bzzSIxwoNHy0PH-tQ6Yank7ER4796BiFPzpw39JMLBc`;

function findNodeByName(root, name) {
  let queue = [root];

  while (queue.length > 0) {
    let current = queue.shift();

    if (current.name === name) {
      return current;
    }

    if (current.children) {
      for (let i = 0; i < current.children.length; i++) {
        queue.push(current.children[i]);
      }
    }
  }

  return null;
}

const Index = () => {
  const [allData, setAlldata] = useState();
  const [startSearching, setStartSearching] = useState("");
  const [allDataRaw, setAllDataRaw] = useState(null);
  const [allCollection, setallCollection] = useState(null);
  const [loading, setloading] = useState(false);
  const [showdetail, setShowdetail] = useState("");
  const [selectedC2e, setSelectedC2e] = useState();

  let [searchParams] = useSearchParams();

  const token = searchParams.get("ltik");
  const searchCollection = () => {
    setloading(true);
    setAllDataRaw();
    const url = new URL(
      process.env.REACT_APP_API_DOMAIN_URL + process.env.REACT_APP_RESORCES_URL
    );
    const params = {
      page: 1,
      limit: 10,
      query: startSearching || "",
    };

    //Constructing the URL with query parameters

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    // Making a GET fetch request
    fetch(url, {
      method: "GET", // Change the method if you're using a different HTTP method
      headers: {
        Authorization: `Bearer ${token || tokenDummy}`,
        "Content-Type": "application/json", // Modify content type if needed
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the fetched data here

        if (startSearching) {
          // getFinalTree();
          // setallCollection(sortSearch(data?.data));
        }
        setAllDataRaw(data?.data);
        getFinalTree(data?.data);
        setloading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("There was a problem with the fetch request:", error);
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShowdetail(false);

  useEffect(() => {
    console.log(process.env);
    if (!startSearching) {
      searchCollection();
    }
  }, [startSearching]);

  const getFinalTree = (data) => {
    const tree = {
      name: "ere",
      description: data?.description,
      metaEmail: data?.metadata?.email,
      children: [],
    };

    for (const row of data) {
      let parent = null;
      for (const crumb of row.breadcrumb.itemListElement) {
        let newNode = null;
        const existingNode = findNodeByName(tree, crumb.item.name); // Try to find self in tree
        if (existingNode) {
          newNode = existingNode; // no need to push anything
        } else {
          newNode = {
            name: crumb.item.name,

            children: [],
          };
          if (parent) {
            // If parent exists, push  there
            parent.children.push(newNode);
          } else {
            tree.children.push(newNode); // If no parent, must be top level
          }
        }
        parent = newNode;
      }
      const leaf = {
        name: row.title,
        description: row?.description,
        children: [],
      };
      parent.children.push(leaf); // Finally, insert the leaf node
    }
    console.log("Final Tree: ", tree);
    setAlldata(sortJsonByName(tree));
  };

  return (
    <div className="content-wrapper content-wrapper-project small-grid">
      <h2 className="resource_heading">Link Resource from External Tool</h2>
      <div
        className="my-project-cards-top-search-filter search-project-filter "
        style={{ margin: !!startSearching ? "0" : "0 0 16px" }}
      >
        <div
          className="search-project-box"
          style={{
            width: !!startSearching ? "100%" : "auto",
            justifyContent: !!startSearching ? "space-between" : "flex-start",
          }}
        >
          <div
            className="search-bar"
            style={{ width: !!startSearching ? "100%" : "auto" }}
          >
            <input
              style={{ width: !!startSearching ? "100%" : "auto" }}
              type="text"
              placeholder="Search C2E Titles"
              value={startSearching}
              onChange={(e) => {
                setStartSearching(e.target.value);
              }}
              onKeyUp={(e) => {
                if (startSearching?.length && e.key === "Enter") {
                  setallCollection(null);
                  searchCollection();
                }
              }}
            />
            <div className="inner-filter-box">
              <div
                onClick={() => {
                  if (startSearching?.length) {
                    setallCollection(null);
                    searchCollection();
                  }
                }}
              >
                <img src={searchIcon} alt="search" />
              </div>
              {startSearching && (
                <div
                  onClick={() => {
                    setStartSearching("");
                  }}
                >
                  X
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {allDataRaw ? (
          allDataRaw?.length ? (
            allData?.children?.map((coll) => {
              return (
                <F
                  data={coll}
                  allDataRaw={allDataRaw}
                  token={token || tokenDummy}
                  setShowdetail={setShowdetail}
                  showdetail={showdetail}
                  setSelectedC2e={setSelectedC2e}
                />
              );
            })
          ) : (
            <Alert variant="warning">No Result found!</Alert>
          )
        ) : (
          <Alert variant="primary">Fetching Results ...</Alert>
        )}
      </div>
      <Modal
        show={showdetail}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Player previewId={selectedC2e} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Index;

const F = ({
  data,
  allDataRaw,
  token,
  setShowdetail,
  showdetail,
  setSelectedC2e,
}) => {
  const meta = allDataRaw?.filter((row) => row.title === data.name)?.[0];
  const [activeArrow, setactiveArrow] = useState([]);

  return (
    <div className="tab-content book-accordion">
      <Accordion className="book-acc">
        <Card className="book-acc-card">
          <Card.Header className="d-flex align-items-start search-project-card-head acc-card-header">
            <Accordion.Toggle
              variant="link"
              eventKey={data?.name}
              className=" w-full accordion-toggle-header "
              onClick={() => {
                if (activeArrow.includes(data.name)) {
                  setactiveArrow(activeArrow.filter((g) => g !== data?.name));
                } else {
                  setactiveArrow([...activeArrow, data.name]);
                }
              }}
            >
              <div className="results_filter main_accordion_filter">
                <div className="box">
                  {/* <img className="imgbox" src={CardImg} alt="img" /> */}
                  <div className="contentbox">
                    <div className="inner_content">
                      <h3
                        onClick={() => {
                          if (meta?.id) {
                            setSelectedC2e(meta.id);
                            setShowdetail(true);
                          }
                        }}
                        className={"content_heading view_content_heading"}
                      >
                        {data?.name}
                      </h3>
                      {meta ? (
                        <>
                          <div className="content-pdf-box">
                            <div className="flexer chapter_flexer">
                              <p className="cotent-text">
                                <strong className="author_para">
                                  author:&nbsp;
                                </strong>
                                {meta?.author?.name}
                              </p>
                              <p className="cotent-text">
                                <strong className="license_para">
                                  license Email:&nbsp;
                                </strong>
                                {meta?.licenseemail}
                              </p>
                            </div>

                            <div className="contentbox dropdown_contentbox_btns">
                              <Dropdown className="playlist-dropdown check show dropdown">
                                <Dropdown.Toggle>
                                  <img src={Elipsis} alt="elipsis" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <>
                                    <div className="dropDown-item-name-icon dropDown_btn">
                                      <div
                                        onClick={() => {
                                          setSelectedC2e(meta.id);
                                          setShowdetail(true);
                                        }}
                                      >
                                        <PreviewSm />
                                        <span>Preview</span>
                                      </div>
                                    </div>
                                    <button
                                      className="dropDown-item-name-icon dropDown_btn add_btn"
                                      onClick={async () => {
                                        const getLtik = () => {
                                          const searchParams =
                                            new URLSearchParams(
                                              window.location.search
                                            );
                                          const ltik = searchParams.get("ltik");

                                          return ltik;
                                        };

                                        const requestOptions = {
                                          method: "POST",
                                          credentials: "include",
                                          headers: {
                                            "Content-Type": "application/json",
                                            Authorization:
                                              "Bearer " + getLtik(),
                                          },
                                          body: JSON.stringify({
                                            id: meta?.id,
                                            title: meta?.title,
                                          }),
                                        };

                                        fetch("/deeplink", requestOptions)
                                          .then((response) => response.text())
                                          .then((form) => {
                                            document
                                              .querySelector("body")
                                              .insertAdjacentHTML(
                                                "beforeend",
                                                form
                                              );

                                            setTimeout(() => {
                                              document
                                                .getElementById("ltijs_submit")
                                                ?.submit();
                                            }, [1500]);
                                          })
                                          .catch((error) =>
                                            console.error("Error:", error)
                                          );
                                      }}
                                    >
                                      <PlusSm />
                                      <span>Add</span>
                                    </button>
                                  </>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <p
                            className="cotent-text text-start"
                            style={{ textAlign: "left" }}
                          >
                            {meta?.description}
                          </p>
                        </>
                      ) : (
                        <div className="content-pdf-box">
                          <p className="cotent-text">
                            <strong>Collection count: </strong>
                            {data?.children?.length}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {!!data?.children?.length && (
                  <div className="arrow">
                    {activeArrow.includes(data.name) ? (
                      <img className="up_arrow" src={Arrow} alt="arrow" />
                    ) : (
                      <img src={Arrow} alt="arrow" />
                    )}
                  </div>
                )}
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={data?.name}>
            <Card.Body className="playlist-card inner-card-body acc-card-body">
              {data?.children?.map((h) => {
                return (
                  <div>
                    <F
                      data={h}
                      allDataRaw={allDataRaw}
                      token={token}
                      setShowdetail={setShowdetail}
                      showdetail={showdetail}
                      setSelectedC2e={setSelectedC2e}
                    />
                  </div>
                );
              })}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

function sortJsonByName(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sortJsonByName).sort((a, b) => a.name.localeCompare(b.name));
  } else if (typeof obj === "object" && obj !== null) {
    const sortedObj = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sortedObj[key] = sortJsonByName(obj[key]);
      });
    return sortedObj;
  }

  return obj;
}

function sortSearch(obj) {
  return obj.sort((a, b) => a.title.localeCompare(b.title));
}
