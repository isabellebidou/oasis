import React, { useEffect, useState } from 'react';
import store from "../store";
import UploadDocument from './UploadDocument';
import axios from "axios";
import { logError } from "../../utils/utils";


function SelectedFeedbackList() {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);
    const [visibility, setVisibility] = useState("hidden");
    const [editMode, setEditMode] = useState(false);
    const [selectedPdfs, setSelectedPdfs] = useState([]);

    const fetchItems = async () => {
        if (store.getState().selectedUser) {
            const userId = store.getState().selectedUser;
            const userData = await fetch(`/api/feedback/${userId}`);
            const items = await userData.json();
            setItems(items);
        }
    };
    const handleEditButtonToggleText = () => {
        return editMode ? 'Disable edit' : 'Enable edit';
    }
    const toggleEditMode = () => {
        setEditMode(!editMode)
        setVisibility(visibility === 'visible' ? 'hidden' : 'visible');

    }
    const handleSelected = (e) => {
        if (selectedPdfs.includes(e.target.value)) {
            //remove item
            // find index
            var myIndex = selectedPdfs.indexOf(e.target.value);
            var myArray = [...selectedPdfs];
            myArray.splice(myIndex, 1);
            setSelectedPdfs(myArray);
        } else {
            // add item
            setSelectedPdfs([...selectedPdfs, e.target.value]);
        }
    }
    const deletePdfs = async () => {

        try {
            await axios.delete("/api/document/delete", {
                data: { idsToDelete: selectedPdfs }
            })
                .then(function (response) {
                    // handle success
                    setSelectedPdfs([])


                }).catch(function (error) {
                    // handle error

                })
                .finally(function () {
                    // always executed
                });
        } catch (error) {

        }

    }
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

                                {new Date(feedback.dateSent).toLocaleDateString()}<br />
                                {feedback.dateCompleted &&
                                    <span>date Completed: {new Date(feedback.dateCompleted).toLocaleDateString()}</span>
                                }

                                <br /><UploadDocument
                                    feedbackId={feedback._id}
                                    stepName={feedback.videoSteps.step}
                                />
                                {feedback.pdfPath && feedback.pdfUrl && (
                                    <div>

                                        <a href={feedback.pdfUrl}>
                                            {feedback.videoSteps.step}
                                        </a>
                                        <input type={'checkbox'} value={feedback.pdfPath} style={{ visibility }} onChange={handleSelected}></input>
                                    </div>
                                )}


                            </div>
                        );
                    })}


            </div>
            {items.length >= 1 &&
                <>
                    <button id="editeyes" className="editeyes" onClick={toggleEditMode}>{handleEditButtonToggleText()}</button>
                    <button id="deleteeyes" className="deleteeyes" onClick={deletePdfs} style={{ visibility }} >Delete Selected</button>
                </>
            }
            </fieldset>
        </section>
    );
}

export default SelectedFeedbackList