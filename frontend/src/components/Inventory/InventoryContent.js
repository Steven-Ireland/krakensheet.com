import './InventoryContent.scss';

import React, { useReducer } from 'react';
import Character from 'components/Character/Character';
import { PlusOutlined } from '@ant-design/icons';

import { Button, Tag } from 'antd';
import cx from 'classnames';
import { addInventoryItem, addInventorySection, editInventoryItem, editInventorySection } from 'actions/inventoryActions';
import ContentEditable from 'react-contenteditable';
import ItemDetail from 'components/ItemDetail/ItemDetail';
import { useInventory, useInventoryItem } from 'hooks/statistics';
import { useDispatch } from 'react-redux';

const InventoryContent = (props) => {
  const itemViewReducer = (state, action) => {
      switch (action.type) {
        case 'openDetail':
          return {
            ...state,
            showDetail: true,
            itemIndex: action.itemIndex,
            sectionIndex: action.sectionIndex
          };
        case 'closeDetail':
          return {
            ...state,
            showDetail: false
          };
        default: {
          return state;
        }
      }
    }; 

    const dispatch = useDispatch();
    const inventory = useInventory();
    const [localState, localDispatch] = useReducer(itemViewReducer, {itemIndex: 0, sectionIndex: 0});
    const selectedItem = useInventoryItem(localState.sectionIndex, localState.itemIndex);

    const sections = inventory.sections;

    const handleNewItem = (sectionIndex) => {
      console.log(sectionIndex);
      const futureIndex = sections[sectionIndex].contents.length;
      dispatch(addInventoryItem(sectionIndex));
      handleOpenDetail(sectionIndex, futureIndex);
    }

    const handleCloseDetail = () => {
      localDispatch({
        type: 'closeDetail',
      })
    }

    const handleOpenDetail = (sectionIndex, itemIndex) => {
      localDispatch({
        type:'openDetail',
        itemIndex,
        sectionIndex
      });
    }

    const handleSectionRename = (e, idx) => {
      dispatch(editInventorySection(idx, {name: e.target.value}));
    }

    const handleUpdateItem = (sectionIndex, itemIndex) => (value) => {
      dispatch(editInventoryItem(sectionIndex, itemIndex, value));
    }

    return (
      <div className="Inventory">
        <Character noText />

        <ItemDetail isVisible={localState.showDetail} item={selectedItem} onClose={handleCloseDetail} onChange={handleUpdateItem(localState.sectionIndex, localState.itemIndex)} />
        <div className="Inventory-container">
          <div className="Inventory-content">
            <div className="Grid">
              {sections.map(({name, contents}, sectionIndex) => (
                <section className="Inventory-section">
                  <ContentEditable onChange={(e) => handleSectionRename(e, sectionIndex)} html={'' + name}/>
                  <ul>
                    {contents.map((item, itemIndex) => (
                      <li
                        key={item._id}
                        className={cx('Item', { 'is-starred': item.starred })}
                        onClick={() => handleOpenDetail(sectionIndex, itemIndex)}>
                        <div className="Item-container">
                          <p className="Title" dangerouslySetInnerHTML={{__html: item.name}} />

                          {item.tags.map(tag => (
                            <Tag>{tag}</Tag>
                          ))}
                          <div className="Description">
                            <p dangerouslySetInnerHTML={{__html: item.description}} />  
                          </div>
                        </div>
                      </li>
                    ))}
                    <li className="AddMore" onClick={() => handleNewItem(sectionIndex)}>
                      <PlusOutlined /> Add an Item
                    </li>
                  </ul>
                </section>
              ))}
              <section className="Inventory-createSection">
                <Button block ghost type="dashed" onClick={() => dispatch(addInventorySection())}>New Section</Button>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
}

export default InventoryContent;