import React, { useState, useEffect } from "react";

import { Accordion, Card, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Book from "../../assets/images/book-img.png";
import CardImg from "../../assets/images/book-img.png";

import crossIcon from "../../assets/images/Outline.svg";

import searchIcon from "../../assets/images/search.svg";
import { Link } from "react-router-dom";
import "./style.scss";
import "./project.scss";

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybVVybCI6Imh0dHBzOi8vY2FudmFzLmluc3RydWN0dXJlLmNvbSIsImNsaWVudElkIjoiMjA4ODMwMDAwMDAwMDAwMTM4IiwiZGVwbG95bWVudElkIjoiMTU3OmE1MTJjY2Y0ZGE4NTFlMzA1MjZmYTJlZWEyZjEyN2I1YjA0MmQ1N2QiLCJwbGF0Zm9ybUNvZGUiOiJsdGlhSFIwY0hNNkx5OWpZVzUyWVhNdWFXNXpkSEoxWTNSMWNtVXVZMjl0TWpBNE9ETXdNREF3TURBd01EQXdNVE00TVRVM09tRTFNVEpqWTJZMFpHRTROVEZsTXpBMU1qWm1ZVEpsWldFeVpqRXlOMkkxWWpBME1tUTFOMlElM0QiLCJjb250ZXh0SWQiOiJodHRwcyUzQSUyRiUyRmNhbnZhcy5pbnN0cnVjdHVyZS5jb20yMDg4MzAwMDAwMDAwMDAxMzgxNTclM0FhNTEyY2NmNGRhODUxZTMwNTI2ZmEyZWVhMmYxMjdiNWIwNDJkNTdkYTE2NGM4YTMzYzljZmNjODQxM2I4YjA5ZWQ5N2E3MjU0MDhiMDI2OV8zZWY2MTI1OS0wODAyLTRmMjYtYTEyMC0yYTI0MDg2NDllNTUiLCJ1c2VyIjoiY2ZmZGU0NmQtODY5Zi00MzJhLTg1ZDQtYzZhZmQ1YWZhOTJiIiwicyI6IjMzNjJmZmIzNjVjYmY2NDNmYzljMDg5Y2ZjNGQ1ZmQzNjI5NTBjZjg3Zjg0ZjhhYmI3IiwiaWF0IjoxNzAxNzgyODYxfQ.IdHPAFxTq-BsjMK5DKXbHlYV30EyXRpl3HbiSvRKGc0`;

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
  const [allDataRaw, setAllDataRaw] = useState();
  const [allCollection, setallCollection] = useState([]);
  const [loading, setloading] = useState(false);
  const [showdetail, setshowdetail] = useState("");
  let [searchParams] = useSearchParams();

  const token = searchParams.get("ltik");
  const searchCollection = () => {
    setloading(true);
    const url = new URL("https://c2e-player-service.curriki.org/resources");
    // const params = {
    //   page: 1,
    //   limit: 10,
    //   // query: startSearching || "",
    //   // email: "katyisd@curriki.org",
    //   // secret:
    //   //   "380beb2f50af32dc3890c138122c710314d6ff75eb6d7ee88130ec7de7371a76",
    // };

    // Constructing the URL with query parameters

    // Object.keys(params).forEach((key) =>
    //   url.searchParams.append(key, params[key])
    // );

    // Making a GET fetch request
    fetch(url, {
      method: "GET", // Change the method if you're using a different HTTP method
      headers: {
        Authorization: `Bearer ${token}`,
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
        console.log(data);
        if (startSearching) {
          setallCollection(data?.data);
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
    setAlldata(tree);
  };

  useEffect(() => {
    searchCollection();
  }, [showdetail]);

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
              placeholder="Search project"
              value={startSearching}
              onChange={(e) => {
                setStartSearching(e.target.value);
              }}
            />
            <div
              className="inner-filter-box"
              onClick={() => {
                if (startSearching?.length) {
                  setallCollection([]);
                  searchCollection();
                }
              }}
            >
              <img src={searchIcon} alt="search" />
            </div>
          </div>
        </div>
        {showdetail && (
          <div
            className="list-grid-box"
            onClick={() => {
              setshowdetail("");
            }}
          >
            <span>Close</span>
            <img src={crossIcon} alt="filter" />
          </div>
        )}
        {startSearching && (
          <div className="search-dropdown-sec">
            <div className="search-dropdown-data">
              <div className="text-center">
                {loading && (
                  <Spinner size="sm" animation="border" variant="secondary" />
                )}
                {!loading && allCollection?.length === 0 && (
                  <h3 className="resource_heading">No Result found</h3>
                )}
              </div>
              <div className="results_filter">
                {allCollection?.map((collection, index) => (
                  <div
                    className="box"
                    key={index}
                    onClick={() => {
                      setAlldata([collection]);
                      setStartSearching("");
                      setshowdetail(collection);
                    }}
                  >
                    <img className="imgbox" src={CardImg} alt="img" />
                    <div className="contentbox">
                      <div className="inner_content">
                        <h3 className={"content_heading view_content_heading"}>
                          {collection?.title}
                        </h3>
                        <p className="cotent-text text-start">{`${collection?.description.slice(
                          0,
                          150
                        )}...`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {showdetail?.id ? (
          <div className="results_filter">
            <div className="box">
              <img className="imgbox" src={Book} alt="img" />
              <div className="contentbox" style={{ width: "200%" }}>
                <div className="inner_content">
                  <h3 className={"content_heading view_content_heading"}>
                    {showdetail?.title}
                  </h3>

                  <p className="cotent-text">{showdetail?.description}</p>
                  <div className="content-pdf-box">
                    <p>{"Author Name:"}</p>
                    <p className="content-pdf"> {showdetail?.author?.name}</p>
                    <p>{"Author Email:"}</p>
                    <p className="content-pdf">{showdetail?.author?.email}</p>
                    <p>{"License Email:"}</p>
                    <p className="content-pdf">{showdetail?.licenseemail}</p>
                  </div>
                </div>
              </div>

              <div className="flexer">
                <button>
                  <Link to={`/play?c2eId=${showdetail.id}`}>Preview</Link>
                </button>
                <button
                  onClick={async () => {
                    const getLtik = () => {
                      const searchParams = new URLSearchParams(
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
                        Authorization: "Bearer " + getLtik(),
                      },
                      body: JSON.stringify({
                        id: showdetail.id,
                      }),
                    };

                    fetch("/deeplink", requestOptions)
                      .then((response) => response.text())
                      .then((form) => {
                        document
                          .querySelector("body")
                          .insertAdjacentHTML("beforeend", form);

                        setTimeout(() => {
                          document.getElementById("ltijs_submit").submit();
                        }, [1500]);
                      })
                      .catch((error) => console.error("Error:", error));
                  }}
                >
                  Add to LMS
                </button>
              </div>
            </div>
            <div className="box">
              <div className="contentbox">
                <div className="inner_content mt-3">
                  <h3
                    className={"content_heading view_content_heading"}
                  >{`Meta Title (${showdetail?.metadata?.title})`}</h3>
                  {/* <div className="content-pdf-box">
                    <p className="cotent-text">{`${showdetail.metadata?.keywords}`}</p>
                  </div> */}
                  <p className="cotent-text">
                    {showdetail?.metadata?.description}
                  </p>
                  <div className="content-pdf-box">
                    <p>{"Meta Keyword:"}</p>
                    <p className="content-pdf">
                      {" "}
                      {showdetail?.metadata?.keywords?.toString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {showdetail?.breadcrumb?.itemListElement && (
              <>
                <div className="results_filter ">
                  <h4
                    className={"content_heading view_content_heading mt-3 ml-2"}
                  >
                    {"Item Details:"}
                  </h4>
                  {showdetail?.breadcrumb?.itemListElement?.map(
                    (collection, index) => (
                      <div className="box" key={index}>
                        {/* <img className="imgbox" src={CardImg} alt="img" /> */}
                        <div className="contentbox">
                          <div className="inner_content">
                            <h3
                              className={"content_heading view_content_heading"}
                            >
                              {collection?.item?.name}
                            </h3>
                            <p className="cotent-text text-start">{` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo accusantium ea tempora voluptatibus est`}</p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <F data={allData?.children[0]} allDataRaw={allDataRaw} />
        )}
      </div>
    </div>
  );
};
export default Index;

const F = ({ data, allDataRaw }) => {
  const meta = allDataRaw?.filter((row) => row.title === data.name)?.[0];
  console.log(meta);
  return (
    <div className="tab-content book-accordion">
      <Accordion defaultActiveKey="0" className="book-acc">
        <Card className="book-acc-card">
          <Card.Header className="d-flex align-items-start search-project-card-head acc-card-header">
            <Accordion.Toggle
              variant="link"
              eventKey={data?.name}
              className=" w-full accordion-toggle-header "
            >
              <div className="results_filter">
                <div className="box">
                  <img className="imgbox" src={CardImg} alt="img" />
                  <div className="contentbox">
                    <div className="inner_content">
                      <h3 className={"content_heading view_content_heading"}>
                        {data?.name}
                      </h3>
                      {meta ? (
                        <>
                          <div className="content-pdf-box">
                            <div className="flexer">
                              <p className="cotent-text">
                                <strong>author: </strong>
                                {meta?.author?.name}
                              </p>
                              <p className="cotent-text">
                                <strong>license Email: </strong>
                                {meta?.licenseemail}
                              </p>
                            </div>
                            <div className="flexer">
                              <button>
                                <Link to={`/play?c2eId=${meta.id}`}>
                                  Preview
                                </Link>
                              </button>
                              <button
                                onClick={async () => {
                                  const getLtik = () => {
                                    const searchParams = new URLSearchParams(
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
                                      Authorization: "Bearer " + getLtik(),
                                    },
                                    body: JSON.stringify({
                                      id: meta.id,
                                    }),
                                  };

                                  fetch("/deeplink", requestOptions)
                                    .then((response) => response.text())
                                    .then((form) => {
                                      document
                                        .querySelector("body")
                                        .insertAdjacentHTML("beforeend", form);

                                      setTimeout(() => {
                                        document
                                          .getElementById("ltijs_submit")
                                          .submit();
                                      }, [1500]);
                                    })
                                    .catch((error) =>
                                      console.error("Error:", error)
                                    );
                                }}
                              >
                                Add to LMS
                              </button>
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
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={data?.name}>
            <Card.Body className="playlist-card inner-card-body acc-card-body">
              {data?.children?.map((h) => {
                return (
                  <div>
                    <F data={h} allDataRaw={allDataRaw} />
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
