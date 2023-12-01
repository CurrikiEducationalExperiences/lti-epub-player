import React, { useState, useEffect } from 'react';
import { Accordion, Card, Dropdown } from 'react-bootstrap';
// import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import Alert from 'react-bootstrap/Alert';

import Filter from '../../assets/images/filterview.svg';
import ListView from '../../assets/images/listview.svg';
import GridView from '../../assets/images/gridview.svg';
import Book from '../../assets/images/book-img.png';
import ReadBook from '../../assets/images/readbook.png';
import RightArow from '../../assets/images/right-arrow.svg';
import Elipsis from '../../assets/images/elipsis.svg';

import PreviewSm from '../../assets/images/PreviewSmSvg';
import PlusSm from '../../assets/images/PlusSmSvg';
import { CollectionCard } from './card';
import SearchInputMd from '../../assets/images/SearchInputMdSvg';

import './style.scss';
import './project.scss';

const searchCollection = [
  {
    img: Book,
    collectionname: 'Programming Fundamentals',
    collection: 'Collection',
    name: ' Shiaki A. Minami, Shruthi S. Garimella, Priya S. Shah',
    category: ' Biotechnology Journal',
    publishdate: '2 November 2022',
    description: 'Description',
    preview: 'Preview',
  },
  {
    img: Book,
    collectionname: 'Object Oriented Programming',
    collection: 'Collection',
    name: ' Shiaki A. Minami, Shruthi S. Garimella, Priya S. Shah',
    category: ' Biotechnology Journal',
    publishdate: '10 December 2021',
    description: 'Description',
    preview: 'Preview',
  },
  {
    img: Book,
    collectionname: 'Data Structures and Algorithm',
    collection: 'Collection',
    name: ' Shiaki A. Minami, Shruthi S. Garimella, Priya S. Shah',
    category: ' Biotechnology Journal',
    publishdate: '25 October 2023',
    description: 'Description',
    preview: 'Preview',
  },
];

