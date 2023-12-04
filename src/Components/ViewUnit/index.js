import React from 'react'
import { Accordion, Card, Dropdown } from 'react-bootstrap'

import ReadBook from '../../assets/images/readbook.png'
import RightArow from '../../assets/images/right-arrow.svg'
import Elipsis from '../../assets/images/elipsis.svg'

import PreviewSm from '../../assets/images/PreviewSmSvg'
import PlusSm from '../../assets/images/PlusSmSvg'

import '../Home/style.scss'
import '../Home/project.scss'

const UnitCom = (props) => {
  const { index, itemList } = props
  return (
    <Card>
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
                <h3 className="playlist-title playlist-inner-title">
                  {itemList.item.name}
                </h3>
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
  )
}

export default UnitCom
