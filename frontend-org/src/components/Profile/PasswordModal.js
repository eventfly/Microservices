import { useState } from 'react';
import FormInput from '../Form/FormInput';
import PopupModal from '../PopupModal';
import { Button } from "react-bootstrap";
import {authApi} from '../../api/axiosHook'


const PasswordModal = ({email, role}) => {

    const [modalShow, setModalShow] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let auth = sessionStorage.getItem('auth')
    if (auth) {
        auth = JSON.parse(auth);
    }

    const savePassword = (e) => {
        e.preventDefault();

        if(newPassword != confirmPassword){
            console.log("doesn't match")
        }

        else{
            console.log("matched")

            let profileData = {
                email: email,
                password: password,
                new_password: newPassword,
                role: role
            }

            console.log("profile data: ", profileData)

            if(auth.role == 'Organizer' || auth.is_verified == true){
                authApi.put('/change-password', profileData)
                .then(res => {
                    console.log(res)
                    setModalShow(false)
                    setPassword('')
                    setNewPassword('')
                    setConfirmPassword('')

                }).catch(err => {
                    console.log(err)
                })
            }

            else{
                authApi.put('/verify', profileData)
                .then(res => {
                    console.log(res)
                    setModalShow(false)
                    setPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                    window.sessionStorage.setItem('auth', JSON.stringify(res.data.existingUser));

                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }

    const passwordJSX = (
        <>
            <div style={{
                marginLeft: '8%',
                marginRight: '8%',
                marginTop: '10px',
                marginBottom: '10px'
            }}>

                <FormInput id="password"
                    inputType="password"
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChange={setPassword}
                />

                <FormInput id="new-password"
                    inputType="password"
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={setNewPassword}
                />

                <FormInput id="confirm_password"
                    inputType="password"
                    label="Confirm Password"
                    placeholder="Enter password again"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />

            </div>
        
        </>
    )

    return ( 
        
        <>
            <Button 
                variant="contained" 
                color="primary"
                onClick={ () => setModalShow(true)}
                style={{
                    color: 'blue',
                    textDecoration: 'none',
                    cursor: 'pointer',
                }}
            > 
                
                Change Password
            
            </Button> 

            <PopupModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header="Change Password"
                bodyComponent={passwordJSX}
                saveButtonText={"Save Changes"}
                saveButtonAction={savePassword}
                size="md"
            />
        
        </> 
    
    );
}
 
export default PasswordModal;