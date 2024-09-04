import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './login.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../loginState';

function Login() {
    const { changedLogin, isLogged } = useContext(LoginContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [montrerError, setMontrerError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // New state for error message

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:3010/auth/login', { email, password });
            if (res.status !== 400 && res.status !== 403) {
                console.log("success");
                localStorage.setItem('accToken', res.data.token);
                localStorage.setItem('userEmail', email); // Save the email to local storage
                console.log(res.data.token);
                changedLogin();
                console.log(isLogged);
                navigate('/');
                setMontrerError(false);
            }
        } catch (error) {
            console.error("Erreur:", error);
            setMontrerError(true);
            if (error.response && error.response.status === 403) {
                setErrorMessage("Compte n'est pas active ou bannie.");
            } else {
                setErrorMessage("Assurez vous de mettre le bon Email et mot de passe.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-black">
            {montrerError && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> {errorMessage}
                </div>
            )}
            <div className='auth-form-container'>
                <h2>Connexion</h2>
                <br />
                <Form id='frmLogin' onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="exampleInputEmail1">Adresse Email:</Form.Label>
                        <Form.Control
                            type="email"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="exemple@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="exampleInputPassword1">Mot de passe :</Form.Label>
                        <Form.Control
                            type="password"
                            id="exampleInputPassword1"
                            placeholder='********'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <br />
                    <Button type="submit" className="btn btn-primary" id='login'>Connexion</Button>
                    <br />
                    <br />
                    <Form.Text className="text">
                        Pas encore inscrit? <Link to="/Signup">S'inscrire ici</Link>
                    </Form.Text>
                </Form>
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

        </div>
    );
}

export default Login;
