import React from "react";

function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {/* children is a special type of prop of MessageBox 
            in the place it has been used.
             example MessageBox is used in homescreen, 
             so what ever you place in the homescreen would 
             appear in props.children*/}
      {props.children}
    </div>
  );
}

export default MessageBox;
