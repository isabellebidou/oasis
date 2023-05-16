import React, { useEffect, useState } from 'react';



function FeedbackList() {
    useEffect(() => {
        fetchItems();
    }, []);
    const [items, setItems] = useState([]);
    const fetchItems = async () => {
        const userData = await fetch(`/api/feedbacks/`);
        const items = await userData.json();
        setItems(items);

    };


    return (
        <section>
            <fieldset>
                <legend><h2> Feedbacks </h2></legend>
                <div className="grid-container">

                    {items.length > 0 &&
                        items.map(feedback => {
                            return (
                                <div key={feedback._id} className="item photoThumbnail">
                                    {feedback.videoSteps && feedback.videoSteps.step
                                        ? `${feedback.videoSteps.step} step`
                                        : 'No video step available'}
                                    <br />with a focus on: {feedback.expectations} <br />feedback ordered on:{' '}
                                    {new Date(feedback.dateSent).toLocaleDateString()}

                                    {feedback.pdfPath && feedback.pdfUrl &&(
                                        <div>
                                           
                                            <a href={feedback.pdfUrl}>
                                                {feedback.videoSteps.step}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                </div>
                {items.length === 0 &&
                    <p className='itemp'>You don't have any feedback yet</p>
                }
            </fieldset>
        </section>
    );
}

export default FeedbackList
