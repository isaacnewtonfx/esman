import React from 'react'
import './MainLayout.scss'

import Menu from '../components/Menu'
import Drawer from '../components/Drawer'
import LeafletMap from '../components/Map'

import $ from 'jquery'
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css'

import { connect } from 'react-redux'
import {
    setGalleryOpenStatus
  } from '../store/actions'

import Snackbar from '../components/Snackbar'

let classNames = require('classnames')


export class MainLayout extends React.Component{

    constructor(){
        super()

        this.setupJqeuryEvents = this.setupJqeuryEvents.bind(this)
        this.showGalleryViewer = this.showGalleryViewer.bind(this)
    }

    componentDidMount() {
        this.setupJqeuryEvents()  
    }

    setupJqeuryEvents(){
        $(document).on("click",".viewer-container",null,function(){
            $(".viewer-container").css({"width":"100%"})
        })
    }

    showGalleryViewer(){

        const thisComponent = this

        // View a list of images
        setTimeout(function () {
            const viewer = new Viewer(document.getElementById('images'),{

                backdrop: 'static',
                hide(){
                    viewer.destroy()
                    thisComponent.props.setGalleryOpenStatus(false)
                }

            });
            viewer.show(true)
        }, 100);
    }

    render(){

        // handle dynamic drawer class name
        let drawerClassName = classNames(
            'drawer',
            {hide_drawer: this.props.isDrawerShown === false},
        )

        let gallerySectionClassName = classNames(
            'gallerySection',
            {expand_width: this.props.isDrawerShown === false},
        )

        return (

            <>
                <div className = "parent-container">
                    
                    {/* Menu */}
                    <div className="menu-container">
                        <Menu/>
                    </div>
                    

                    {/* Drawer */}
                    <aside className={drawerClassName}> 
                        <Drawer showGalleryViewer={this.showGalleryViewer}/>
                    </aside>


                    {/* Map */}
                    <div className="mapview" id="mapview">
                        <LeafletMap/>
                    </div>

                    {/* Gellery Viewer. Always hidden until a gallery image is clicked from components/DrawerHome.js*/}
                    {
                        this.props.isGalleryOpen &&

                        <section className={gallerySectionClassName}>
                          
                                <ul id="images" style={{listStyle:'none'}}>

                                    {
                                        this.props.galleryViewerImages.map((imgName, index)=>(
                                        
                                            <li key={imgName}>
                                                <img style={{visibility:'hidden'}} 
                                                    src={require(`../assets/img/${imgName}`)} 
                                                    alt="Pic"/>
                                            </li>
                                        ))
                                    }

                                </ul>
                            
                        </section>

                    }   

                </div>

                {/* Toast popup for displaying information */}
                <Snackbar />
                </>
        )
    }
}


// Connecting to the Store
const mapStateToProps = (state) =>{
    return {isDrawerShown: state.isDrawerShown, 
            isGalleryOpen: state.isGalleryOpen,
            galleryViewerImages:state.galleryViewerImages}
}
const mapDispatchToProps = {setGalleryOpenStatus}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainLayout)