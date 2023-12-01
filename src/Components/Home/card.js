import React from 'react';

export const CollectionCard = ({ item }) => {
  return (
    <div className="results_filter">
      <div className="box">
        {/* <img className="imgbox" src={item.img} alt="img" /> */}
        <div className="contentbox">
          <div className="inner_content">
            <h3 className={'content_heading view_content_heading'}>{item.collectionname}</h3>
            <p className="cotent-text">{item.collection}</p>
            <p className="cotent-text">{item.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
