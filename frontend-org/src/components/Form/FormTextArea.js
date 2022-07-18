import '../../styles/Form.module.css'


const FormTextArea = ({id, label, placeholder, value, onChange}) => {
    return ( 
        <>

            <div className={"form-group " + "inputfield"}>
                <label htmlFor={id} className={"label"}>{label}</label>
                <textarea 
                    className={"form-control"} 
                    id={id} placeholder={placeholder}
                    value={value}
                    onChange={e=> onChange(e.target.value)} 
                />
            </div>
        
        </> 
    );
}
 
export default FormTextArea;