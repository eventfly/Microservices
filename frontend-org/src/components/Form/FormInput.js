import '../../styles/Form.css'


const FormInput = ({id, inputType, label, placeholder, bgColor, isDisabled, value, onChange}) => {
    return ( 
        <>

            <div className="form-group inputfield">
                <label htmlFor={id} className="label">{label}</label>
                <input type={inputType}
                    disabled={isDisabled} 
                    className="form-control"
                    style={{ backgroundColor: `${bgColor}`, borderColor: `${bgColor}` }} 
                    id={id} placeholder={placeholder}
                    value={value}
                    onChange={e=> onChange(e.target.value)} 
                />
            </div>
        
        </> 
    );
}
 
export default FormInput;