import React from 'react'
import Logo from '../../../assets/logo.webp'
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux'
import {
  showMenu,reindexClickedImage,setGalleryOpenStatus
} from '../../../store/actions'


class DrawerHome extends React.Component{

    constructor(){
        super()

        this.handleShowGalleryViewer = this.handleShowGalleryViewer.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
    }

    handleShowGalleryViewer(index, imgName){
        this.props.reindexClickedImage(index,imgName)
        this.props.setGalleryOpenStatus(true)
        this.props.showGalleryViewer()        
    }

    handleSignOut(){

        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        window.location.reload();
    }

    render(){
        return (
            <>
                <header>
                    <div className="brand-name">Estate<span className="red--text">Man</span></div>
                    <div className="logo">
                        <img src={Logo} alt="logo" />
                    </div>
                </header>

                <section className="home-buttons-section">
                    <Button variant="contained" className="material-button" onClick={()=> this.props.showMenu('list')}> 
                        <FontAwesomeIcon icon="list" /> 
                        &nbsp;
                        VIEW ALL UNITS
                    </Button>

                    &nbsp;&nbsp;&nbsp;
                    {this.props.authToken && 
                                            
                        <Button variant="contained" style={{backgroundColor:'#8B0000', color:'white'}} onClick={()=> this.handleSignOut()}>
                            SIGN OUT
                        </Button>                    
                    }
                    

                </section>

                <br/>
                <section>
                    <div className="title" style={{marginLeft : '20px'}}>Gallery</div>
                    <div className="gallery-container">

                        {/* <div className="gallery-div" ><img src={require('../assets/img/1.jpeg')} alt="img" /></div>
                        <div className="gallery-div" ><img src={require('../assets/img/2.jpeg')} alt="img" /></div>
                        <div className="gallery-div" ><img src={require('../assets/img/3.jpeg')} alt="img" /></div>
                        <div className="gallery-div" ><img src={require('../assets/img/4.jpeg')} alt="img" /></div>
                        <div className="gallery-div" ><img src={require('../assets/img/5.jpeg')} alt="img" /></div>
                        <div className="gallery-div" ><img src={require('../assets/img/6.jpeg')} alt="img" /></div> */}


                        {
                        
                            this.props.galleryImages.map( (imgName, index) => (

                                <div key={imgName} className="gallery-div" >

                                    <img src={require(`../../../assets/img/${imgName}`)} 
                                        alt="img"
                                        onClick={() => this.handleShowGalleryViewer(index, imgName)}
                                        style={{cursor:'pointer'}} />

                                </div>

                            ))
                        
                        }
                   

                    </div>
                </section>

                <section className="marketing-message">

                    <h3>Our Master-Planned Communities set the pace for real estate development this side of Africa</h3>
                    <p>Peace of mind, Serenity, Utmost Security, Convenience, Healthy Living are the words our current residents have used to describe our developments.</p>
                    <p><strong>Website:&nbsp;</strong><a title="https://estateman.wheregeospatial.com/" href="#" target="_blank">https://estateman.wheregeospatial.com/</a></p>
                    
                </section>

            </>
        )

    }
}



// Connecting to the Store
const mapStateToProps = (state) =>{
    return {galleryImages: state.galleryImages, isGalleryOpen: state.isGalleryOpen,authToken: state.authToken}
}
const mapDispatchToProps = {showMenu, reindexClickedImage,setGalleryOpenStatus}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerHome)