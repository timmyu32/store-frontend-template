import './FeaturedChart.scss'
import { FiMoreVertical } from "react-icons/fi";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { CircularProgressbar } from  'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FeaturedChart = () => {
  return (
    <div className="featuredChart">
        <div className="top">
            <h1 className="title">YTD Revenue (Coming Soon)</h1>
            <FiMoreVertical fontSize='small'/>
        </div>
        <div className="bottom">
            <div className="fc">
              <CircularProgressbar value={70} text={'70%'} strokeWidth={1}/>
            </div>
            <p className="title">Total Sales Today</p>
            <p className="amount">$589</p>
            <p className="description">
              Pending transactions may not be included.
            </p>
            <div className="summary">
              <div className="item">
                <div className="itemTitle">Target</div>
                <div className="itemResult positive">
                  <BiUpArrowAlt fontSize='small'/>
                  <div className="resultAmount">
                    $1.3k
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Week</div>
                <div className="itemResult negative">
                  <BiDownArrowAlt fontSize='small'/>
                  <div className="resultAmount">
                    $5.1k
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Last Month</div>
                <div className="itemResult positive">
                  <BiUpArrowAlt fontSize='small'/>
                  <div className="resultAmount">
                    $12.4k
                  </div>
                </div>
              </div>
            </div>


        </div>
    </div>
  )
}

export default FeaturedChart
