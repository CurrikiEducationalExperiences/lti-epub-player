import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PlusSm from '../../assets/images/PlusSmSvg';
import Elipsis from '../../assets/images/elipsis.svg';
import PreviewSm from '../../assets/images/PreviewSmSvg';

import Book from '../../assets/images/book-img.png';
const CollectionDetail = (item) => {
  console.log('deta', item);
  return (
    <div className="results_filter">
      <div className="box">
        <img className="imgbox" src={Book} alt="img" />
        <div className="contentbox">
          <div className="inner_content">
            <h3 className={'content_heading view_content_heading'}>{item?.title}</h3>
            <div className="content-pdf-box">
              <p className="cotent-text">{`${item.metadata?.keywords}`}</p>
            </div>
            <p className="cotent-text">{item?.description}</p>
            <div className="content-pdf-box">
              <p className="content-pdf">{'description'}</p>
              <p className="content-slash"></p>
              <p className="content-pdf">{'preview'}</p>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default CollectionDetail;
