import {DetailedStock, TableData, formatDate, fetching, parseParams, Loader} from "./Generals"
import {CardGroup,Card} from "react-bootstrap"
import NumberFormat from 'react-number-format'
import {useEffect} from "react";

const Result = props => {
    let {localData,setStockCode,stockCode,data,setStep,setLoading,setError,endDate,startDate,setHistorical,historical} = props

    const loadDataD = () => {
        // Depending the option of data, it fetch the nasdaq free API or the downloaded and imported database.
        if(localData){
            fetchingDownloaded()
        }else{
            fetchingNasdaq()
        }
    }

    const fetchingNasdaq = () => {
        let apikey='xWrP5zYKM5j9chthcaWe'
        // Gives proper format to a date object
        let sd=formatDate(startDate)
        let ed=formatDate(endDate)
        let url = 'https://data.nasdaq.com/api/v3/datasets/WIKI/'+stockCode+'.json?api_key='+apikey+'&start_date='+sd+'&end_date='+ed
        fetching(url,apikey,setError,setStep,setLoading,setHistorical)
    }

    const fetchingDownloaded = () => {
        // Gives proper format to a date object
        let sd=formatDate(startDate)
        let ed=formatDate(endDate)
        let apikey='gjf94r4gtut546errtyrt8564wleskfwmalsdsfsf6547987'

        let params={
            start_date:sd,
            end_date:ed
        }
        // Parse parameters to pass it on the url on a get method
        params=parseParams(params)
        let url = 'https://vincint.anitacode.com/api/v1/'+apikey+'/'+params+'/historical.json'
        fetching(url,apikey,setError,setStep,setLoading,setHistorical)
    }

    let prevVal=null
    let numberOfDays=0

    const calculate = (accu, actual) => {
        let val
        // Depending of data source, it assign the value to compare.
        localData ? val=actual['close'] : val = actual[4]

        if(prevVal !== null && prevVal < val){
            numberOfDays++
        }else{
            numberOfDays = 0
        }
        prevVal=val
        // If number of days is greater, then the accumulater will update, if not, stays the same.
        return numberOfDays > accu ? numberOfDays : accu
    }

    let dat
    let longest_bullish

    if(historical !== null){
        // Depending the option of data, it will assign the data structure.
        if(localData){
            dat=historical.data
        }else{
            dat=historical.dataset.data
        }
        // Calculate the longest bullish
        longest_bullish = dat.reduce(calculate, 0)
    }
    // First time loaded.
    useEffect(()=>loadDataD(),[])
    return (
        <div>
            <DetailedStock
                stockCode={stockCode}
                data={data}
                setStep={setStep}
                endDate={endDate}
                startDate={startDate}
                setStockCode={setStockCode}
            />
            {historical === null ?
                <Loader/>
                :
                <>
                    <CardGroup className={'mb-4'}>
                        <Card>
                            <Card.Body>
                                <div>
                                    <p>Days with the longest bullish?</p>
                                    <h1 className={'text-primary'}>
                                        <NumberFormat value={longest_bullish} displayType={'text'} thousandSeparator={true} /> day{longest_bullish > 1 ? "s" : ""}
                                    </h1>
                                </div>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                    <TableData data={historical} localData={localData}/>
                </>
            }
        </div>
    )
}

export default Result