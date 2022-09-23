import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

const ProfessionalInfoSection = ({setFormValues, showProfessionalInfo, setShowProfessionalInfo}) => {

	const [professionalInfo, setProfessionalInfo] = useState({
		company: "",
		job_title: "",
		start_date: "",
		end_date: "",
	});
    
	function handleProfessionalInfo(name, value) {
		setProfessionalInfo(prev => (
			{
				...prev,
				[name]: value
			}
		))
	}

    function handleSave(){
        let entries = Object.entries(professionalInfo).every(item => item[1] !== "")

        if(entries){
            setFormValues(prev => (
                {
                    ...prev,
                    professional_info: [...prev.professional_info, professionalInfo]
                }
            ))
            setProfessionalInfo({
                company: "",
                job_title: "",
                start_date: "",
                end_date: "",
            })
            setShowProfessionalInfo(false)
        }
        else {
            alert("Please add complete Academic Info")
        }

    }

    
	useEffect(() => {
        console.log(professionalInfo)
	}, [professionalInfo])



  return (
    <div style={{display: showProfessionalInfo ? "block" : "none"}}>
        <Form.Group>
            <Form.Control
                placeholder="company"
                type="text"
                className="py-3 px-0 border-0 border-bottom border-2 rounded-0"
                name="company"
                value={professionalInfo?.company}
                onChange={(e) =>
                    handleProfessionalInfo(
                        e.target.name,
                        e.target.value
                    )
                }
            />
        </Form.Group>
        <Form.Group>
            <Form.Control
                placeholder="Job Title"
                type="text"
                className="py-3 px-0 border-0 border-bottom border-2 rounded-0"
                name="job_title"
                value={professionalInfo?.job_title}
                onChange={(e) =>
                    handleProfessionalInfo(
                        e.target.name,
                        e.target.value
                    )
                }
            />
        </Form.Group>
        <Form.Group className="py-3 px-0">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
                placeholder="Start Date"
                type="date"
                className="border-0 border-bottom border-2 rounded-0"
                name="start_date"
                value={professionalInfo?.start_date}
                onChange={(e) =>
                    handleProfessionalInfo(
                        e.target.name,
                        e.target.value
                    )
                }
            />
        </Form.Group>
        <Form.Group className="py-3 px-0">
            <Form.Label>End Date</Form.Label>
            <Form.Control
                placeholder="End Date"
                type="date"
                className="border-0 border-bottom border-2 rounded-0"
                name="end_date"
                value={professionalInfo?.end_date}
                onChange={(e) =>
                    handleProfessionalInfo(
                        e.target.name,
                        e.target.value
                    )
                }
            />
        </Form.Group>
        <Button type="button" className='btn-success' onClick={handleSave}>Save</Button>
    </div>
  )
}

export default ProfessionalInfoSection