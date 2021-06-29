import React, { Fragment, useEffect, useState } from 'react'

function Table({ Edit }) {

    const [data, setdata] = useState([]);

    //for getting data's
    useEffect(() => {
        fetch(`https://paripoorna-backend.herokuapp.com/get`)
            .then(res => res.json())
            .then(res => {
                setdata(res.data);
            })
    }, [])

    //delete access
    const Delete = (id) => {
        fetch(`https://paripoorna-backend.herokuapp.com/delete/${id}`)
            .then(res => res.json())
            .then(res => {
                alert(res.message);
                window.location.reload();
            })
    }


    return (
        <Fragment>
            <div className="container table-border">
                <div className="row">
                    <div className="col-12 pad-zero">
                        <table className="table table-striped text-left">
                            <thead>
                                <tr>
                                    <th>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-9 letter">Name</div>
                                                <div className="col-3">
                                                    <span className="point size">▲</span>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-9 letter">Email</div>
                                                <div className="col-3 flexify point">
                                                    <span>▲</span>
                                                    <span>▼</span>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-9 letter">Mobile</div>
                                                <div className="col-3 flexify point">
                                                    <span>▲</span>
                                                    <span>▼</span>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-9 letter">DOB</div>
                                                <div className="col-3 flexify point">
                                                    <span>▲</span>
                                                    <span>▼</span>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-9 letter">Job Type</div>
                                                <div className="col-3 flexify point">
                                                    <span>▲</span>
                                                    <span>▼</span>
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="letter">Action</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((i, ind) => (
                                    <tr key={ind}>
                                        <td>{i.name}</td>
                                        <td>{i.mail}</td>
                                        <td>{i.code} {i.number}</td>
                                        <td>{i.dob.split("-").reverse().join(".")}</td>
                                        <td>{i.job}</td>
                                        <td>
                                            <span className="point"> Pic </span>|
                                            <span className="point" onClick={() => { Edit(i._id) }}> Edit </span>|
                                            <span className="point" onClick={() => { Delete(i._id) }} > Delete </span>
                                        </td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Table