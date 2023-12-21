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

const tokenDummy = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybVVybCI6Imh0dHBzOi8vY2FudmFzLmluc3RydWN0dXJlLmNvbSIsImNsaWVudElkIjoiMjA4ODMwMDAwMDAwMDAwMTM4IiwiZGVwbG95bWVudElkIjoiMTgwOmE1MTJjY2Y0ZGE4NTFlMzA1MjZmYTJlZWEyZjEyN2I1YjA0MmQ1N2QiLCJwbGF0Zm9ybUNvZGUiOiJsdGlhSFIwY0hNNkx5OWpZVzUyWVhNdWFXNXpkSEoxWTNSMWNtVXVZMjl0TWpBNE9ETXdNREF3TURBd01EQXdNVE00TVRnd09tRTFNVEpqWTJZMFpHRTROVEZsTXpBMU1qWm1ZVEpsWldFeVpqRXlOMkkxWWpBME1tUTFOMlElM0QiLCJjb250ZXh0SWQiOiJodHRwcyUzQSUyRiUyRmNhbnZhcy5pbnN0cnVjdHVyZS5jb20yMDg4MzAwMDAwMDAwMDAxMzgxODAlM0FhNTEyY2NmNGRhODUxZTMwNTI2ZmEyZWVhMmYxMjdiNWIwNDJkNTdkYTE2NGM4YTMzYzljZmNjODQxM2I4YjA5ZWQ5N2E3MjU0MDhiMDI2OV9ORiIsInVzZXIiOiJjZmZkZTQ2ZC04NjlmLTQzMmEtODVkNC1jNmFmZDVhZmE5MmIiLCJzIjoiZGQyMTNkOWFlMTJkMDc3Njc3YTgxNzExMTE5MTA2NzU5OWZhYWI4ZDUyNjkxY2MzNTIiLCJpYXQiOjE3MDMwNjg4MzJ9.e-gPVoikgZtsax2gOM2_N5Tzamm1-5TkoDc1jUpjIgk`;

function findNodeByName(root, name) {
  let queue = [root];
  console.log(queue);
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
  const [apiError, setApiError] = useState();
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
        // console.log(response);
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }

        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw data;
        }
        if (startSearching) {
          // getFinalTree();
          // setallCollection(sortSearch(data?.data));
        }
        setAllDataRaw(data?.data);
        getFinalTree(data?.data);
        setloading(false);
      })
      .catch(async (error) => {
        console.log(error);
        setApiError(error);
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
        let result;
        if (crumb.position === 0) {
          result = row.breadcrumb.itemListElement[crumb.position]?.item?.name;
        } else if (crumb.position === 1) {
          result =
            row.breadcrumb.itemListElement[crumb.position]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 1]?.item?.name;
        } else if (crumb.position === 2) {
          result =
            row.breadcrumb.itemListElement[crumb.position]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 1]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 2]?.item?.name;
        } else if (crumb.position === 3) {
          result =
            row.breadcrumb.itemListElement[crumb.position]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 1]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 2]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 3]?.item?.name;
        } else if (crumb.position === 4) {
          result =
            row.breadcrumb.itemListElement[crumb.position]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 1]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 2]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 3]?.item?.name +
            row.breadcrumb.itemListElement[crumb.position - 4]?.item?.name;
        }
        const existingNode = findNodeByName(tree, result); // Try to find self in tree

        if (existingNode) {
          newNode = existingNode; // no need to push anything
        } else {
          newNode = {
            name: result,
            originalName: crumb.item.name,
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
    console.log("Final Tree: ", sortJsonByName(tree));
    setAlldata(sortJsonByName(tree));
  };

  return (
    <div className="content-wrapper content-wrapper-project small-grid">
      <h2 className="resource_heading">Link Resource from External Tool</h2>
      <div
        className="my-project-cards-top-search-filter search-project-filter "
        style={{ margin: "0 0 16px" }}
      >
        <div
          className="search-project-box"
          style={{
            width: !!startSearching ? "100%" : "100%",
            justifyContent: !!startSearching ? "space-between" : "flex-start",
          }}
        >
          <div
            className="search-bar"
            style={{ width: !!startSearching ? "100%" : "100%" }}
          >
            <input
              style={{ width: !!startSearching ? "100%" : "100%" }}
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
                  setApiError("");
                }
              }}
            />
            <div className="inner-filter-box">
              <div
                onClick={() => {
                  if (startSearching?.length) {
                    setallCollection(null);
                    searchCollection();
                    setApiError("");
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
        ) : apiError ? (
          <Alert variant="warning">
            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <div>
                  There is an issue with your C2E Player Configuration. Please
                  contact your LMS Administrator and provide the following
                  information:
                </div>
                <br />
                {apiError?.details?.message && (
                  <strong>{apiError?.details?.message?.toUpperCase()}</strong>
                )}
                {apiError?.details?.description && (
                  <div>{apiError?.details?.description}</div>
                )}
              </div>
              {/* <div
                onClick={() => {
                  setApiError("");
                  searchCollection();
                }}
                style={{ paddingleft: "30px", cursor: "pointer" }}
              >
                X
              </div> */}
            </div>
          </Alert>
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
                        {data?.originalName || data?.name}
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
                                        const url1 = new URL(
                                          process.env.REACT_APP_API_DOMAIN_URL +
                                            process.env.REACT_APP_DEEPLINK_URL
                                        );

                                        fetch(url1, requestOptions)
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
