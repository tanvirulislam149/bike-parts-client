import React, { useEffect, useState } from 'react';

const MakeAdmin = () => {
    const [user, setUser] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/allUser")
            .then(res => res.json())
            .then(data => setUser(data));
    }, [])

    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/makeAdmin/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    fetch("http://localhost:5000/allUser")
                        .then(res => res.json())
                        .then(data => setUser(data));
                }
            });
    }

    return (
        <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Button</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user?.map((o, index) =>
                            <>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{o.email}</td>
                                    <td>{o.name}</td>
                                    <td>{o?.role === "admin" ? "" : <button onClick={() => handleMakeAdmin(o._id)} className='btn btn-sm '>Make Admin</button>}</td>
                                </tr>
                            </>
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MakeAdmin;