const Index = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredData, setfilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [startSearching, setStartSearching] = useState('');
  // const filteredData = searchCollection.filter((item) => item.collectionname.toLowerCase().includes(startSearching.toLowerCase()));
  useEffect(() => {
    if (searchCollection) {
      setfilteredData(searchCollection);
    }
  }, []);
  return (
    <div className="content-wrapper content-wrapper-project small-grid">
      <h2 className="resource_heading">Link Resource from External Tool</h2>
      <div className="my-project-cards-top-search-filter search-project-filter" style={{ margin: !!startSearching ? '0' : '0 0 16px' }}>
        <div
          className="search-project-box"
          style={{
            width: !!startSearching ? '100%' : 'auto',
            justifyContent: !!startSearching ? 'space-between' : 'flex-start',
          }}
        >
          <div className="search-bar" style={{ width: !!startSearching ? '100%' : 'auto' }}>
            <input
              style={{ width: !!startSearching ? '100%' : 'auto' }}
              type="text"
              placeholder="Search project"
              value={startSearching}
              onChange={(e) => {
                if (!e.target.value.trim()) {
                  setIsOpen(false);
                } else {
                  setIsOpen(true);
                }

                setStartSearching(e.target.value);
              }}
            />
            <SearchInputMd
              // primaryColor={primaryColor}
              style={{ cursor: 'pointer' }}
            />
            {isOpen && (
              <div className="search-option-list">
                {searchCollection.map((item, index) => (
                  <div
                    key={index}
                    className="search-option"
                    onClick={() => {
                      setSelectedOption(item);
                      setIsOpen(false);
                    }}
                  >
                    <CollectionCard item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* <div className="inner-filter-box">
            <img src={Filter} alt="filter" />
            <p className="filter-text">Filter</p>
          </div> */}
        </div>
        {!startSearching && (
          <div className="list-grid-box">
            <img src={ListView} alt="filter" />
            <img src={GridView} alt="filter" />
          </div>
        )}
      </div>
      <div>
        <div className="tab-content">
          {filteredData.length ? (
            <Accordion>
              {filteredData.map((item, i) => (
                <Card key={i}>
                  {/* header card 1 */}
                  <Card.Header>
                    <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link" eventKey={i + 1}>
                      <div className="results_filter">
                        <div className="box">
                          <img className="imgbox" src={item.img} alt="img" />
                          <div className="contentbox">
                            <div className="inner_content">
                              <h3 className={i === 1 ? 'content_heading view_content_heading' : 'content_heading'}>{item.collectionname}</h3>
                              <p className="cotent-text">{item.collection}</p>
                              <p className="cotent-text">{item.name}</p>
                              <p className="content-link">
                                {item.category}
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <span className="">First Published: {item.publishdate}</span>
                              </p>
                              <div className="content-pdf-box">
                                <p className="content-pdf">{item.description}</p>
                                <p className="content-slash"></p>
                                <p className="content-pdf">{item.preview}</p>
                              </div>
                            </div>
                          </div>
                          {filteredData.length > 0 && startSearching ? (
                            <div className="contentbox dropdown-contentbox">
                              <Dropdown className="playlist-dropdown check show dropdown">
                                <Dropdown.Toggle>
                                  <img src={Elipsis} alt="elipsis" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <>
                                    <Dropdown.Item>
                                      {/* <a href={``} target="_blank"> */}
                                      <div className="dropDown-item-name-icon">
                                        <PreviewSm
                                        // primaryColor={primaryColor}
                                        />
                                        <span>Preview</span>
                                      </div>
                                      {/* </a> */}
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                      <div className="dropDown-item-name-icon">
                                        <PlusSm
                                        // primaryColor={primaryColor}
                                        />
                                        <span>Add to LMS</span>
                                      </div>
                                    </Dropdown.Item>
                                  </>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          ) : (
                            <div className="btn-box">
                              <div className="view-unit-box">
                                <button className="unit-btn">View Books</button>
                                <img src={RightArow} alt="arrow" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Accordion.Toggle>
                  </Card.Header>
                  {/* body 1 */}
                  <Card>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body className="playlist-card">
                        <Accordion>
                          <Card>
                            {/* inner book 1*/}
                            <Card.Header>
                              <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link" eventKey="2">
                                <ul className="search-playllist-content">
                                  <li className={'active-li'}>
                                    <div className="search-playlist-title">
                                      <img src={ReadBook} alt="image" />
                                      <h3 className="playlist-title">Book 1: All About Java</h3>
                                    </div>
                                    <div className="view-btn-box">
                                      <div className="view-unit-box">
                                        <button className="unit-btn">View Units</button>
                                        <img src={RightArow} alt="arrow" />
                                      </div>
                                    </div>
                                    <div className="contentbox">
                                      <Dropdown className="playlist-dropdown check show dropdown">
                                        <Dropdown.Toggle>
                                          <img src={Elipsis} alt="elipsis" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <>
                                            <Dropdown.Item>
                                              {/* <a href={``} target="_blank"> */}
                                              <div className="dropDown-item-name-icon">
                                                <PreviewSm
                                                // primaryColor={primaryColor}
                                                />
                                                <span>Preview</span>
                                              </div>
                                              {/* </a> */}
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                              <div className="dropDown-item-name-icon">
                                                <PlusSm
                                                // primaryColor={primaryColor}
                                                />
                                                <span>Add to LMS</span>
                                              </div>
                                            </Dropdown.Item>
                                          </>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </li>
                                </ul>
                              </Accordion.Toggle>
                            </Card.Header>
                            {/* inner book card body */}
                            <Card>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body className="playlist-card inner-card-body">
                                  <Accordion>
                                    <Card>
                                      {/* inner unit 1 */}
                                      <Card.Header>
                                        <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link" eventKey="3">
                                          <ul className="search-playllist-content">
                                            <li className={'active-li'}>
                                              <div className="search-playlist-title">
                                                <img src={ReadBook} alt="image" />
                                                <h3 className="playlist-title playlist-inner-title">Unit 1: What You can do With java</h3>
                                              </div>
                                              <div className="view-btn-box ch-box">
                                                <div className="view-unit-box">
                                                  <button className="unit-btn">View Chapters</button>
                                                  <img src={RightArow} alt="arrow" />
                                                </div>
                                              </div>
                                              <div className="contentbox">
                                                <Dropdown className="playlist-dropdown check show dropdown">
                                                  <Dropdown.Toggle>
                                                    <img src={Elipsis} alt="elipsis" />
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <>
                                                      <Dropdown.Item>
                                                        {/* <a href={``} target="_blank"> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <PreviewSm
                                                          // primaryColor={
                                                          //   primaryColor
                                                          // }
                                                          />
                                                          <span>Preview</span>
                                                        </div>
                                                        {/* </a> */}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <div className="dropDown-item-name-icon">
                                                          <PlusSm
                                                          // primaryColor={
                                                          //   primaryColor
                                                          // }
                                                          />
                                                          <span>Add to LMS</span>
                                                        </div>
                                                      </Dropdown.Item>
                                                    </>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            </li>
                                          </ul>
                                        </Accordion.Toggle>
                                      </Card.Header>
                                      {/* inner chapter 1 */}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link">
                                                  <ul className="search-playllist-content">
                                                    <li className={'active-li'}>
                                                      <div className="search-playlist-title">
                                                        <img src={ReadBook} alt="image" />
                                                        <h3 className="playlist-title playlist-inner-title">Chapter 1: What is Java?</h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <img src={Elipsis} alt="elipsis" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Preview</span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Add to LMS</span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                            {/* inner book card body */}
                            <Card>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body className="playlist-card inner-card-body">
                                  <Accordion>
                                    <Card>
                                      {/* inner unit 2 */}
                                      <Card.Header>
                                        <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link" eventKey="3">
                                          <ul className="search-playllist-content">
                                            <li className={'active-li'}>
                                              <div className="search-playlist-title">
                                                <img src={ReadBook} alt="image" />
                                                <h3 className="playlist-title playlist-inner-title">Unit 2: What You can do With java</h3>
                                                <div className="view-btn-box ch-box">
                                                  <div className="view-unit-box">
                                                    <button className="unit-btn">View Chapters</button>
                                                    <img src={RightArow} alt="arrow" />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="contentbox">
                                                <Dropdown className="playlist-dropdown check show dropdown">
                                                  <Dropdown.Toggle>
                                                    <img src={Elipsis} alt="elipsis" />
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <>
                                                      <Dropdown.Item>
                                                        {/* <a href={``} target="_blank"> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <PreviewSm
                                                          // primaryColor={
                                                          //   primaryColor
                                                          // }
                                                          />
                                                          <span>Preview</span>
                                                        </div>
                                                        {/* </a> */}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <div className="dropDown-item-name-icon">
                                                          <PlusSm
                                                          // primaryColor={
                                                          //   primaryColor
                                                          // }
                                                          />
                                                          <span>Add to LMS</span>
                                                        </div>
                                                      </Dropdown.Item>
                                                    </>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            </li>
                                          </ul>
                                        </Accordion.Toggle>
                                      </Card.Header>
                                      {/* inner chapter 1*/}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link">
                                                  <ul className="search-playllist-content">
                                                    <li className={'active-li'}>
                                                      <div className="search-playlist-title">
                                                        <img src={ReadBook} alt="image" />
                                                        <h3 className="playlist-title playlist-inner-title">Chapter 1: What is Java?</h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <img src={Elipsis} alt="elipsis" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Preview</span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Add to LMS</span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                      {/* chapter 2 */}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link">
                                                  <ul className="search-playllist-content">
                                                    <li className={'active-li'}>
                                                      <div className="search-playlist-title">
                                                        <img src={ReadBook} alt="image" />
                                                        <h3 className="playlist-title playlist-inner-title">Chapter 2: What is Java?</h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <img src={Elipsis} alt="elipsis" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Preview</span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Add to LMS</span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Card>
                        </Accordion>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body className="playlist-card">
                        <Accordion>
                          <Card>
                            {/* inner book 2*/}
                            <Card.Header>
                              <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link" eventKey="2">
                                <ul className="search-playllist-content">
                                  <li className={'active-li'}>
                                    <div className="search-playlist-title">
                                      <img src={ReadBook} alt="image" />
                                      <h3 className="playlist-title">Book 2: All About Java</h3>
                                      <div className="view-btn-box">
                                        <div className="view-unit-box">
                                          <button className="unit-btn">View Units</button>
                                          <img src={RightArow} alt="arrow" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="contentbox">
                                      <Dropdown className="playlist-dropdown check show dropdown">
                                        <Dropdown.Toggle>
                                          <img src={Elipsis} alt="elipsis" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <>
                                            <Dropdown.Item>
                                              {/* <a href={``} target="_blank"> */}
                                              <div className="dropDown-item-name-icon">
                                                <PreviewSm
                                                // primaryColor={primaryColor}
                                                />
                                                <span>Preview</span>
                                              </div>
                                              {/* </a> */}
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                              <div className="dropDown-item-name-icon">
                                                <PlusSm
                                                // primaryColor={primaryColor}
                                                />
                                                <span>Add to LMS</span>
                                              </div>
                                            </Dropdown.Item>
                                          </>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </li>
                                </ul>
                              </Accordion.Toggle>
                            </Card.Header>
                            {/* inner unit 1 */}
                            <Card>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body className="playlist-card inner-card-body">
                                  <Accordion>
                                    <Card>
                                      {/* inner unit card header */}
                                      <Card.Header>
                                        <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link" eventKey="3">
                                          <ul className="search-playllist-content">
                                            <li className={'active-li'}>
                                              <div className="search-playlist-title">
                                                <img src={ReadBook} alt="image" />
                                                <h3 className="playlist-title playlist-inner-title">Unit 1: What You can do With java</h3>
                                                <div className="view-btn-box ch-box">
                                                  <div className="view-unit-box">
                                                    <button className="unit-btn">View Chapters</button>
                                                    <img src={RightArow} alt="arrow" />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="contentbox">
                                                <Dropdown className="playlist-dropdown check show dropdown">
                                                  <Dropdown.Toggle>
                                                    <img src={Elipsis} alt="elipsis" />
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <>
                                                      <Dropdown.Item>
                                                        {/* <a href={``} target="_blank"> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <PreviewSm
                                                          // primaryColor={
                                                          //   primaryColor
                                                          // }
                                                          />
                                                          <span>Preview</span>
                                                        </div>
                                                        {/* </a> */}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <div className="dropDown-item-name-icon">
                                                          <PlusSm
                                                          // primaryColor={
                                                          //   primaryColor
                                                          // }
                                                          />
                                                          <span>Add to LMS</span>
                                                        </div>
                                                      </Dropdown.Item>
                                                    </>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            </li>
                                          </ul>
                                        </Accordion.Toggle>
                                      </Card.Header>
                                      {/* inner chapter card body */}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link">
                                                  <ul className="search-playllist-content">
                                                    <li className={'active-li'}>
                                                      <div className="search-playlist-title">
                                                        <img src={ReadBook} alt="image" />
                                                        <h3 className="playlist-title playlist-inner-title">Chapter 1: What is Java?</h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <img src={Elipsis} alt="elipsis" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Preview</span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Add to LMS</span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                            {/* inner unit 1 */}
                            <Card>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body className="playlist-card inner-card-body">
                                  <Accordion>
                                    <Card>
                                      {/* inner unit card header */}
                                      <Card.Header>
                                        <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link" eventKey="3">
                                          <ul className="search-playllist-content">
                                            <li className={'active-li'}>
                                              <div className="search-playlist-title">
                                                <img src={ReadBook} alt="image" />
                                                <h3 className="playlist-title playlist-inner-title">Unit 2: What You can do With java</h3>
                                                <div className="view-btn-box ch-box">
                                                  <div className="view-unit-box">
                                                    <button className="unit-btn">View Chapters</button>
                                                    <img src={RightArow} alt="arrow" />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="contentbox">
                                                <Dropdown className="playlist-dropdown check show dropdown">
                                                  <Dropdown.Toggle>
                                                    <img src={Elipsis} alt="elipsis" />
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <>
                                                      <Dropdown.Item>
                                                        {/* <a href={``} target="_blank"> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <PreviewSm
                                                          // primaryColor={
                                                          //   primaryColor
                                                          // }
                                                          />
                                                          <span>Preview</span>
                                                        </div>
                                                        {/* </a> */}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <div className="dropDown-item-name-icon">
                                                          <PlusSm
                                                          // primaryColor={
                                                          //   primaryColor
                                                          // }
                                                          />
                                                          <span>Add to LMS</span>
                                                        </div>
                                                      </Dropdown.Item>
                                                    </>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            </li>
                                          </ul>
                                        </Accordion.Toggle>
                                      </Card.Header>
                                      {/* inner chapter card body */}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle className="d-flex align-items-center search-project-card-head" variant="link">
                                                  <ul className="search-playllist-content">
                                                    <li className={'active-li'}>
                                                      <div className="search-playlist-title">
                                                        <img src={ReadBook} alt="image" />
                                                        <h3 className="playlist-title playlist-inner-title">Chapter 2: What is Java?</h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <img src={Elipsis} alt="elipsis" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Preview</span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSm
                                                                  // primaryColor={
                                                                  //   primaryColor
                                                                  // }
                                                                  />
                                                                  <span>Add to LMS</span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Card>
                        </Accordion>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Card>
              ))}
              {filteredData.length > 0 && startSearching && (
                <a href="javascript:void(0)" className="seeMore-link">
                  See more
                </a>
              )}
            </Accordion>
          ) : (
            <Alert variant={'warning'} style={{ margin: '0' }}>
              No collection found
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};
export default Index;
