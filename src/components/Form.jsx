import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react'
import opt from "../icons/select.png";
import Table from "./Table";

//states for job type - active style
const initialState = {
    color1: "",
    color2: "",
    color3: "",
    valueState: ""
}

const reducer = (stateValue, action) => {

    switch (action) {
        case "FT":
            return {
                ...stateValue,
                color1: "rgb(134, 165, 255)",
                color2: false,
                color3: false,
                valueState: "Full Time"
            }
        case "PT":
            return {
                ...stateValue,
                color1: false,
                color2: "rgb(134, 165, 255)",
                color3: false,
                valueState: "Part Time"
            }
        case "Consultant":
            return {
                ...stateValue,
                color1: false,
                color2: false,
                color3: "rgb(134, 165, 255)",
                valueState: "Consultant"
            }
        case "Chennai":
            return {
                ...stateValue,
                valueState: "Chennai"
            }
        default:
            return stateValue;
    }
}



function Form() {

    //for job type - active style
    const [state, dispatch] = useReducer(reducer, initialState);

    //Checkbox
    const [Value, setValue] = useState("");
    const [checking, setchecking] = useState("");

    //common states
    const [Name, setName] = useState("");
    const [Pro, setPro] = useState("");
    const [Code, setCode] = useState("+ ");
    const [Mobile, setMobile] = useState("");
    const [Email, setEmail] = useState("");
    const [dob, setdob] = useState("");

    //id forward to add functionality
    const [Id, setId] = useState("");

    //default location
    const locat =
        [
            "Bangalore",
            "Mangalore",
            "Coimbatore",
            "Mumbai",
            "Kolkatta",
            "Pune"
        ];

    ///////////////////////////////////////////////////////////////////////////////


    const Choose = (e) => {
        setValue(e.target.innerHTML)
    }

    const Check = useRef(null);

    useEffect(() => {
        if (checking === true) {
            setValue(Check.current.labels[0].innerHTML)
        }
        else {
            setValue("");
        }
    }, [Check, checking, setchecking])

    //Add and update access
    const Add = (id) => { //Add access

        if (Name !== "" &&
            Code !== "" && Mobile !== "" &&
            Email !== "" && state.valueState !== "" &&
            dob !== "" && Value !== "") {

            if (id === "") {

                fetch(`https://paripoorna-backend.herokuapp.com/post`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Fullname: Name,
                        Profile: Pro,
                        Postel: Code,
                        Number: Mobile,
                        Mail: Email,
                        Job: state.valueState,
                        Dob: dob,
                        location: Value
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        alert(res.message);
                        window.location.reload();
                    })
            }

            else { //update access

                fetch(`https://paripoorna-backend.herokuapp.com/post/${id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Fullname: Name,
                        Profile: Pro,
                        Postel: Code,
                        Number: Mobile,
                        Mail: Email,
                        Job: state.valueState,
                        Dob: dob,
                        location: Value
                    })
                })
                    .then(res => res.json())
                    .then(res => {
                        alert(res.message);
                        window.location.reload();
                    })
            }

        }
        else {
            alert("Fields should not be empty !");
        }
    }

    //Edit access
    const Edit = (id) => {

        setId(id);

        fetch(`https://paripoorna-backend.herokuapp.com/edit/${id}`)
            .then(res => res.json())
            .then(res => {
                let array = [res.data];
                for (var i of array) {
                    setName(i.name);
                    setPro(i.Pro);
                    setCode(i.code);
                    setMobile(i.number);
                    setEmail(i.mail);
                    setdob(i.dob);
                    if (i.job === "Full Time") {
                        dispatch("FT");
                    }
                    else if (i.job === "Part Time") {
                        dispatch("PT");
                    }
                    else if (i.job === "Consultant") {
                        dispatch("Consultant");
                    }
                    setValue(i.locat);
                }
            })
    }


    return (
        <Fragment>
            <div className="register">Registration</div>
            <div className="container form-border" style={{ height: "65vh" }}>
                <div className="row p-4 center">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-3">Fullname</div>
                            <div className="col-7">
                                <input
                                    type="text"
                                    maxLength="20"
                                    value={Name}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-3 my-auto">Profile Pic</div>
                            <div className="col-3 overlay">
                                <input
                                    type="file"
                                    className="diag"
                                    onChange={(e) => { setPro(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-4">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-3">Mobile</div>
                            <div className="col-2">
                                <input
                                    type="text"
                                    maxLength="5"
                                    value={Code}
                                    onChange={(e) => { setCode(e.target.value) }}
                                />
                            </div>
                            <div className="col-5">
                                <input
                                    type="text"
                                    maxLength="10"
                                    value={Mobile}
                                    onChange={(e) => { setMobile(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-3">Email Id</div>
                            <div className="col-7">
                                <input
                                    type="email"
                                    value={Email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-4">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-3">Job Type</div>
                            <div className="col-8">
                                <div className="input-group-append shadow">
                                    <button type="button" style={{ width: "25%", backgroundColor: state.color1 }} onClick={() => { dispatch("FT") }}>FT</button>
                                    <button type="button" style={{ width: "25%", backgroundColor: state.color2 }} onClick={() => { dispatch("PT") }} >PT</button>
                                    <button type="button" style={{ width: "50%", backgroundColor: state.color3 }} onClick={() => { dispatch("Consultant") }} >Consultant</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-3">DOB</div>
                            <div className="col-6">
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => { setdob(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-4">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-3">pref.Location</div>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-1">
                                        <input
                                            type="checkbox"
                                            className="checkbox-lg"
                                            id="check"
                                            onChange={() => { setchecking(Check.current.checked) }}
                                            ref={Check}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="check">Chennai</label>
                                    </div>
                                    <div className="col-7">
                                        <div type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#Modal"
                                            onClick={() => { setValue(Check.current.checked = false) }}
                                        >
                                            <img src={opt} alt="select..." className="point" />{Value}
                                        </div>

                                        <div className="modal" id="Modal">
                                            <div className="modal-dialog modal-dialog-scrollable">
                                                <div className="modal-content">
                                                    <div className="modal-title">
                                                        <div className="btn-close" data-bs-dismiss="modal" aria-label="Close"></div>
                                                    </div>
                                                    <div className="modal-body">
                                                        {locat.map((item, index) => (
                                                            <div key={index}
                                                                className="form-control border"
                                                                data-bs-dismiss="modal"
                                                                onClick={(e) => { Choose(e) }}
                                                            >
                                                                {item}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="offset-10 col-2" style={{ float: 'right' }}>
                        <button type="button" className="shadow" onClick={() => { Add(Id) }}>+Add / Update</button>
                    </div>
                </div>
            </div>
            <Table Edit={Edit} />
        </Fragment>
    )
}

export default Form