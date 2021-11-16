import {useEffect} from "react";
import {Loader, DetailedStock, fetching, parseParams} from "./Generals"
import {Button,Card} from "react-bootstrap"
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRanged = (props) => {
    let {stockCode,setStep, setError, data, setData, setLoading, localData, setStockCode, startDate, endDate, setStartDate, setEndDate, loading} = props
    let dataVal

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    const fetchingNasdaq = () => {
        // Fetch the data from the nasdaq free API.
        let apikey='xWrP5zYKM5j9chthcaWe'
        let url = 'https://data.nasdaq.com/api/v3/datasets/WIKI/'+stockCode+'.json?api_key='+apikey
        fetching(url,apikey,setError,setStep,setLoading,setData)
    }

    const fetchingDownloaded = () => {
        // Fetch the data downloaded and imported on a MySQL Database. I did my own API service :)
        let apikey='gjf94r4gtut546errtyrt8564wleskfwmalsdsfsf6547987'
        let params=parseParams({})
        let url = 'https://vincint.anitacode.com/api/v1/'+apikey+'/'+params+'/getStockInfo.json'
        fetching(url,apikey,setError,setStep,setLoading,setData)
    }

    const loadDataD = () => {
        // Depending the option of data, it fetch the nasdaq free API or the downloaded and imported database.
        if(localData){
            fetchingDownloaded()
        }else{
            fetchingNasdaq()
        }
    }

    const handleSelect = (ranges) =>{
        // Takes the date range and assign the end and start date
        setEndDate(new Date(ranges.selection.endDate))
        setStartDate(new Date(ranges.selection.startDate))
    }

    const validateToSubmit = () => {
        // Verifies the start and end date are selected.
        if(startDate === null || endDate === null){
            setError('You must select and starting date and a ending date.')
        }else{
            setError(null)
            setStep('result')
        }
    }

    if(data !== null){
        // Depending of the data source, it assign the proper structure.
        localData ? dataVal = data : dataVal=data.dataset
    }

    // First time loaded.
    useEffect(()=>loadDataD(),[])

    return loading || data === null
        ?
        <Loader/>
        :
        <div>
            <DetailedStock stockCode={stockCode} data={dataVal} setStep={setStep} setStockCode={setStockCode}/>
            <Card className={'my-4'}>
                <Card.Body>
                    <h4 className={'title mb-4'}>Select the date range you want to consult.</h4>
                    <DateRange
                        className={'w-100'}
                        maxDate={new Date(dataVal.newest_available_date)}
                        minDate={new Date(dataVal.oldest_available_date)}
                        editableDateInputs={false}
                        months={1}
                        rangeColors={['#00e6c9']}
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                    />
                    <Button
                        onClick={()=>validateToSubmit()}
                        variant={'info'}
                        size={'lg'}
                        className={'w-100 btn-block mt-4'}
                    >
                        Continue
                    </Button>
                </Card.Body>
            </Card>
        </div>
}

export default DateRanged