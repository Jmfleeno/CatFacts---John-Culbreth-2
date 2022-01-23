import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import CatItem from '../../components/CatItem/CatItem.js';
import { useCat, useCatUpdate, useSearch, useSearchUpdate } from '../../contexts.js';


function Sidebar() {

  //contexts
  let selected = useCat();
  let select = useCatUpdate();
  let searchValue = useSearch();
  let search = useSearchUpdate();

  //search keystroke handling


  function handleChange(event){
    
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        let value = event.target.value;
        search(value);

    };

  }

  try {
    let cats = JSON.parse(localStorage.getItem("cats"))
    if(cats && Array.isArray(cats)){
      //filter sidebar by search value
      let filteredCats = null;
      if (searchValue === "" || searchValue === undefined) {
        filteredCats = cats;
      }
      else {
        filteredCats = cats.filter(cat => searchValue.toLowerCase().includes(cat.name.toLowerCase()));
      }
      const itemComponents = filteredCats.map((cat, index) => <CatItem {...cat} key={index} />)
      let newCats = filteredCats;
      let cloneCats = [...filteredCats];
      console.log(newCats, cloneCats);
      filteredCats[0].name = "Antonio";
      console.log(newCats, cloneCats);
      
      return (
        <div className="items_wrapper" data-testid="Sidebar">
          {//Search Bar
          }
          <div className="search_wrapper" data-testid="SearchBar">
            <input type="search" className="search_element" onKeyDown={handleChange}  id="search" placeholder="Search Cats by Name"></input>
            <div className="search_element">Hit Enter Key to Search</div>
          </div>
  
          {//Cat Items
          }
          {itemComponents}
        </div>
      )
    } else {
      return "Could not load cats.";
    }

  } catch (error) {
    return "Could not load Sidebar";
  }
}
export default Sidebar;
