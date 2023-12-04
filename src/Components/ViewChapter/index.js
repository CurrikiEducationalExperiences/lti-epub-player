import React from 'react'
import { Accordion, Card, Dropdown } from 'react-bootstrap'

import ReadBook from '../../assets/images/readbook.png'
import Elipsis from '../../assets/images/elipsis.svg'

import PreviewSm from '../../assets/images/PreviewSmSvg'
import PlusSm from '../../assets/images/PlusSmSvg'

import '../Home/style.scss'
import '../Home/project.scss'

const ChapterCom = (props) => {
  const { item } = props
  return (
    <>
      {item?.breadcrumb?.itemListElement?.map((itemList, i) => (
        <Card key={i}>
          <Card.Header>
            <Accordion.Toggle
              className="d-flex align-items-center search-project-card-head"
              variant="link"
            >
              <ul className="search-playllist-content">
                <li className={'active-li'}>
                  <div className="search-playlist-title">
                    <img src={ReadBook} alt="image" />
                    <h3 className="playlist-title playlist-inner-title">
                      {itemList.item.name}
                    </h3>
                  </div>
                  <div className="contentbox">
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
                </li>
              </ul>
            </Accordion.Toggle>
          </Card.Header>
        </Card>
      ))}
    </>
  )
}

export default ChapterCom
