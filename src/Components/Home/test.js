/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';

import { Accordion, Card, Dropdown, Spinner } from 'react-bootstrap';

import { Api } from '../../dummyApi';
import Book from '../../assets/images/book-img.png';
import CardImg from '../../assets/images/book-img.png';
import Filter from '../../assets/images/filterview.svg';
import ListView from '../../assets/images/listview.svg';
import crossIcon from '../../assets/images/Outline.svg';
import RightArow from '../../assets/images/right-arrow.svg';
import Elipsis from '../../assets/images/elipsis.svg';

import PreviewSm from '../../assets/images/PreviewSmSvg';
import PlusSm from '../../assets/images/PlusSmSvg';
import searchIcon from '../../assets/images/search.svg';
import SearchInputMd from '../../assets/images/SearchInputMdSvg';

import './style.scss';
import './project.scss';

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
  const [startSearching, setStartSearching] = useState('');
  const [allCollection, setallCollection] = useState([]);
  const [loading, setloading] = useState(false);
  const [showdetail, setshowdetail] = useState('');

  const filteredData = allData?.children?.filter((item) => item?.name?.toLowerCase()?.includes(startSearching?.toLowerCase()));

  const searchCollection = () => {
    setloading(true);
    const params = {
      page: 1,
      limit: 10,
      query: startSearching || '',
      email: 'katyisd@curriki.org',
      secret: '380beb2f50af32dc3890c138122c710314d6ff75eb6d7ee88130ec7de7371a76',
    };

    // Constructing the URL with query parameters
    const url = new URL('https://c2e-services.curriki.org/licenses');
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    // Making a GET fetch request
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the fetched data here
        console.log(data);
        if (startSearching) {
          setallCollection(data?.data);
        }

        getFinalTree(data?.data);
        setloading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error('There was a problem with the fetch request:', error);
      });
  };

  console.log('showdetail', showdetail);

  const getFinalTree = (data) => {
    const desc =
      "Chapter 5 covers Svelte's lifecycle events, with emphasis on the `onMount()` method for initiating actions when a component mounts and cleaning up during unmounting, and making asynchronous HTTP requests.";
    // const data = Api[0]?.data;
    console.log('data', data);
    const tree = { name: 'base node', description: data?.description, metaEmail: data?.metadata?.email, children: [] };

    for (const row of data) {
      let parent = null;
      for (const crumb of row.breadcrumb.itemListElement) {
        let newNode = null;
        const existingNode = findNodeByName(tree, crumb.item.name); // Try to find self in tree
        if (existingNode) {
          newNode = existingNode; // no need to push anything
        } else {
          newNode = { name: crumb.item.name, description: desc, children: [] };
          if (parent) {
            // If parent exists, push  there
            parent.children.push(newNode);
          } else {
            tree.children.push(newNode); // If no parent, must be top level
          }
        }
        parent = newNode;
      }
      const leaf = { name: row.title, description: row?.description, children: [] };
      parent.children.push(leaf); // Finally, insert the leaf node
    }
    console.log('Final Tree: ', tree);
    setAlldata(tree);
  };

  useEffect(() => {
    searchCollection();
  }, [showdetail]);

  return (
    <div className="content-wrapper content-wrapper-project small-grid">
      <h2 className="resource_heading">Link Resource from External Tool</h2>
      <div className="my-project-cards-top-search-filter search-project-filter " style={{ margin: !!startSearching ? '0' : '0 0 16px' }}>
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
              setshowdetail('');
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
                {loading && <Spinner size="sm" animation="border" variant="secondary" />}
                {!loading && allCollection?.length === 0 && <h3 className="resource_heading">No Result found</h3>}
              </div>
              <div className="results_filter">
                {allCollection?.map((collection, index) => (
                  <div
                    className="box"
                    key={index}
                    onClick={() => {
                      setAlldata([collection]);
                      setStartSearching('');
                      setshowdetail(collection);
                    }}
                  >
                    <img className="imgbox" src={CardImg} alt="img" />
                    <div className="contentbox">
                      <div className="inner_content">
                        <h3 className={'content_heading view_content_heading'}>{collection?.title}</h3>
                        <p className="cotent-text text-start">{`${collection?.description.slice(0, 150)}...`}</p>
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
        {showdetail?.id ? (
          <div className="results_filter">
            <div className="box">
              <img className="imgbox" src={Book} alt="img" />
              <div className="contentbox" style={{ width: '200%' }}>
                <div className="inner_content">
                  <h3 className={'content_heading view_content_heading'}>{showdetail?.title}</h3>

                  <p className="cotent-text">{showdetail?.description}</p>
                  <div className="content-pdf-box">
                    <p>{'Author Name:'}</p>
                    <p className="content-pdf"> {showdetail?.author?.name}</p>
                    <p>{'Author Email:'}</p>
                    <p className="content-pdf">{showdetail?.author?.email}</p>
                    <p>{'License Email:'}</p>
                    <p className="content-pdf">{showdetail?.licenseemail}</p>
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
            <div className="box">
              <div className="contentbox">
                <div className="inner_content mt-3">
                  <h3 className={'content_heading view_content_heading'}>{`Meta Title (${showdetail?.metadata?.title})`}</h3>
                  {/* <div className="content-pdf-box">
                    <p className="cotent-text">{`${showdetail.metadata?.keywords}`}</p>
                  </div> */}
                  <p className="cotent-text">{showdetail?.metadata?.description}</p>
                  <div className="content-pdf-box">
                    <p>{'Meta Keyword:'}</p>
                    <p className="content-pdf"> {showdetail?.metadata?.keywords?.toString()}</p>
                  </div>
                </div>
              </div>
            </div>
            {showdetail?.breadcrumb?.itemListElement && (
              <>
                <div className="results_filter ">
                  <h4 className={'content_heading view_content_heading mt-3 ml-2'}>{'Item Details:'}</h4>
                  {showdetail?.breadcrumb?.itemListElement?.map((collection, index) => (
                    <div className="box" key={index}>
                      {/* <img className="imgbox" src={CardImg} alt="img" /> */}
                      <div className="contentbox">
                        <div className="inner_content">
                          <h3 className={'content_heading view_content_heading'}>{collection?.item?.name}</h3>
                          <p className="cotent-text text-start">{` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo accusantium ea tempora voluptatibus est`}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <F data={allData} />
        )}
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
            <Accordion.Toggle variant="link" eventKey={data?.name} className=" w-full accordion-toggle-header ">
              <div className="results_filter">
                <div className="box">
                  <img className="imgbox" src={CardImg} alt="img" />
                  <div className="contentbox">
                    <div className="inner_content">
                      <h3 className={'content_heading view_content_heading'}>{data?.name}</h3>
                      <div className="content-pdf-box">
                        <p className="cotent-text">{`${data?.metaEmail || 'antonioetayo@gmail.com'}`}</p>
                      </div>
                      <p className="cotent-text text-start">
                        {data?.description ||
                          '   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo accusantium ea tempora voluptatibus est inventore non repellat aperiam cumque, voluptates, provident fugiat perferendis, itaque hic ducimus perspiciatis sapiente ut distinctio.'}
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
