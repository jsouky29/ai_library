import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './signUp.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [montrerError, setMontrerError] = useState(false);
    const [montrerErrorMdp, setMontrerErrorMdp] = useState(false);
    const [montrerErrorValidation, setMontrerErrorValidation] = useState(false);

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^[+\d\s-]+$/;
        const today = new Date();
        const birthDate = new Date(dateNaissance);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (!nameRegex.test(nom)) {
            console.log("Invalid name format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (!phoneRegex.test(telephone)) {
            console.log("Invalid phone format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (age < 16 || age > 110) {
            console.log("Age not in range");
            setMontrerErrorValidation(true);
            return false;
        }

        setMontrerErrorValidation(false);
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (password !== confirmPassword) {
            setMontrerErrorMdp(true);
            setMontrerError(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:3010/auth/signup', {
                prenom,
                nom,
                email,
                telephone,
                dateNaissance,
                password,
            });
            if (res.status === 201) {
                navigate('/Login');
            }
        } catch (error) {
            console.error("Error:", error);
            setMontrerError(true);
            setMontrerErrorMdp(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-black">
            {montrerError && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> Assurez-vous d'utiliser un Email ou telephone non inscrit.
                </div>
            )}
            {montrerErrorMdp && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> Assurez-vous de mettre le même mot de passe.
                </div>
            )}
            {montrerErrorValidation && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> Assurez-vous que tous les champs sont valides.
                </div>
            )}
            <div className='auth-form-container'>
                <h2>Inscription</h2>
                <br />

                <Form id='frmSignup' onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="prenom">Prenom :</Form.Label>
                        <Form.Control
                            type="text"
                            id="prenom"
                            placeholder="Votre prenom complet"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="nom">Nom :</Form.Label>
                        <Form.Control
                            type="text"
                            id="nom"
                            placeholder="Votre nom complet"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="exampleInputEmail1">Adresse Email:</Form.Label>
                        <Form.Control
                            type="email"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="exemple@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="phone">Numéro de téléphone :</Form.Label>
                        <Form.Control
                            type="text"
                            id="phone"
                            placeholder="+1 (123)-456-7890"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="date">Date de naissance :</Form.Label>
                        <Form.Control
                            type="date"
                            id="date"
                            value={dateNaissance}
                            onChange={(e) => setDateNaissance(e.target.value)}
                            required
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
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="exampleInputPassword2">Confirmer mot de passe :</Form.Label>
                        <Form.Control
                            type="password"
                            id="exampleInputPassword2"
                            placeholder='********'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Button type="submit" className="btn btn-primary" id='signup'>Inscription</Button>
                    <br />
                    <Form.Text className="text">
                        Déjà Inscrit? <Link to="/Login">Se connecter</Link>
                    </Form.Text>
                </Form>
            </div>
            <br />
            <br />
            <br />

        </div>
    );
}

export default Signup;
