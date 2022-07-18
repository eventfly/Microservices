import '../../styles/Form.module.css'

const FormSelect = ({id, label, options, onChange}) => {

    return ( 

        <>
        
            <div className={"form-group " + "selectfield"}>

                <label htmlFor={id} className={"label"}>{label}</label>

                <select id={id} className={"form-select"} onChange={e=> onChange(e.target.value)}>
                    
                    {/* <option defaultValue> Choose... </option> */}

                    {
                        options.map((item)=>(
                            <option key={item.id}>
                                {item.name}
                            </option>
                        ))
                    }
                
                </select>
            
            </div>

        </>

    );
}
 
export default FormSelect;