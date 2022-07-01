import './Chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
  {name: "January", Total: 1200 },
  {name: "February", Total: 1400 },
  {name: "March", Total: 1300 },
  {name: "April", Total: 1100 },
  {name: "May", Total: 1350 },
  {name: "June", Total: 1500 },

]

const Chart = ({aspect, chartTitle}) => {
  return (
    <div className="chart">
      <div className="title">{chartTitle}</div>
      <ResponsiveContainer width='100%' aspect={aspect}>
        <AreaChart width={750} height={250} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke='gray' />
          <CartesianGrid strokeDasharray="3 3" stroke='lightgray'/>
          <Tooltip />
          <Area type="monotone" dataKey="Total" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart
