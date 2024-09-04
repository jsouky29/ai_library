import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './delete.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { LoginContext } from '../../loginState';
import { useNavigate } from 'react-router-dom';

function DeleteAcc() {
    const [password, setPassword] = useState('');
    const [montrerError, setMontrerError] = useState(false);
    const token = localStorage.getItem('accToken');
    const { changedLogin, isLogged } = useContext(LoginContext);
    const loggedEmail = localStorage.getItem('userEmail') || ''; // Get the logged-in user's email from local storage
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        try {
            const res = await axios.put('http://localhost:3010/auth/deactivateUser', { email: loggedEmail, currentPassword: password }

            );
            console.log("success");
            changedLogin();
            localStorage.clear();
            setMontrerError(false);
            navigate('/');
        } catch (error) {
            console.log(loggedEmail, password)
            console.error("Error:", error);
            setMontrerError(true);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-black">
            {montrerError && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> Faites attention de mettre le bon mot de passe.
                </div>
            )}
            <div className='auth-form-container'>
                <h2>Deactivez votre compte</h2>
                <br />
                <div id='frmDelete'>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="exampleInputPassword1">Mot de passe :</Form.Label>
                        <br />
                        <Form.Control
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='********'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <br />

                    <Button
                        type='submit'
                        className="btn btn-primary"
                        id='delete'
                        onClick={handleDeleteAccount}
                    >
                        Deactiver
                    </Button>
                    <br />
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
    );
}

export default DeleteAcc;
