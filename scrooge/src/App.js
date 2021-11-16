import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {LayoutHome} from './Views/Generals'
import SelectCode from './Views/SelectCode'
import DateRange from './Views/DateRange'
import Result from './Views/Result'
import {Alert} from 'react-bootstrap'

function App() {
    const [stockCode,setStockCode]=useState("AAPL")
    const [error,setError]=useState(null)
    const [step,setStep]=useState('select_code')
    const [data,setData] = useState(null)
    const [historical,setHistorical] = useState(null)
    const [loading,setLoading] = useState(null)
    const [localData,setLocalData] = useState(true)
    const [startDate,setStartDate]=useState(null)
    const [endDate,setEndDate]=useState(null)

    //** steps is a simple view manager that shows one, depending of the step the user is.
    const steps = {
        select_code: <SelectCode setStockCode={setStockCode} stockCode={stockCode} setStep={setStep} setError={setError} localData={localData} setLocalData={setLocalData} loading={loading} setLoading={setLoading} />,
        select_date_range: <DateRange setStockCode={setStockCode} stockCode={stockCode} setStep={setStep} setError={setError} setData={setData} data={data} localData={localData} setLocalData={setLocalData} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}  loading={loading} setLoading={setLoading}/>,
        result: <Result setStockCode={setStockCode} stockCode={stockCode} setStep={setStep} setError={setError} data={data} localData={localData} setLocalData={setLocalData} historical={historical} setHistorical={setHistorical}  setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}  loading={loading} setLoading={setLoading}/>
    }

    return (
        <LayoutHome>
            {error === null
                ?
                    null
                :
                    <Alert variant={'warning'}>{error}</Alert>
            }
            {steps[step]}
        </LayoutHome>
    )
}

export default App
