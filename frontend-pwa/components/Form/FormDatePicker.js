import "react-datepicker/dist/react-datepicker.css"
import styles from '../../styles/Form.module.css'
import DatePicker from "react-datepicker";

const FormDatePicker = ({id, startDate, onChange}) => {

    return ( 

        <>

            <div className={"form-group " + styles.datepickerfield}>
                <label htmlFor={id} className={styles.label}>Date of Birth</label>

                <DatePicker
                    selected={startDate}
                    className={styles.datepicker_style}
                    onChange={e=> onChange(e)}
                    popperPlacement="bottom"
                />

            </div>
        
        </>

    );
}
 
export default FormDatePicker;