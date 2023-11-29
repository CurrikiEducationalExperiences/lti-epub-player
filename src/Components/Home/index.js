/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'

import { Accordion, Card, Dropdown } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'

import { Api } from '../../dummyApi'

import ViewBook from '../ViewBook'
import ViewUnit from '../ViewUnit'
import ViewChapter from '../ViewChapter'

import Filter from '../../assets/images/filterview.svg'
import ListView from '../../assets/images/listview.svg'
import GridView from '../../assets/images/gridview.svg'
import RightArow from '../../assets/images/right-arrow.svg'
import Elipsis from '../../assets/images/elipsis.svg'

import PreviewSm from '../../assets/images/PreviewSmSvg'
import PlusSm from '../../assets/images/PlusSmSvg'

import SearchInputMd from '../../assets/images/SearchInputMdSvg'

import './style.scss'
import './project.scss'

const Index = () => {
  // search
  const [startSearching, setStartSearching] = useState('')

  const [allCollection, setAllCollection] = useState([])
  console.log('allCollection', allCollection)

  const [allBooks, setAllBooks] = useState([])
  console.log('allBooks', allBooks)
  // handle buttons
  const [visibleItems, setVisibleItems] = useState(3)

  const handleSeeMoreLess = () => {
    // Toggle the visibility of the "See More" button
    setVisibleItems((prevVisibleItems) => {
      const newVisibleItems = prevVisibleItems + 3

      // If all items are visible, hide the "See More" button
      if (newVisibleItems >= filteredData.length) {
        return filteredData.length
      }
      return newVisibleItems
    })
  }
  // search data
  const [searchContent, setSearchContent] = useState([])

  const apiItem = Api[0].data.map((item) => item)
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
      console.log(`View Books Id: ${itemId}`)
    }
  }
  //
  function removeDuplicateObjects(data) {
    const uniqueIds = new Set()
    const result = []

    data.forEach((item) => {
      const itemId = item.item.id
      if (!uniqueIds.has(itemId)) {
        uniqueIds.add(itemId)
        result.push(item)
      }
    })

    return result
  }
  function createTree(data) {
    const result = data.map((item) => {
      return item.breadcrumb.itemListElement.filter((list) => {
        if (list.position === 0) {
          return list
        }
      })[0]
    })
    setAllCollection(removeDuplicateObjects(result))
    console.log(result)
  }
  function createTree2(data) {
    const result = data.map((item) => {
      return item.breadcrumb.itemListElement.filter((list) => {
        if (list.position === 1) {
          return list
        }
      })[0]
    })
    setAllBooks(removeDuplicateObjects(result))
    console.log(result)
  }
  const getAllBooks = (data) => {
    const result = Api[0].data.filter((item) => {
      return item.breadcrumb.itemListElement.filter((list) => {
        if (list.item.id === data.item.id) {
          console.log('found collection')
          return item.breadcrumb.itemListElement.filter((book) => {
            if (book.position === 0) {
              console.log('book collection', book)
              return book
            }
          })
        }
      })[0]
    })

    console.log('result', result)
  }
  const getAllUnits = (data) => {
    const result = Api[0].data.filter((item) => {
      return item.breadcrumb.itemListElement.filter((list) => {
        if (list.item.id === data.item.id) {
          console.log('found books')
          return item.breadcrumb.itemListElement.filter((book) => {
            if (book.position === 1) {
              console.log('book books', book)
              return book
            }
          })
        }
      })[0]
    })

    console.log('result', result)
  }
  useEffect(() => {
    createTree(Api[0].data)
  }, [])
  useEffect(() => {
    createTree2(Api[0].data)
  }, [])
  //
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
            <SearchInputMd style={{ cursor: 'pointer' }} />
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
        <div style={{ display: 'flex', gap: '12px' }}>
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
        </div>
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
                              <div className="content-pdf-box">
                                <p className="cotent-text">
                                  {`${item.metadata.keywords}`}
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
                          ) : (
                            <div className="btn-box">
                              <div className="view-unit-box">
                                <button
                                  className="unit-btn"
                                  onClick={() => handleViewBooksClick(item.id)}
                                >
                                  {item.id ? 'View Books' : 'Hide books'}
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
                        <Accordion>
                          {item?.breadcrumb?.itemListElement?.map(
                            (itemList, index) => (
                              <Card key={index}>
                                {/* View Book */}
                                <ViewBook index={index} itemList={itemList} />
                                <Card>
                                  <Accordion.Collapse eventKey={index + 1}>
                                    <Card.Body className="playlist-card inner-card-body">
                                      <Accordion>
                                        <Card>
                                          {/* View Unit */}
                                          <ViewUnit
                                            index={index}
                                            itemList={itemList}
                                          />
                                          <Accordion.Collapse
                                            eventKey={index + 1}
                                          >
                                            <Card.Body className="playlist-card inner-card-body">
                                              <Accordion>
                                                {/* View Chapter */}
                                                <ViewChapter item={item} />
                                              </Accordion>
                                            </Card.Body>
                                          </Accordion.Collapse>
                                        </Card>
                                      </Accordion>
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              </Card>
                            ),
                          )}
                        </Accordion>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Card>
              ))}
              {visibleItems > filteredData.length && (
                <button className="seeMore-link" onClick={handleSeeMoreLess}>
                  {visibleItems !== filteredData.length
                    ? 'See more'
                    : 'See Less'}
                </button>
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
