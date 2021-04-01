import React from "react";
import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

import './SearchBox.css';

function SearchBox(props) {
  const [name, setName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };

  return (
    <form onSubmit={submitHandler} className="search">
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <SearchIcon></SearchIcon>
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
