
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
//<p>{JSON.stringify(auth)}</p>
function DataList() {
    const auth = useSelector(state => state.auth);
    const [isMember, setIsMember] = useState('');
    const [endOfMembership, setEndOfMembership] = useState('');
    const [membershipOutDated, setOutdated] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        const currentDate = new Date();
        const existingMembership = auth && auth.hasMembership ? new Date(auth.hasMembership) : null;
        const isMember = auth && existingMembership && existingMembership > currentDate ? true : false;
        const membershipOutDated = auth && existingMembership && existingMembership < currentDate? true : false;
        setIsMember(isMember);
        setOutdated(membershipOutDated);
        const endOfMembership = existingMembership ? existingMembership.toLocaleDateString() : null;
        setEndOfMembership(endOfMembership);
    };


    const renderUserData = () => {
        return (
            <div className="" key={'userdatakey'}>
                
                {isMember &&
                    <p className="itemp">
                        membership access until:  {endOfMembership}
                    </p>
                }
                {membershipOutDated &&
                    <p className="">
                        membership access ended:  {endOfMembership}
                    </p>
                }
                {!isMember &&
                    <Link to="/membership" className="">
                    <button className="" >get or renew membership access today</button>
                </Link>
                }
            </div>
        );
    }

    return (
        <>
            {renderUserData()}
        </>
    );
};

export default DataList;
