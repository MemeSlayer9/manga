import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";

function Type() {
  return (
    <>
            <Dropdown> 
<div class="dropdown">
  <button class="dropbtn">Types  <i class="fas fa-angle-down"/></button>
    <div class="dropdown-content">

        <Links to="/rank/1">
                     <span>Rank List</span>
                   </Links>
                   <Links to="/hot/1">
                    <span>Hot Updates</span>
                   </Links>
                    <Links to="/trending/1">
                    <span>Trendinglist</span>
                   </Links>
                   </div>
                   </div>
                   </Dropdown>
    </>
  )
}
const Dropdown = styled.div`
 
.dropdown {
  position: relative;
  display: inline-block;
}
 .dropbtn {
  background-color: #1f1f1f;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* Dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #1f1f1f;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: #fff;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
  color: black;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #404040;
}
`;
const Links = styled(Link)`
   display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #fff;
    text-decoration: none;
      font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    overflow: hidden;
    font-size: 12px;
      margin: 0rem 1.3rem 0 1.3rem;

  
  @media screen and (max-width: 600px) {
    color: white;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;
export default Type