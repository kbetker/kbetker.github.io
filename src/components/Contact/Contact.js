import { init, sendForm } from 'emailjs-com';
import React, { useState } from "react"
import { useForm } from 'react-hook-form'
import "./Contact.css"
init("temp");

function Contact() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [contactNumber, setContactNumber] = useState("000000");
    const [err, setErr] = useState('')

    const generateContactNumber = () => {
        const numStr = "000000" + (Math.random() * 1000000 | 0);
        setContactNumber(numStr.substring(numStr.length - 6));
      }


      const onSubmit = (data) => {
        console.log(data);
        generateContactNumber();
        sendForm('default_service', 'temp', '#contact-form')
          .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function(error) {
            console.log('FAILED...', error);
            setErr("Hmm. Something went wrong. Totally not our fault though, it appears to be something internal. Please contact me at kevin@betker.org ")
          });
      }

    return (
        <div className="page_element" style={{ width: `${window.innerWidth}px` }} id="page-4" >
            <form id='contact-form' onSubmit={handleSubmit(onSubmit)} className="theForm">
                <h1>Contact Me</h1>
                {err && <div className="errors">{err}</div>}
                <input
                type='text'
                name='user_name'
                className="form_element"
                {...register('user_name')}

                placeholder='Name' />
                <br />


                <input
                type='email'
                name='user_email'
                className="form_element"
                {...register('user_email')}
                placeholder='Email' />
                <br />


                <textarea
                name='message'
                className="message_form_element"
                {...register('message')}
                placeholder='Message'
                />
                <br />

                <input type='hidden' name='contact_number' value={contactNumber} />
                <input type='submit' value='Send'  className="submit_button" />

            </form>
        </div>
    )

}
export default Contact
