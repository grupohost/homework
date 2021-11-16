import {Button, Card, Col, Container, Row, Spinner, Table} from 'react-bootstrap'

export const formatDate = (date) =>{
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var year = date.getFullYear();
    return year+'-'+month+'-'+day;
}

export const fetching = (url,apikey,setError,setStep,setLoading,fn) => {
    // General function to get data
    fetch(url)
        .then(result =>{
                if (result.ok) {
                    return result.json();
                } else {
                    setError('The stock code does not exists')
                    setStep('select_code')
                }
            }
        )
        .then(resJSON => {
                setLoading(false)
                fn(resJSON)
            }
        )
        .catch((error) => {
                console.error(error)
            }
        )
}

export const Loader = () => <div className={'text-center py-5'}><Spinner animation="grow" /></div>

export const LayoutHome = props => (
    <Container className={'h-100'}>
        <Row className={'align-items-center justify-content-center h-100'}>
            <Col lg={7} md={8} sm={12}>
                <header>
                    <h1>Historial Stock Market</h1>
                    <h3 className={'bright'}>McDuck</h3>
                </header>
                <div className={'my-5'}>
                {props.children}
                </div>
                <footer>
                    <small>Developed by Anitacode</small>
                </footer>
            </Col>
        </Row>
    </Container>
)

export const DetailedStock = props => {
    let {stockCode, data, setStep, endDate, startDate} = props
    return (
        <Card className={'mb-4'}>
            <Card.Body>
                <div className={'d-flex w-100 justify-content-between '}>
                    <div>
                        <h4 className={'title m-0'}>Stock selected {stockCode}</h4>
                        <p className={'m-0'}>{data.name}</p>
                        {startDate !== undefined ? <><span>From :</span><h2 className={'resalt'}>{formatDate(startDate)}</h2></> : null}
                        {endDate !== undefined ? <><span className={'ml-4'}>To:</span><h2 className={'resalt'}>{formatDate(endDate)}</h2></> : null}
                    </div>
                    <div className={'d-flex align-items-center'}>
                        <div>
                            <Button className={'btn-block w-100'} size={'lg'} variant={'info'} onClick={()=>{
                                setStep('select_code')
                            }}>Change stock</Button>
                            <Button size={'lg'} className={'mt-2 btn-block w-100'} variant={'primary'} onClick={()=>setStep('select_date_range')}>Change date range</Button>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export const TableData = props => {
    let {data,localData}=props
    return <div>
        <h4 className={'title'}>Data</h4>
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                {localData ?
                    data.column_names.map( (item, index) => <th key={'i'+index}>{item}</th>)
                    :
                    data.dataset.column_names.map( (item, index) => {
                        if(index < 6){
                            return <th key={'i'+index}>{item}</th>
                        }else{
                            return null
                        }
                    })
                }
            </tr>
            </thead>
            <tbody>
                {localData ?
                    data.data.map(row =>
                        (
                            <tr>
                                {
                                    data.column_names.map((item,index) => <td key={'c'+index}>{row[item]}</td>)
                                }
                            </tr>
                        )
                    )
                    :
                    data.dataset.data.map(row =>
                        (
                            <tr>
                                {row.map((col, index) => {
                                    if(index < 6){
                                        return <td key={'c'+index}>{col}</td>
                                    }else{
                                        return null
                                    }
                                })}
                            </tr>
                        )
                    )
                }
            </tbody>
        </Table>
    </div>

}

export const parseParams = (params) => {
    let paramsd=JSON.stringify(params)
    paramsd=btoa(paramsd)
    return paramsd
}

export const diff = (a, b) => a > b ? a - b : b - a