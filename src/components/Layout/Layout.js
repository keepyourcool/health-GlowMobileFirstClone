import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const layout = (props) => {
    return (
        <Aux>
            <div>
                <main>
                    {props.children}
                </main>
            </div>
        </Aux>

    )
}

export default layout;