import { CSSTransition } from 'react-transition-group';
import { Nav, Image, Navbar } from '@themesberg/react-bootstrap';
import React from "react";
import SimpleBar from 'simplebar-react';
import Profile3 from "../assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <div className="sidebar-inner px-4">
          <Nav className="flex-column pt-md-0">
            <div className="media d-flex align-items-center">
              <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
              <div className="media-body ms-2 text-dark align-items-center">
                <span className="mb-0 font-small fw-bold text-white">Sumit Singh</span>
              </div>
            </div>
          </Nav>
        </div>
      </Navbar>
      <CSSTransition timeout={300} in={false} classNames="sidebar-transition">
        <SimpleBar className={`collapse  sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <Nav className="flex-column pt-3 pt-md-0">
              <div className="media d-flex align-items-center">
                <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                  <span className="mb-0 font-small fw-bold text-white">Sumit Singh</span>
                </div>
              </div>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
