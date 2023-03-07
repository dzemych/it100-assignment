import React from 'react'
import WithNavigation from "./layouts/WithNavigation"
import Converter from "./containers/Converter/Converter"


function App() {
   return (
      <WithNavigation>
         <Converter/>
      </WithNavigation>
   )
}

export default App
