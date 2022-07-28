import '../../styles/Form.css'

const FormButton = ({type, buttonText, bgColor, onClick}) => {
    return ( 
        <>
            <button type={type}
                onClick={onClick}
                style={{backgroundColor: `${bgColor}`}} 
                className={"btn btn-block button_style"}
            >

                {buttonText} 
            
            </button>
        
        </>

    );
}
 
export default FormButton;