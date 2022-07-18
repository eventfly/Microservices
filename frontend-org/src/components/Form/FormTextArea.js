import '../../styles/Form.css'


const FormTextArea = ({id, label, placeholder, height, value, onChange}) => {
    return ( 
        <>

            <div className={"form-group " + "inputfield"}>
                <label htmlFor={id} className={"label"}>{label}</label>
                <textarea 
                    className={"form-control"}
                    style={{ height: `${height}`, fontSize: "1rem"}}  
                    id={id} placeholder={placeholder}
                    value={value}
                    onChange={e=> onChange(e.target.value)} 
                />
            </div>
        
        </> 
    );
}
 
export default FormTextArea;