const DatePicker = ({label,defaultDate, onChange}) => {
    return ( 
        <>        
            <div className='Date'>
                <div >
                    <label htmlFor={"start_date"}>{label}</label>
                    <br></br><br></br>
                    <input 
                        type='datetime-local' 
                        className={"form-control"} 
                        name={"start_date"} 
                        id={"start_date"}
                        value={defaultDate}
                        onChange={e=> onChange(e.target.value)} 
                        style={{height: '50px'}}
                    />
                </div>
            </div>
        </>

     );
}
 
export default DatePicker;