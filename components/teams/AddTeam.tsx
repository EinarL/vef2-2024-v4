'use client';
import styles from "../../public/styles/page.module.css";
import React, { useState } from "react";

interface AddTeamRowProps{
    closeAddEditor: () => void;
    addRow: (team: { id: number; name: string; description: string; slug: string }) => void;
}

export function AddTeamRow({ closeAddEditor, addRow }: AddTeamRowProps){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleConfirmAdd = async () => {
        const addedTeam = await confirmAdd(name, description);
        if (addedTeam){
            closeAddEditor();
            setName(''); // clear the input fields after confirming
            setDescription('');
            addRow(addedTeam); // add the team to the html table
        }
    };

    const cancel = () => {
        closeAddEditor();
        setName(''); // clear the input fields
        setDescription('');
    };

    return ( // this is the row with the fields to add a new team
        <React.Fragment>
            <tr>
                <td>
                    <input type="text" id="name" name="name" value={name} onChange={handleNameChange}/>
                </td>
                <td>
                    <textarea id="description" name="description" value={description} onChange={handleDescriptionChange}/>
                </td>
                <td>
                    <button onClick={handleConfirmAdd} className={`${styles.btn} ${styles.material_symbol}`}>check</button>
                </td>
                <td>
                    <button onClick={cancel} className={`${styles.btn} ${styles.material_symbol}`}>close</button>
                </td>
            </tr>
        </React.Fragment>
    );
}


async function confirmAdd(name: string, description: string){
    try{
        const response = await fetch('https://vfor2-verkefni3.onrender.com/teams', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              description: description
            })
        });
        if (response.ok) {
            return await response.json();;
        } else {
            const errorResponse = await response.json();
            const errorMessages = errorResponse.errors.join(', ');
            alert("Error adding team: " + errorMessages);
            return false;
        }
    } catch (error) {
        alert("Unable to add the team due to an internal server error");
        console.error('An error occurred while adding a team:', error);
        return false;
    }
}

