import {Button, FormControl, InputGroup, Form} from "react-bootstrap";

const SelectCode = (props) => {
    let {stockCode, setStockCode, setStep,setError, localData, setLocalData, setLoading} = props


    const validateField = () => {
        // Validate if the stockCode value is written.
        setError(null)
        if(stockCode === ""){
            setError('The field cannot be empty.')
        }else{
            setLoading(true)
            setStep('select_date_range')
        }
    }

    const dataTypeSelect = () => {
        // There is one type that fetch the downloaded data, and another fetch the Free Nasdaq API.
        // When using the downloaded data, it only use the AAPL stock.
        if(!localData){
            setStockCode('AAPL')
        }else{
            setStockCode('')
        }
        setLocalData(!localData)
    }

    return (
        <>
            <InputGroup >
                <InputGroup.Text>
                    <div className={'align-left'}>
                        <p className={'m-0'}>Enter the stock code here.</p>
                        {stockCode === ""
                            ?
                            <p className={'m-0 small text-secondary'}>
                                Not sure? Try with <Button size={'sm'} variant={'light'} onClick={()=>setStockCode('AAPL')}>AAPL</Button>
                            </p>
                            :
                            null
                        }
                    </div>
                </InputGroup.Text>
                <FormControl
                    disabled={!localData ? false : true}
                    aria-label="Stock Code"
                    aria-describedby="codeStock"
                    onChange={(e)=>{
                        setStockCode(e.target.value)
                    }}
                    size="lg"
                    value={stockCode}
                />
            </InputGroup>
            <Button
                className={'btn-block mt-4 w-100'}
                size={'lg'}
                variant="primary"
                id="button-addon2"
                onClick={()=>validateField()}
            >
                Go!
            </Button>
            <div className={' mt-3'}>
                <Form.Check
                    onChange={dataTypeSelect}
                    checked={localData}
                    type="switch"
                    id="dataSqitch"
                    label="Fetch data from downloaded data."
                />
                <div className={'text-secondary mt-2'}>If this is off, it will retreive the data from the downloaded data instead.</div>
            </div>
        </>
    )
}

export default SelectCode