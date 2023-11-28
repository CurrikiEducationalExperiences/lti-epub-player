/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import { Accordion, Card, Dropdown } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'

import Filter from '../../assets/images/filterview.svg'
import ListView from '../../assets/images/listview.svg'
import GridView from '../../assets/images/gridview.svg'
import Book from '../../assets/images/book-img.png'
import ReadBook from '../../assets/images/readbook.png'
import RightArow from '../../assets/images/right-arrow.svg'
import Elipsis from '../../assets/images/elipsis.svg'

import PreviewSm from '../../assets/images/PreviewSmSvg'
import PlusSm from '../../assets/images/PlusSmSvg'

import SearchInputMd from '../../assets/images/SearchInputMdSvg'

import './style.scss'
import './project.scss'

const api = [
  {
    data: [
      {
        img: Book,
        id: '699cded0-889f-11ee-a457-5b6863f723b1',
        title: 'Chapter 1: What Are Medical Ethics?',
        description: 'Chapter 1: What Are Medical Ethics?',
        licenseemail: 'antonioetayo@gmail.com',
        breadcrumb: {
          id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/BreadcrumbList',
          type: 'sdons:BreadcrumbList',
          itemListElement: [
            {
              item: {
                id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ListItem/aetest',
                name: 'aetest',
              },
              unit: [
                {
                  id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ChapterItem/aetest',
                  name: 'unit aetest',
                },
              ],
              chapter: {
                name: 'Chapter aetest',
              },
              type: 'sdons:ListItem',
              position: 0,
            },
            {
              item: {
                id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ListItem/Medical-Ethics-For-Dummies',
                name: 'Medical Ethics For Dummies',
              },
              unit: [
                {
                  id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ChapterItem/aetest',
                  name: 'unit aetest',
                },
              ],
              chapter: {
                name: 'Chapter aetest',
              },
              type: 'sdons:ListItem',
              position: 1,
            },
            {
              item: {
                id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ListItem/Part-I:-Medical-Ethics,-or-Doing-the-Right-Thing',
                name: 'Part I: Medical Ethics, or Doing the Right Thing',
              },
              unit: [
                {
                  id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ChapterItem/aetest',
                  name: 'unit aetest',
                },
              ],
              chapter: {
                name: 'Chapter aetest',
              },
              type: 'sdons:ListItem',
              position: 2,
            },
          ],
        },
        author: {
          id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/author/id/mike@curriki.org',
          url: '',
          name: 'Mike Francis',
          type: 'sdons:Person',
          email: 'mike@curriki.org',
        },
        metadata: {
          id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/metadata/general',
          type: 'sdons:Dataset',
          title: 'Chapter 1: What Are Medical Ethics?',
          keywords: ['Education', 'Curriculum', 'Curriki', 'EPUB'],
          description: 'Chapter 1: What Are Medical Ethics?',
        },
      },
      {
        img: Book,
        id: '699cded0-889f-11ee-a457-5b6863f723b1',
        title: 'Chapter 2: What Are Medical Ethics?',
        description: 'Chapter 2: What Are Medical Ethics?',
        licenseemail: 'antonioetayo@gmail.com',
        breadcrumb: {
          id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/BreadcrumbList',
          type: 'sdons:BreadcrumbList',
          itemListElement: [
            {
              item: {
                id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ListItem/aetest',
                name: 'aetest',
              },
              unit: [
                {
                  id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ChapterItem/aetest',
                  name: 'unit aetest',
                },
              ],
              chapter: {
                name: 'Chapter aetest',
              },
              type: 'sdons:ListItem',
              position: 0,
            },
            {
              item: {
                id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ListItem/Medical-Ethics-For-Dummies',
                name: 'Medical Ethics For Dummies',
              },
              unit: [
                {
                  id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ChapterItem/aetest',
                  name: 'unit aetest',
                },
              ],
              chapter: {
                name: 'Chapter aetest',
              },
              type: 'sdons:ListItem',
              position: 1,
            },
            {
              item: {
                id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ListItem/Part-I:-Medical-Ethics,-or-Doing-the-Right-Thing',
                name: 'Part I: Medical Ethics, or Doing the Right Thing',
              },
              unit: [
                {
                  id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ChapterItem/aetest',
                  name: 'unit aetest',
                },
              ],
              chapter: {
                name: 'Chapter aetest',
              },
              type: 'sdons:ListItem',
              position: 2,
            },
          ],
        },
        author: {
          id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/author/id/mike@curriki.org',
          url: '',
          name: 'Mike Francis',
          type: 'sdons:Person',
          email: 'mike@curriki.org',
        },
        metadata: {
          id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/metadata/general',
          type: 'sdons:Dataset',
          title: 'Chapter 1: What Are Medical Ethics?',
          keywords: ['Education', 'Curriculum', 'Curriki', 'EPUB'],
          description: 'Chapter 1: What Are Medical Ethics?',
        },
      },
      {
        img: Book,
        id: '699cded0-889f-11ee-a457-5b6863f723b1',
        title: 'Chapter 3: What Are Medical Ethics?',
        description: 'Chapter 3: What Are Medical Ethics?',
        licenseemail: 'antonioetayo@gmail.com',
        breadcrumb: {
          id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/BreadcrumbList',
          type: 'sdons:BreadcrumbList',
          itemListElement: [
            {
              item: {
                id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ListItem/aetest',
                name: 'aetest',
              },
              unit: [
                {
                  id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ChapterItem/aetest',
                  name: 'unit aetest',
                },
              ],
              chapter: {
                name: 'Chapter aetest',
              },
              type: 'sdons:ListItem',
              position: 0,
            },
            {
              item: {
                id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ListItem/Medical-Ethics-For-Dummies',
                name: 'Medical Ethics For Dummies',
              },
              type: 'sdons:ListItem',
              position: 1,
            },
            {
              item: {
                id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/ListItem/Part-I:-Medical-Ethics,-or-Doing-the-Right-Thing',
                name: 'Part I: Medical Ethics, or Doing the Right Thing',
              },
              type: 'sdons:ListItem',
              position: 2,
            },
          ],
        },
        author: {
          id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/author/id/mike@curriki.org',
          url: '',
          name: 'Mike Francis',
          type: 'sdons:Person',
          email: 'mike@curriki.org',
        },
        metadata: {
          id: 'c2ens:c2eid-699cded0-889f-11ee-a457-5b6863f723b1/metadata/general',
          type: 'sdons:Dataset',
          title: 'Chapter 1: What Are Medical Ethics?',
          keywords: ['Education', 'Curriculum', 'Curriki', 'EPUB'],
          description: 'Chapter 1: What Are Medical Ethics?',
        },
      },
    ],
    count: {
      count: 3,
    },
    page: 1,
    limit: 10,
  },
]
const Index = () => {
  // search
  const [startSearching, setStartSearching] = useState('')
  console.log('setStartSearching', startSearching)

  // search data
  const [searchContent, setSearchContent] = useState([])

  const apiItem = api[0].data.map((item) => item)
  console.log('apiItem', apiItem)

  const filteredData = apiItem.filter((item) =>
    item.title.toLowerCase().includes(startSearching.toLowerCase()),
  )
  useEffect(() => {
    if (searchContent) {
      setSearchContent(apiItem)
    }
  }, [])

  const handleViewBooksClick = (itemId) => {
    if (itemId) {
      console.log(`View Units clicked for item with ID: ${itemId}`)
    }
  }
  return (
    <div className="content-wrapper content-wrapper-project small-grid">
      <h2 className="resource_heading">Link Resource from External Tool</h2>
      <div
        className="my-project-cards-top-search-filter search-project-filter"
        style={{ margin: !!startSearching ? '0' : '0 0 16px' }}
      >
        <div
          className="search-project-box"
          style={{
            width: !!startSearching ? '100%' : 'auto',
            justifyContent: !!startSearching ? 'space-between' : 'flex-start',
          }}
        >
          <div
            className="search-bar"
            style={{ width: !!startSearching ? '100%' : 'auto' }}
          >
            <input
              style={{ width: !!startSearching ? '100%' : 'auto' }}
              type="text"
              placeholder="Search project"
              value={startSearching}
              onChange={(e) => {
                setStartSearching(e.target.value)
              }}
            />
            <SearchInputMd
              // primaryColor={primaryColor}
              style={{ cursor: 'pointer' }}
            />
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
      </div>
      <div>
        <div className="tab-content">
          {filteredData.length ? (
            <Accordion>
              {filteredData.map((item, i) => (
                <Card key={i}>
                  {/* header card 1 */}
                  <Card.Header>
                    <Accordion.Toggle
                      className="d-flex align-items-center search-project-card-head"
                      variant="link"
                      eventKey={i + 1}
                    >
                      <div className="results_filter">
                        <div className="box">
                          <img className="imgbox" src={item.img} alt="img" />
                          <div className="contentbox">
                            <div className="inner_content">
                              <h3
                                className={
                                  i === 1
                                    ? 'content_heading view_content_heading'
                                    : 'content_heading'
                                }
                              >
                                {item.title}
                              </h3>
                              {/* <p className="cotent-text">{item.collection}</p>
                              <p className="cotent-text">{item.name}</p> */}
                              <div className="content-pdf-box">
                                <p className="cotent-text">
                                  {`${item.metadata.keywords},`}
                                </p>
                              </div>
                              <p className="cotent-text">{item.description}</p>
                              <div className="content-pdf-box">
                                <p className="content-pdf">{'description'}</p>
                                <p className="content-slash"></p>
                                <p className="content-pdf">{'preview'}</p>
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
                                        <PlusSm />
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
                                <button
                                  className="unit-btn"
                                  onClick={() => handleViewBooksClick(item.id)}
                                >
                                  View Books
                                </button>
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
                        {item?.breadcrumb?.itemListElement?.map(
                          (itemList, index) => (
                            <Accordion key={index}>
                              <Card>
                                {/* inner book 1*/}

                                <Card.Header>
                                  <Accordion.Toggle
                                    className="d-flex align-items-center search-project-card-head"
                                    variant="link"
                                    eventKey={index + 1}
                                  >
                                    <ul className="search-playllist-content">
                                      <li className={'active-li'}>
                                        <div className="search-playlist-title">
                                          <img src={ReadBook} alt="image" />
                                          <h3 className="playlist-title">
                                            {itemList.item.name}
                                          </h3>
                                        </div>
                                        <div className="view-btn-box">
                                          <div className="view-unit-box">
                                            <button
                                              className="unit-btn"
                                              onClick={() => itemList.item.id}
                                            >
                                              View Units
                                            </button>
                                            <img src={RightArow} alt="arrow" />
                                          </div>
                                        </div>
                                        <div className="contentbox">
                                          <Dropdown className="playlist-dropdown check show dropdown">
                                            <Dropdown.Toggle>
                                              <img
                                                src={Elipsis}
                                                alt="elipsis"
                                              />
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
                                      </li>
                                    </ul>
                                  </Accordion.Toggle>
                                </Card.Header>
                                {/* inner unit card body */}

                                <Card>
                                  <Accordion.Collapse eventKey={index + 1}>
                                    <Card.Body className="playlist-card inner-card-body">
                                      <Accordion>
                                        <Card>
                                          {/* inner unit 1 */}
                                          {itemList?.unit?.length ? (
                                            <Card.Header>
                                              <Accordion.Toggle
                                                className="d-flex align-items-center search-project-card-head"
                                                variant="link"
                                                eventKey={index + 1}
                                              >
                                                <ul className="search-playllist-content">
                                                  <li className={'active-li'}>
                                                    <div className="search-playlist-title">
                                                      <img
                                                        src={ReadBook}
                                                        alt="image"
                                                      />
                                                      <h3 className="playlist-title playlist-inner-title">
                                                        {
                                                          itemList?.unit[0]
                                                            ?.name
                                                        }
                                                      </h3>
                                                    </div>
                                                    <div className="view-btn-box ch-box">
                                                      <div className="view-unit-box">
                                                        <button
                                                          className="unit-btn"
                                                          onClick={() =>
                                                            itemList?.unit?.id
                                                          }
                                                        >
                                                          View Chapters
                                                        </button>
                                                        <img
                                                          src={RightArow}
                                                          alt="arrow"
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="contentbox">
                                                      <Dropdown className="playlist-dropdown check show dropdown">
                                                        <Dropdown.Toggle>
                                                          <img
                                                            src={Elipsis}
                                                            alt="elipsis"
                                                          />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                          <>
                                                            <Dropdown.Item>
                                                              <div className="dropDown-item-name-icon">
                                                                <PreviewSm />
                                                                <span>
                                                                  Preview
                                                                </span>
                                                              </div>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item>
                                                              <div className="dropDown-item-name-icon">
                                                                <PlusSm />
                                                                <span>
                                                                  Add to LMS
                                                                </span>
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
                                          ) : (
                                            <Alert variant="warning">
                                              No result found !
                                            </Alert>
                                          )}
                                          {/* inner chapter 1 */}

                                          <Accordion.Collapse
                                            eventKey={index + 1}
                                          >
                                            <Card.Body className="playlist-card inner-card-body">
                                              <Accordion>
                                                <Card>
                                                  <Card.Header>
                                                    <Accordion.Toggle
                                                      className="d-flex align-items-center search-project-card-head"
                                                      variant="link"
                                                    >
                                                      <ul className="search-playllist-content">
                                                        <li
                                                          className={
                                                            'active-li'
                                                          }
                                                        >
                                                          <div className="search-playlist-title">
                                                            <img
                                                              src={ReadBook}
                                                              alt="image"
                                                            />
                                                            <h3 className="playlist-title playlist-inner-title">
                                                              {
                                                                itemList
                                                                  ?.chapter
                                                                  ?.name
                                                              }
                                                            </h3>
                                                          </div>
                                                          <div className="contentbox">
                                                            <Dropdown className="playlist-dropdown check show dropdown">
                                                              <Dropdown.Toggle>
                                                                <img
                                                                  src={Elipsis}
                                                                  alt="elipsis"
                                                                />
                                                              </Dropdown.Toggle>
                                                              <Dropdown.Menu>
                                                                <>
                                                                  <Dropdown.Item>
                                                                    <div className="dropDown-item-name-icon">
                                                                      <PreviewSm />
                                                                      <span>
                                                                        Preview
                                                                      </span>
                                                                    </div>
                                                                  </Dropdown.Item>
                                                                  <Dropdown.Item>
                                                                    <div className="dropDown-item-name-icon">
                                                                      <PlusSm />
                                                                      <span>
                                                                        Add to
                                                                        LMS
                                                                      </span>
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
                          ),
                        )}
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
  )
}
export default Index
