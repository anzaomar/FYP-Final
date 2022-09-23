import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

const AcademicInfoSection = ({setFormValues, showAcademicInfo, setShowAcademicInfo}) => {

    const [academicInfo, setAcademicInfo] = useState({
		institute: "",
		program: "",
		batch: "",
		section: "",
		start_date: "",
		end_date: "",
	});

    
	function handleAcademicInfo(name, value) {
		setAcademicInfo(prev => (
			{
				...prev,
				[name]: value
			}
		))
	}

    function handleSave(){
        let entries = Object.entries(academicInfo).every(item => item[1] !== "")

        if(entries){
            setFormValues(prev => (
                {
                    ...prev,
                    academic_info: [...prev.academic_info, academicInfo]
                }
            ))
            setAcademicInfo({
                institute: "",
                program: "",
                batch: "",
                section: "",
                start_date: "",
                end_date: "",
            })
            setShowAcademicInfo(false)
        }
        else {
            alert("Please add complete Academic Info")
        }

    }

    
	useEffect(() => {
        console.log(academicInfo)
	}, [academicInfo])



  return (
    <div style={{display: showAcademicInfo ? "block" : "none"}}>
        <Form.Group>
            <Form.Control
                as="select"
                type="text"
                className="py-2 px-0 border-0 border-bottom border-2 rounded-0"
                name="institute"
                value={academicInfo?.institute}
                onChange={(e) =>
                    handleAcademicInfo(
                        e.target.name,
                        e.target.value
                    )
                }
            >
                <option value="">Institute</option>
                <option value="SZABIST">SZABIST</option>
                <option value="IBA">IBA</option>
                <option value="CBM">CBM</option>
                <option value="LUMS">LUMS</option>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Control
                placeholder="Program"
                type="text"
                className="py-3 px-0 border-0 border-bottom border-2 rounded-0"
                name="program"
                value={academicInfo?.program}
                onChange={(e) =>
                    handleAcademicInfo(
                        e.target.name,
                        e.target.value
                    )
                }
            />
        </Form.Group>
        <Form.Group>
            <Form.Control
                placeholder="Batch"
                type="text"
                className="py-3 px-0 border-0 border-bottom border-2 rounded-0"
                name="batch"
                value={academicInfo?.batch}
                onChange={(e) =>
                    handleAcademicInfo(
                        e.target.name,
                        e.target.value
                    )
                }
            />
        </Form.Group>
        <Form.Group>
            <Form.Control
                placeholder="Section"
                type="text"
                className="py-3 px-0 border-0 border-bottom border-2 rounded-0"
                name="section"
                value={academicInfo?.section}
                onChange={(e) =>
                    handleAcademicInfo(
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
                value={academicInfo?.start_date}
                onChange={(e) =>
                    handleAcademicInfo(
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
                value={academicInfo?.end_date}
                onChange={(e) =>
                    handleAcademicInfo(
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

export default AcademicInfoSection