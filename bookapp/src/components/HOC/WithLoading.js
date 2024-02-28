// import React from "react";
// import LoadingSpinner from "../loadSpinner";

// const WithLoading = (Component) => {

//   return function WihLoadingComponent({ isLoading, ...props }) {
//     if (!isLoading) return <Component {...props} />;
//     return <LoadingSpinner/>;
//   };
// };
// export default WithLoading;

import React, {useState} from'react';
import LoadingSpinner from "../loadSpinner";

const isLoadingHOC = (WrappedComponet) => {

    function HOC(props) {
        const [loading, setIsLoading] = useState(true)

        const setIsLoadingState = isComponentLoading => {
            setIsLoading(isComponentLoading)
        }

        return (
            <>
            {loading && <LoadingSpinner />}
            <WrappedComponet {...props} setIsLoading={setIsLoadingState}/>
            </>
        )
    }
    return HOC;
}

export default isLoadingHOC;

