import { init, sendForm } from 'emailjs-com';
import React, { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import "./Contact.css"
import angelList from "../Footer/images/angelList.png"
import gitHubLogo from "../Footer/images/gitHubLogo.png"
import linkedin from "../Footer/images/linkedin.png"
import { useSelector } from 'react-redux';
import mailicon from "./mailIcon.png"


init("user_z7yv2pWRTNjbyYs2SqFGU");

function Contact() {
    const { register, handleSubmit } = useForm();
    const [contactNumber, setContactNumber] = useState("000000");
    const [err, setErr] = useState([])
    const pageNum = useSelector(state => state.pageNum)
    const generateContactNumber = () => {
        const numStr = "000000" + (Math.random() * 1000000 | 0);
        setContactNumber(numStr.substring(numStr.length - 6));
    }


    const onSubmit = (data) => {
        let errArray = []
        // console.log(data);
        if (data.user_name === "") {
            errArray.push("name: required");
            document.getElementById("nameField").classList.add("red")
        }

        if (data.user_email === "") {
            errArray.push("email: required");
            document.getElementById("emailField").classList.add("red")
        } else if (!data.user_email.includes("@") || !data.user_email.includes(".")) {
            errArray.push("email: valid email required");
            document.getElementById("emailField").classList.add("red")
        }

        if (data.message === "") {
            errArray.push("message: required");
            document.getElementById("messageField").classList.add("red")
        }

        setErr(errArray)

        if (errArray.length === 0) {
            generateContactNumber();
            sendForm('default_service', 'XXXXtemplate_2v34f1q', '#contact-form')
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function (error) {
                    console.log('FAILED...', error);
                    setErr(["contact is off at the moment as space is currently limited. Please contact me at kevin@betker.org. Thank you"])
                });
        }
    }

    useEffect(() => {
        let nameField = document.getElementById("nameField")
        let emailField = document.getElementById("emailField")
        let messageField = document.getElementById("messageField")

        nameField.addEventListener("focus", (e) => {
            nameField.classList.remove("red")
            setErr([])
        })

        emailField.addEventListener("focus", (e) => {
            emailField.classList.remove("red")
            setErr([])
        })

        messageField.addEventListener("focus", (e) => {
            messageField.classList.remove("red")
            setErr([])
        })
    }, [])

    return (
        <div className="page_element" style={{ width: `${window.innerWidth}px` }} id="page-3" >
            <div className="contactContainer">

                <div className="contactForm">
                    <form id='contact-form' onSubmit={handleSubmit(onSubmit)} className="theForm">
                        <h1>Contact Me</h1>
                        {err.length > 0 && <div className="errors">
                            {err.map((err, index) =>
                                <div key={`key-${index}`}>&bull; {err}</div>
                            )}
                        </div>}


                        <input
                            type='text'
                            name='user_name'
                            className="form_element"
                            {...register('user_name')}
                            id="nameField"
                            placeholder='Name' />
                        <br />


                        <input
                            type='text'
                            name='user_email'
                            className="form_element"
                            {...register('user_email')}
                            placeholder='Email'
                            id="emailField"
                        />
                        <br />


                        <textarea
                            name='message'
                            className="message_form_element"
                            {...register('message')}
                            placeholder='Message'
                            id="messageField"
                        />
                        <br />

                        <input type='hidden' name='contact_number' value={contactNumber} />
                        <input type='submit' value='Send' className="submit_button" />

                    </form>
                </div>

                <div className="contactInfoRight">
                    <div className="nameAndTitle">
                        <div className="myName">Kevin Betker</div>
                        <div className="title">Fullstack Developer</div>
                    </div>
                    <div className="emailDiv">
                        <img src={mailicon} className="mailIcon" alt="mailTo"></img>
                        kevin@betker.org
                    </div>

                    <div className="contactLinks">
                        <a href="https://github.com/kbetker" target="_blank" rel="noreferrer">
                            <img
                                src={gitHubLogo}
                                className={`contactLinkImage ${pageNum === "page-3" ? "unhide" : "hide"}`}
                                alt="GitHub">
                            </img>
                        </a>
                        <a href="https://www.linkedin.com/in/kevin-betker-878505128/" target="_blank" rel="noreferrer">
                            <img
                                src={linkedin}
                                className={`contactLinkImage ${pageNum === "page-3" ? "unhide" : "hide"}`}
                                alt="LinkedIn">
                            </img>
                        </a>
                        <a href="https://angel.co/u/kevin-betker" target="_blank" rel="noreferrer">
                            <img
                                src={angelList}
                                className={`contactLinkImage ${pageNum === "page-3" ? "unhide" : "hide"}`}
                                alt="Angel List">
                            </img>
                        </a>
                    </div>


                </div>




            </div>

            <div className="spacer"></div>
        </div>
    )

}
export default Contact
