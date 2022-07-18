import "react-datepicker/dist/react-datepicker.css"
import '../../styles/Form.module.css'
import DatePicker from "react-datepicker";

const FormDatePicker = ({id, startDate, onChange}) => {

    return ( 

        <>

            <div className={"form-group " + "datepickerfield"}>
                <label htmlFor={id} className={"label"}>Date of Birth</label>

                <DatePicker
                    selected={startDate}
                    className={"datepicker_style"}
                    onChange={e=> onChange(e)}
                    popperPlacement="bottom"
                />

            </div>
        
        </>

    );
}
 
export default FormDatePicker;