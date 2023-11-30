/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";

import { Accordion, Card, Dropdown } from "react-bootstrap";

import { Api } from "../../dummyApi";

import CardImg from "../../assets/images/book-img.png";
import Filter from "../../assets/images/filterview.svg";
import ListView from "../../assets/images/listview.svg";
import GridView from "../../assets/images/gridview.svg";
import RightArow from "../../assets/images/right-arrow.svg";
import Elipsis from "../../assets/images/elipsis.svg";

import PreviewSm from "../../assets/images/PreviewSmSvg";
import PlusSm from "../../assets/images/PlusSmSvg";

import SearchInputMd from "../../assets/images/SearchInputMdSvg";

import "./style.scss";
import "./project.scss";

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

  const filteredData = allData?.children?.filter((item) =>
    item?.name?.toLowerCase()?.includes(startSearching?.toLowerCase()),
  );

  console.log("filteredData", filteredData);
  useEffect(() => {
    const tree = { name: "base node", children: [] };
    const data = Api[0]?.data;

    for (const row of data) {
      let parent = null;
      for (const crumb of row.breadcrumb.itemListElement) {
        let newNode = null;
        const existingNode = findNodeByName(tree, crumb.item.name); // Try to find self in tree
        if (existingNode) {
          newNode = existingNode; // no need to push anything
        } else {
          newNode = { name: crumb.item.name, children: [] };
          if (parent) {
            // If parent exists, push  there
            parent.children.push(newNode);
          } else {
            tree.children.push(newNode); // If no parent, must be top level
          }
        }
        parent = newNode;
      }
      const leaf = { name: row.title, children: [] };
      parent.children.push(leaf); // Finally, insert the leaf node
    }
    console.log("Final Tree: ", tree);
    setAlldata(tree);
  }, []);

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
            <SearchInputMd style={{ cursor: "pointer" }} />
          </div>
          <div className="inner-filter-box">
            <img src={Filter} alt="filter" />
            <p className="filter-text">Filter</p>
          </div>
        </div>
        {!startSearching && (
          <div className="list-grid-box">
            <img src={ListView} alt="filter" />
            <img src={GridView} alt="filter" />
          </div>
        )}
        {startSearching && (
          <div className="search-dropdown-sec">
            <div className="search-dropdown-data">
              <h2 className="resource_heading">searching Data</h2>
              <br />
              <br />
            </div>
          </div>
        )}
      </div>
      <div>
        {/* <div style={{ display: 'flex', gap: '12px' }}>
        <div>
          {allCollection.map((data) => {
            return (
              <div
                onClick={() => {
                  getAllBooks(data)
                }}
              >
                {data.item.name}
              </div>
            )
          })}
        </div>
        <div>
          {allBooks.map((data) => {
            return (
              <div
                onClick={() => {
                  getAllUnits(data)
                }}
              >
                {data.item.name}
              </div>
            )
          })}
        </div>
      </div> */}
        <F data={allData} />
      </div>
    </div>
  );
};
export default Index;

const F = ({ data }) => {
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
                      <div className="content-pdf-box">
                        <p className="cotent-text">{`antonioetayo@gmail.com`}</p>
                      </div>
                      <p className="cotent-text text-start">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Illo accusantium ea tempora voluptatibus est
                        inventore non repellat aperiam cumque, voluptates,
                        provident fugiat perferendis, itaque hic ducimus
                        perspiciatis sapiente ut distinctio.
                      </p>
                      {/* <div className="content-pdf-box">
                        <p className="content-pdf">{"description"}</p>
                        <p className="content-slash"></p>
                        <p className="content-pdf">{"preview"}</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Toggle>
            <div className="contentbox dropdown-contentbox">
              <Dropdown className="playlist-dropdown check show dropdown">
                <Dropdown.Toggle>
                  <img src={Elipsis} alt="elipsis" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <>
                    <Dropdown.Item>
                      <div className="dropDown-item-name-icon">
                        <PreviewSm />
                        <span>Preview</span>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div className="dropDown-item-name-icon">
                        <PlusSm />
                        <span>Add to LMS</span>
                      </div>
                    </Dropdown.Item>
                  </>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey={data?.name}>
            <Card.Body className="playlist-card inner-card-body acc-card-body">
              {data?.children?.map((h) => {
                return (
                  <div>
                    <F data={h} />
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
