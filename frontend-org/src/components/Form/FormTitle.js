// import '../../styles/Form.module.css'

const FormTitle = ({title, color, fontWeight}) => {
    return ( 
        <div>
            <h1 
                className={"title h1"}
                style={{color: `${color}`, fontWeight: `${fontWeight}`}}
            
            >
                {title}
            </h1>
        </div>
     );
}
 
export default FormTitle;