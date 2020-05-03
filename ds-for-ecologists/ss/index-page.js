import React from "react"
import { Link } from "gatsby"
import Navbar from "../src/components/navbar"

export default () => (
  <div style={{ color: `purple` }}>
      <Navbar/>
    <Link to="/contact/">Contact</Link>
    <p>What a world.</p>
  </div>
)