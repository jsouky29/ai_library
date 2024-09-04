import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gestionUser.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

function GestionUser() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3010/auth/AllUsers');
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };

        fetchUsers();
    }, []);

    const getUserType = (admin) => {
        return admin ? "Administrateur" : "Utilisateur";
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3010/auth/delete/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    const handleBan = async (userId) => {
        try {
            await axios.put(`http://localhost:3010/auth/ban/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
            window.location.reload();
        } catch (error) {
            console.error("Error banning user", error);
        }
    };

    const sortedUsers = [...users].sort((a, b) => {
        const statusOrder = { 'active': 1, 'inactive': 2, 'banned': 3 };
        if (statusOrder[a.statut] < statusOrder[b.statut]) return -1;
        if (statusOrder[a.statut] > statusOrder[b.statut]) return 1;
        if (a.admin && !b.admin) return -1;
        if (!a.admin && b.admin) return 1;
        return 0;
    });

    const userCount = sortedUsers.length;

    const renderAdditionalBreaks = (count) => {
        let amount;
        let breaks = [];
        if (count <= 9 && count > 5) {
            amount = 12 - count;
            breaks = Array(amount).fill(<br />);
        } else if (count <= 5 && count > 3) {
            amount = 14 - count;
            breaks = Array(amount).fill(<br />);
        } else if (count <= 3) {
            amount = 18 - count;
            breaks = Array(amount).fill(<br />);
        } else {
            breaks = Array(0).fill(<br />);
        }
        return breaks;
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-white">
            <br />
            <br />
            <h1>Gestion des utilisateurs</h1>
            <br />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Prenom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Type d'utilisateur</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => (
                        <tr key={user._id}>
                            <td className={user.statut === "banned" ? 'banned-user' : 'normal'}>{index + 1}</td>
                            <td className={user.statut === "banned" ? 'banned-user' : 'normal'}>{user.prenom}</td>
                            <td className={user.statut === "banned" ? 'banned-user' : 'normal'}>{user.nom}</td>
                            <td className={user.statut === "banned" ? 'banned-user' : 'normal'}>{user.email}</td>
                            <td className={user.statut === "banned" ? 'banned-user' : 'normal'}>{user.telephone}</td>
                            <td className={user.statut === "banned" ? 'banned-user' : 'normal'}>{getUserType(user.admin)}</td>
                            <td className={user.statut === "active" ? 'active-user' : 'inactive-user'}>
                                {user.statut === "active" ? 'Active' : user.statut === "inactive" ? 'Inactive' : "Bannie"}
                            </td>
                            <td className={user.statut === "banned" ? 'banned-user' : 'normal'}>
                                {user.admin === false && (
                                    <>
                                        <Button variant="primary" onClick={() => navigate(`/edit/${user._id}`)}>Modifier</Button>{' '}
                                        <Button variant="danger" onClick={() => handleDelete(user._id)}>Supprimer</Button>{' '}
                                    </>
                                )}
                                {user.admin === false && user.statut === "banned" && (
                                    <>
                                        <Button variant="success" onClick={() => handleBan(user._id)}>Débannir </Button>
                                    </>
                                )}
                                {user.admin === false && user.statut !== "banned" && (
                                    <>
                                        <Button variant="danger" onClick={() => handleBan(user._id)}>Bannir</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {renderAdditionalBreaks(userCount)}
            <footer className="w-full py-8 bg-[#28201e] text-center text-sm text-white">
                <p>&copy; 2024 AI Library Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default GestionUser;
