import React from "react";


export default function NavbarProcutos() {

    return(
        <>
                <div className="hero-head">
                    <nav className="tabs is-boxed is-fullwidth">
                        <div className="container">
                            <ul className="is-flex is-justify-content-center">
                                <li><button onClick={() => navigate('/productos/res')}>Res</button></li>
                                <li><button onClick={() => navigate('/productos/cerdo')}>Cerdo</button></li>
                                <li><button onClick={() => navigate('/productos/pollo')}>Pollo</button></li>
                                <li><button onClick={() => navigate('/productos/pescado')}>Pescado</button></li>
                            </ul>
                        </div>
                    </nav>
                </div>    
        
        </>
    )
} 