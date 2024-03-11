'use client';
import React, { useState } from 'react';


interface TeamRowProps {
    teamID: any;
    teamName: any;
    teamDescription: any;
    teamSlug: any;
  }

export function TeamRow({teamID, teamName, teamDescription, teamSlug}: TeamRowProps){
    const [isOpen, setOpen] = useState(false);
    const toggleEdit = () => setOpen(!isOpen);

    const [formData, setFormData] = useState({
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
            const response = await fetch(`https://vfor2-verkefni3.onrender.com/teams/${formData.slug}`, {
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
                setFormData(prevState => ({ // update the text on the table
                    ...prevState,
                    name: formData.name,
                    description: formData.description,
                    slug: data.slug
                }));
            } else {
                console.error('Failed to update team:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while updating a team:', error);
        }
        
    };

    return (
        <React.Fragment key={teamID}>
            { !isOpen && (
            <tr>
                <td>{formData.name}</td>
                <td>{truncateDescription(formData.description)}</td>
                <td>
                    <button onClick={toggleEdit}>Edit</button>
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
                        <button onClick={confirmEdit}>Confirm</button>
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
