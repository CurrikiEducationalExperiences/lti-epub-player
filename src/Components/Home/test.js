/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";

import { Accordion, Card, Dropdown } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

import { Api } from "../../dummyApi";

import ViewBook from "../ViewBook";
import ViewUnit from "../ViewUnit";
import ViewChapter from "../ViewChapter";

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
      <F data={allData} />
    </div>
  );
};
export default Index;

const F = ({ data }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <Accordion.Toggle variant="link" eventKey={data.name}>
            {data.name}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={data.name}>
          <Card.Body>
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
  );
};
