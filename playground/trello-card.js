import React from 'react';
import ReactDOM from 'react-dom';
import TrelloCard from 'view/components/TrelloCard';

import cardData from './data/card1.json';

const placeholder = document.querySelector('#app');
const anchor = document.querySelector('a');

class Flow {

  constructor (initialData) {
    this.data = initialData;
  }

  updateData (newData) {
    this.data.isLoading = true;
    this.render();
    window.setTimeout(() => {
      this.data = { ...this.data, ...newData, isLoading: false };
      this.render();
    }, 500);

  }

  render () {
    ReactDOM.render(
      <TrelloCard
        {...this.data}
        refreshCard={(cardID) => this.updateData({}) }
        deleteCard={(cardID) => console.log('delete: ', cardID) }
        onChangeName={(cardID, newName) => this.updateData({name: newName}) }
        onChangeDescription={(cardID, newDescription) => this.updateData({description: newDescription}) }
        onChangeLocation={(cardID, type, newLocation) => this.updateData({ [type]: newLocation }) }
        hasAnotherCard={false}
        fullWidth={false}
        originalAnchor={anchor} ></TrelloCard>,
      placeholder
    );
  }
}

const flow = new Flow(cardData);
flow.render();
