import '../../styles/Form.css'

const FormButton = ({type, buttonText, onClick}) => {
    return ( 

        <>
            <button type={type}
                onClick={onClick} 
                className={"btn btn-primary btn-block " + "button_style"}
            >

                {buttonText} 
            
            </button>
        
        </>

    );
}
 
export default FormButton;