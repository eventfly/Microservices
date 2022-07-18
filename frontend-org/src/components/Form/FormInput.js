import '../../styles/Form.css'


const FormInput = ({id, inputType, label, placeholder, value, onChange}) => {
    return ( 
        <>

            <div className="form-group inputfield">
                <label htmlFor={id} className="label">{label}</label>
                <input type={inputType} 
                    className="form-control" 
                    id={id} placeholder={placeholder}
                    value={value}
                    onChange={e=> onChange(e.target.value)} 
                />
            </div>
        
        </> 
    );
}
 
export default FormInput;