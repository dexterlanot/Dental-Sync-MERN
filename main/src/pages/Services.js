import React from 'react'
import * as SvgIcons from '../assets/SvgIcons'

function Services() {
    return (

        <section className='services' id='services'>
            <h1>Our Services</h1>
            <p className='subhead'>Explore our dental services designed to enhance your oral health and well-being.</p>
            <div className='services-row'>
                <div className='service'>
                    <SvgIcons.OralSurgeryIcon />
                    <h2>Oral Surgery</h2>
                    <p>Closed/Open Extraction, 3rd Molar Extraction, Tooth Impaction, Pero-aprical Radiography</p>
                </div>
                <div className='service'>
                    <SvgIcons.DentalDiagnosisIcon />
                    <h2>Dental Diagnosis & Consultation</h2>
                    <p>Lorem ipsum</p>
                </div>
                <div className='service'>
                    <SvgIcons.OralProphylaxisIcon />
                    <h2>Oral Prophylaxis</h2>
                    <p>Cavity & Onlay/Inlay Restoration</p>
                </div>
                <div className='service'>
                    <SvgIcons.Esthetics/>
                    <h2>Esthetics</h2>
                    <p>Composite/Porcelain, Veneers, Teeth Whitening</p>
                </div>
                <div className='service'>
                    <SvgIcons.PeriodonticsIcon />
                    <h2>Periodontics</h2>
                    <p>Scaling and Root Planning, Periodontal Surgery</p>
                </div>
                <div className='service'>
                    <SvgIcons.OralRehabIcon />
                    <h2>Oral Rehabilitation</h2>
                    <p>Lorem ipsum</p>
                </div>
                <div className='service'>
                    <SvgIcons.OrthodonticsIcon />
                    <h2>Orthodontics</h2>
                    <p>Braces & Retainers</p>
                </div>
                <div className='service'>
                    <SvgIcons.ProsthodonticsIcon />
                    <h2>Prosthodontics</h2>
                    <p>Full/Partial Dentures, Fixed/Removable, Prosthesis</p>
                </div>
                <div className='service'>
                    <SvgIcons.EndodonticsIcon />
                    <h2>Endodontics</h2>
                    <p>Root Canal Treatment</p>
                </div>
            </div>
        </section>

    )
}

export default Services