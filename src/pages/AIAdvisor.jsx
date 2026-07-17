import { useEffect, useState } from "react";

import Layout from "../components/Layout";

import { getAdvice } from "../services/advisorService";

function AIAdvisor() {

    const [advice, setAdvice] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAdvice();

    }, []);

    const loadAdvice = async () => {

        setLoading(true);

        try {

            const response = await getAdvice();

            setAdvice(response.data);

        }

        catch {

            setAdvice("Unable to generate advice.");

        }

        setLoading(false);

    };

    return (

        <Layout>

            <div className="row justify-content-center">

                <div className="col-xl-9">

                    <div className="card">

                        <div className="card-header bg-primary text-white">

                            <h2>

                                🤖 AI Spending Advisor

                            </h2>

                        </div>

                        <div className="card-body text-center p-5">

                            {

                                loading ?

                                <>

                                    <div className="spinner-border text-primary"></div>

                                    <h4 className="mt-4">

                                        AI is analyzing your expenses...

                                    </h4>

                                </>

                                :

                                <>

                                    <div

                                        className="mb-4"

                                        style={{

                                            fontSize:"80px"

                                        }}

                                    >

                                        🧠

                                    </div>

                                    <div

                                        className="alert alert-primary"

                                        style={{

                                            fontSize:"20px",

                                            lineHeight:"35px"

                                        }}

                                    >

                                        {advice}

                                    </div>

                                    <button

                                        className="btn btn-primary btn-lg mt-4"

                                        onClick={loadAdvice}

                                    >

                                        Generate New Advice

                                    </button>

                                </>

                            }

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default AIAdvisor;