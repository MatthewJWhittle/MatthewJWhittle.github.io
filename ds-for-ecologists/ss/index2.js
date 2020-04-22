import React from "react"
import { Link } from "gatsby"
import Navbar from "../src/components/navbar"

export default () => (
  <div style={{ color: `purple` }}>
      <Navbar link1="Link1" link2="Link2" link3="Link3"/>
    <Link to="/contact/">Contact</Link>
    <p>What a world.</p>
    <img src="https://source.unsplash.com/random/400x200" alt="" />
  </div>
)