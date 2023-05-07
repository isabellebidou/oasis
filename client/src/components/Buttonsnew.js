import React, { useEffect, useState } from 'react';



function Buttons() {
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData();
    }, []);
    const [data, setData] = useState([]);
    const [videos, setVideos] = useState([]);
    const fetchData = async () => {
        const userData = await fetch(`/api/user_data/`);
        const data = await userData.json();
        setData(data);

    };

    return (
        <section>
            <div className="grid-container">
                {
                    items.map(feedback => {
                        return (

                            <div className="" key={feedback._id}>
                                <div className="item photoThumbnail">
                                    <p className="item">
                                        {feedback.video} feedback ordered on: {new Date(feedback.dateSent).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                        );

                    })
                }
            </div>
        </section>
    );
}

export default Buttons