import React from 'react';
import { data } from '../data';
import '../style/sidebar.css'
import logo from "../images/logo_oacademy.svg";
export default function Sidebar() {
    return (
        <>
            <div className="wrapper">
  {/* Sidebar  */}
  <nav id="sidebar">
  <a herf="#" className="logo">
                <img src={logo} className="bl site-icon"/>
            </a>
    <ul className="list-unstyled components">
      <p>Online Academy</p>
      <li className="active">
        <a
          href="#homeSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          className="dropdown-toggle"
        >
          Home
        </a>
        <ul className="collapse list-unstyled" id="homeSubmenu">
          <li>
            <a href="#">Home 1</a>
          </li>
          <li>
            <a href="#">Home 2</a>
          </li>
          <li>
            <a href="#">Home 3</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">About</a>
      </li>
      <li>
        <a
          href="#pageSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          className="dropdown-toggle"
        >
          Pages
        </a>
        <ul className="collapse list-unstyled" id="pageSubmenu">
          <li>
            <a href="#">Page 1</a>
          </li>
          <li>
            <a href="#">Page 2</a>
          </li>
          <li>
            <a href="#">Page 3</a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#">Portfolio</a>
      </li>
      <li>
        <a href="#">Contact</a>
      </li>
    </ul>
    
  </nav>
  {/* Page Content  */}
</div>

        </>
    )
}