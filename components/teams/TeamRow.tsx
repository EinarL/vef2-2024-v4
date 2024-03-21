'use client';
import styles from "../../public/styles/page.module.css";
import React, { useState } from 'react';


interface TeamRowProps {
    teamID: any;
    teamName: any;
    teamDescription: any;
    teamSlug: any;
  }

export function TeamRow({teamID, teamName, teamDescription, teamSlug}: TeamRowProps){
    const [isOpen, setOpen] = useState(false);
    const [isDeleted, setDeleted] = useState(false);
    const toggleEdit = () => setOpen(!isOpen);

    const [tableData, setTableData] = useState({ // text that is on the table that displays the name and description of the team
        name: teamName,
        description: teamDescription
    });

    const [formData, setFormData] = useState({ // text that is on the <input> and <textarea> that you can change to edit the team
        name: teamName,
        description: teamDescription,
        slug: teamSlug
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    // runs when the user clicks on the confirm button after editing a team
    const confirmEdit = async () => {
        setOpen(!isOpen)

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/teams/${formData.slug}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  name: formData.name,
                  description: formData.description
                })
            });
            if (response.ok) {
                const data = await response.json();
                setFormData(prevState => ({ // update the slug
                    ...prevState,
                    slug: data.slug
                }));

                setTableData(prevState => ({ // update the text in the html table row
                    ...prevState,
                    name: data.name,
                    description: data.description
                }));
            } else {
                const errorResponse = await response.json();
                const errorMessages = errorResponse.errors.join(', ');
                alert("Error editing team: " + errorMessages);
            }
        } catch (error) {
            alert("Unable to edit the team due to an internal server error");
            console.error('An error occurred while updating a team:', error);
        }
        
    };

    const cancelEdit = () => {
        setOpen(!isOpen)
        setFormData(prevState => ({ // set the edited text back to the teams name and desc
            ...prevState,
            name: tableData.name,
            description: tableData.description
        }));
    };

    // runs when the user presses the delete button
    const deleteTeam = async () => {
        if (!window.confirm(`Ertu viss um að þú vilt eyða ${formData.name}`)) return;
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/teams/${formData.slug}`, { method: 'DELETE' });
            if (response.ok) {
                setDeleted(true);
            } else {
                alert("Error, unable to delete the team");
                console.error('Failed to delete team:', response.statusText);
            }
        } catch (error) {
            alert("Unable to delete the team due to an internal server error");
            console.error('An error occurred while deleting team:', error);
        }
    }

    return (
        <React.Fragment key={teamID}>
            {!isDeleted && !isOpen && (
            <tr>
                <td>{tableData.name}</td>
                <td>{truncateDescription(tableData.description)}</td>
                <td>
                    <button onClick={toggleEdit} className={`${styles.btn} ${styles.material_symbol}`}>edit</button>
                </td>
                <td>
                    <button onClick={deleteTeam} className={`${styles.btn} ${styles.material_symbol}`} >delete</button>
                </td>
            </tr>
            )}
            { isOpen && (
                <tr>
                    <td>
                        <input type="text" id="name" name="name" defaultValue={formData.name} onChange={handleInputChange}/>
                    </td>
                    <td>
                        <textarea id="description" name="description" defaultValue={formData.description} rows={2} cols={40} onChange={handleInputChange}/>
                    </td>
                    <td>
                        <button onClick={confirmEdit} className={`${styles.btn} ${styles.material_symbol}`}>check</button>
                    </td>
                    <td>
                        <button onClick={cancelEdit} className={`${styles.btn} ${styles.material_symbol}`}>close</button>
                    </td>
                </tr>
            )}
        </React.Fragment>
    );
}

function truncateDescription(description: string, maxLength = 70) {
    if(!description) return description;
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.slice(0, maxLength) + '...';
    }
}
