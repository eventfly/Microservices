import '../../styles/Form.css'


const FormTextArea = ({id, label, placeholder, disabled, height, bgColor, value, onChange}) => {
    return ( 
        <>

            <div className={"form-group inputfield"}>
                <label htmlFor={id} className={"label"}>{label}</label>
                <textarea 
                    className={"form-control"}
                    style={{ 
                        height: `${height}`, 
                        fontSize: "1rem",
                        backgroundColor: `${bgColor}`, 
                        borderColor: `${bgColor}` 
                    }}  
                    id={id} placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={e=> onChange(e.target.value)} 
                />
            </div>
        
        </> 
    );
}
 
export default FormTextArea;