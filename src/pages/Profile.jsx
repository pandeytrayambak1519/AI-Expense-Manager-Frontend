import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import {

    getProfile,

    updateProfile

} from "../services/profileService";

function Profile() {

    const [profile, setProfile] = useState({

        name: "",

        email: "",

        password: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        const response = await getProfile();

        setProfile({

            name: response.data.name,

            email: response.data.email,

            password: ""

        });

    };

    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await updateProfile(profile);

        alert("Profile Updated Successfully");

    };

    return (

        <Layout>

            <div className="container-fluid py-4">

                <div className="card w-100">

                    <div className="card-body p-5">

                        <div className="text-center">

                            <img

                                src="https://ui-avatars.com/api/?name=User&size=120"

                                className="rounded-circle shadow"

                                alt="profile"

                            />

                            <h2 className="mt-3">My Profile</h2>

                        </div>

                        <form className="mt-5" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    className="form-control"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    value={profile.email}
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={profile.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button className="btn btn-success w-100">Update Profile</button>

                        </form>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Profile;