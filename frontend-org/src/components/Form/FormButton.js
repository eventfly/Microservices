import '../../styles/Form.css'

const FormButton = ({type, buttonText, bgColor, onClick, isDisabled}) => {
    return ( 
        <>
            <button type={type}
                onClick={onClick}
                style={{backgroundColor: `${bgColor}`}} 
                className={"btn btn-block button_style"}
                disabled={isDisabled}
            >

                {buttonText} 
            
            </button>
        
        </>

    );
}
 
export default FormButton;