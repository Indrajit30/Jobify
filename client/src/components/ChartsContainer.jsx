import React from 'react'
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

export default function ChartsContainer({data}) {

    const [barChart, setBarChart] = React.useState(true)

  return (
    <Wrapper>
        <h4>Monthly Applications</h4>
        <button type='button' className='' onClick={()=>setBarChart(!barChart)}>
            {barChart? 'Area Chart':'Bar Chart'}
        </button>
        {barChart? <BarChart data={data}/>: <AreaChart data={data}/>}
    </Wrapper>
  )
}
