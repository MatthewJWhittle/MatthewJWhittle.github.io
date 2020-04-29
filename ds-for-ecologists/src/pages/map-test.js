import React, { Component } from 'react'
import Layout from "../components/layout"
import ContentRow from "../components/content-link-row"

import { Map } from 'react-leaflet'

export default class MyMap extends Component {
    render() {
      const { options } = this.props
  
      if (typeof window !== 'undefined') {
        return (
          <Map {...options}>
            {{"x":{"options":{"crs":{"crsClass":"L.CRS.EPSG3857","code":null,"proj4def":null,"projectedBounds":null,"options":{}}},"calls":[{"method":"addProviderTiles","args":["OpenStreetMap",null,null,{"errorTileUrl":"","noWrap":false,"detectRetina":false}]}]},"evals":[],"jsHooks":[]}}
          </Map>
        )
      }
      return null
    }
  }