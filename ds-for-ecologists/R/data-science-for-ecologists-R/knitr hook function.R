

x <-'<!--html_preserve--><div id="htmlwidget-cd2fc08852f76d5efb3a" style="width:95%;height:480px;" class="leaflet html-widget"></div>
<script type="application/json" data-for="htmlwidget-cd2fc08852f76d5efb3a">{"x":{"options":{"crs":{"crsClass":"L.CRS.EPSG3857","code":null,"proj4def":null,"projectedBounds":null,"options":{}}},"calls":[{"method":"addProviderTiles","args":["OpenStreetMap",null,null,{"errorTileUrl":"","noWrap":false,"detectRetina":false}]}]},"evals":[],"jsHooks":[]}</script><!--/html_preserve-->
'

wrap_leaflet <- function(x){
  js_wrapper <- 
    "import React, { Component } from 'react'
import { Map } from 'react-leaflet'

export default class MyMap extends Component {
  render() {
    const { options } = this.props

    if (typeof window !== 'undefined') {
      return (
        <Map {...options}>
          {map_code_insert}
        </Map>
      )
    }
    return null
  }
}"
  require(stringr)
  is_leaflet_chunk <- 
    str_detect(x, 'class="leaflet')
  
  if(is_leaflet_chunk){
    leaflet_code <- str_extract(x, "\\{.+\\}")
    
    wrapped_code <- str_replace(js_wrapper, pattern = "\\{map_code_insert\\}", replacement = leaflet_code)
    
    }
  
  
  return(wrapped_code)
}

wrap_leaflet(x = x) 


knitr::knit_hooks$set(chunk = wrap_leaflet)
#knitr::knit_hooks$restore() 