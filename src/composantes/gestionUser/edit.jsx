import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        phone: '',
        dateNaissance: '',
        statut: "inactive"
    });
    const [montrerErrorValidation, setMontrerErrorValidation] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3010/auth/userId/${id}`);
                const userData = res.data;
                const formattedDate = userData.dateNaissance ? new Date(userData.dateNaissance).toISOString().split('T')[0] : '';

                setFormData({
                    prenom: userData.prenom,
                    nom: userData.nom,
                    email: userData.email,
                    phone: userData.telephone,
                    dateNaissance: formattedDate,
                    statut: userData.statut
                });
            } catch (error) {
                console.error("Error fetching user", error);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? (checked ? "active" : "inactive") : value;
        setFormData({
            ...formData,
            [name]: newValue
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

        if (!nameRegex.test(formData.prenom) || !nameRegex.test(formData.nom)) {
            setMontrerErrorValidation(true);
            return false;
        }
        if (!phoneRegex.test(formData.phone)) {
            setMontrerErrorValidation(true);
            return false;
        }
        if (age < 16 || age > 110) {
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
            await axios.put('http://localhost:3010/auth/update', formData);
            navigate('/gestionUser'); // Redirect to user management page after successful update
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-black">
            {montrerErrorValidation && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> Les informations saisies sont invalides.
                </div>
            )}
            <div className='auth-form-container'>
                <h2>Changer les informations</h2>
                <br />
                <Form id='frmSignup' onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="prenom">Prenom :</Form.Label>
                        <Form.Control
                            type="text"
                            id="prenom"
                            placeholder="Votre prénom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="nom">Nom :</Form.Label>
                        <Form.Control
                            type="text"
                            id="nom"
                            placeholder="Votre nom"
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
                        <Form.Check
                            type="checkbox"
                            id="statut"
                            name="statut"
                            label="Actif"
                            checked={formData.statut === "active"}
                            onChange={handleChange}
                        />
                    </Form.Group>
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

export default EditUser;
