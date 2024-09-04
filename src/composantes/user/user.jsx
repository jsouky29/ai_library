import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';

function User() {
    const navigate = useNavigate();
    const loggedEmail = localStorage.getItem('userEmail') || ''; // Get the logged-in user's email from local storage
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: loggedEmail,
        phone: '',
        dateNaissance: '',
        currentPassword: '',
        newPassword: ''
    });
    const [montrerError, setMontrerError] = useState(false);
    const [montrerSuccess, setMontrerSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [montrerErrorValidation, setMontrerErrorValidation] = useState(false);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('http://localhost:3010/auth/user', {
                    params: { email: loggedEmail }
                });
                const userData = res.data;

                // Extract date and format it to YYYY-MM-DD
                const formattedDate = userData.dateNaissance ? new Date(userData.dateNaissance).toISOString().split('T')[0] : '';

                setFormData({
                    prenom: userData.prenom,
                    nom: userData.nom,
                    email: userData.email,
                    phone: userData.telephone,
                    dateNaissance: formattedDate,
                    currentPassword: '',
                    newPassword: ''
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error fetching user data
            }
        };

        fetchUserData();
    }, [loggedEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^[+\d\s-]+$/;
        const today = new Date();
        const birthDate = new Date(formData.dateNaissance);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (!nameRegex.test(formData.nom)) {
            console.log("Invalid name format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (!nameRegex.test(formData.prenom)) {
            console.log("Invalid name format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (!phoneRegex.test(formData.phone)) {
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

        try {
            console.log(formData)
            const res = await axios.put('http://localhost:3010/auth/updatePassword', formData);
            if (res.status === 200) {
                setMontrerSuccess(true);
                setMontrerError(false);
                setTimeout(() => setMontrerSuccess(false), 5000);
                navigate('/');

            } else {
                setMontrerError(true);
                setMontrerSuccess(false);
                setErrorMessage('Failed to update information.');
            }
        } catch (error) {
            console.error("Error:", error);
            setMontrerError(true);
            setMontrerSuccess(false);
            setErrorMessage(error.response?.data?.message || "Assurez-vous d'utiliser votre mot de passe.");
            // Automatically hide error message after 5 seconds
            setTimeout(() => setMontrerError(false), 5000);
        }
    };
    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-black">
            {montrerError && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> {errorMessage}
                </div>
            )}
            {montrerSuccess && (
                <div className="w-full alert alert-success">
                    <strong>Success!</strong> Les informations ont été modifiées avec succès.
                </div>
            )}
            {montrerErrorValidation && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> Les informations saisies sont invalides.
                </div>
            )}
            <div className='auth-form-container'>
                <h2>Modifiez vos informations:</h2>
                <br />
                <Form id='frmSignup' onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="prenom">Prenom :</Form.Label>
                        <Form.Control
                            type="text"
                            id="prenom"
                            placeholder={formData.prenom || 'Votre prenom complet'}
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="nom">Nom :</Form.Label>
                        <Form.Control
                            type="text"
                            id="nom"
                            placeholder={formData.nom || 'Votre nom complet'}
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="phone">Numéro de téléphone :</Form.Label>
                        <Form.Control
                            type="text"
                            id="phone"
                            placeholder={formData.phone || '+1 (123)-456-7890'}
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="dateNaissance">Date de naissance :</Form.Label>
                        <Form.Control
                            type="date"
                            id="dateNaissance"
                            name="dateNaissance"
                            value={formData.dateNaissance}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="exampleInputPassword1">Ancien mot de passe :</Form.Label>
                        <Form.Control
                            type="password"
                            id="exampleInputPassword1"
                            placeholder='********'
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="exampleInputPassword2">Nouveau mot de passe :</Form.Label>
                        <Form.Control
                            type="password"
                            id="exampleInputPassword2"
                            placeholder='********'
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <br />
                    <Button type="submit" className="btn btn-primary" id='signup'>Changer</Button>
                    <br />
                </Form>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
}
export default User;
