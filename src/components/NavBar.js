import React, { useEffect } from 'react'
import {useState} from 'react';
import './NavBar.css'


import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem
  } from 'mdb-react-ui-kit';

const NavBar = () => {
    const [showNavColor, setShowNavColor] = useState(false);

    return(
      <div className="navbar-div">
        <MDBNavbar expand='lg' dark bgColor='success'>
        <MDBContainer fluid>
          <span className='navbar-text project-name-span'> PROJECT NAME </span>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
          </MDBNavbarToggler>


          {/* <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav right className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/basic-details'>Basic Details</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/ghg-emissions'>GHG Emissions</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/contributors'>Contributors</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse> */}

          <MDBCollapse navbar show={false}>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0 navbar-buttons'>
          <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/basic-details'>Basic Details</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/ghg-emissions'>GHG Emissions</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/contributors'>Contributors</MDBNavbarLink>
              </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>




        

        </MDBContainer>
      </MDBNavbar>
      </div>



      )
}

export default NavBar;



