import React, { useEffect } from 'react';
import L from 'leaflet';
import './Map.css';
import $ from 'jquery'
import { useSelector, useDispatch } from 'react-redux'
import { setProperties, setSelectedProperty, showMenu, showDrawer, setSelectedPropertyVisibility } from '../../../store/actions';

const axios = require('axios').default;


export let map = null;
export let allProperties = [];
export let selectFeatureOnMap = null;
export let resizeMap = null;

let lyrProperties = null;
let lyrHoverPopup = null;
let lyrPopup2 = null;


const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



export default function Map() {
  const urls = useSelector(state => state.urls);
  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch();

  // run after component is mounted
  useEffect(() => {
    setupDynamicElementEvents()
    initMap()
    loadProperties()
  }, [])//only re-render when map changes


  const setupDynamicElementEvents = selectedProperty => {

    $(document).on("click", "#btn-view-details", function () {

      dispatch(showMenu("mail"))
      dispatch(showDrawer())
      dispatch(setSelectedPropertyVisibility(true))

    })
  }

  const initMap = () => {

    map = L.map("mapview", {
      minZoom: 2,
      maxZoom: 20,
      center: [7.566734, -1.219419],
      zoom: 7,
      layers: [
        L.tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors' })
      ],
    });

    // add scale bar to map
    L.control.scale().addTo(map);


    //create the map legend control
    let legend = L.control({ position: "topright" });
    legend.onAdd = function (map) {
      let div = L.DomUtil.create("div", "legend");
      let labels = ["<h3 style='margin:0px;padding:0px;'>LEGEND</h3>"];
      let categories = ["Available", "Sold", "Unreleased"];

      for (var i = 0; i < categories.length; i++) {
        div.innerHTML += labels.push(
          '<i class="legend_symbol" style="background:' +
          getStyleColor(categories[i]) +
          '"></i> ' +
          (categories[i] ? categories[i] : "+")
        );
      }
      div.innerHTML = labels.join("<br>");
      return div;
    };

    legend.addTo(map);
    //end legend control//


    map.on('click', onMapClick);

  }

  const loadProperties = () => {

    axios.get(urls.propertiesURL, {
      params: {
        //   ID: 12345
      }
    })
      .then(function (response) {
        // console.log(response);


        const propertiesGeoJson = response.data;
        lyrProperties = L.geoJSON(propertiesGeoJson, {
          style: function (feature) {
            return getStyle(feature.properties.status);
          },
          onEachFeature: function (feature, layer) {
            layer.on({
              mouseover: onmouseover,
              mouseout: onmouseout
            });
          }
        }).bindPopup(function (layer) {

          //set the selectedFeature globally
          dispatch(setSelectedProperty(layer.feature));

         console.log(userData)

          return `<span> <b id="unit-title">Unit:</b> <b id="unit-value">${layer.feature.properties.unit}</b></span>
                        <br>
                        <span> <b id="unit-title">Type:</b> &nbsp;&nbsp;&nbsp; <b id="unit-type">${layer.feature.properties.property_type}</b></span>
                        <br>
                        <span> <b id="unit-title">Price:</b> &nbsp;&nbsp;&nbsp; <b id="unit-price">$${numberWithCommas(layer.feature.properties.price)}</b></span>
                        <br><br>
                        <button id="btn-view-details" class='btn-popup details app-btn'> <i class='fa fa-info'></i> Details</button>
                        <button id="btn-manage" class='btn-popup details app-btn'> <i class='fa fa-info'></i> Manage</button>
                        `
        }, {
          autoClose: false
        });

        //add the geojson layer to map
        lyrProperties.addTo(map);

        //zoom the map to show the properties extents
        map.fitBounds(lyrProperties.getBounds());


        // Store the properties geojson to global state
        dispatch(setProperties(propertiesGeoJson.features));


        allProperties = propertiesGeoJson.features;

      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  }


  const getStyle = status => {
    return status.toLowerCase() === "available"
      ? availableStyle
      : status.toLowerCase() === "sold"
        ? soldStyle
        : status.toLowerCase() === "unreleased"
          ? unreleasedStyle
          : unreleasedStyle;
  }

  const getStyleColor = status => {
    return status.toLowerCase() === "available"
      ? "#008000"
      : status.toLowerCase() === "sold"
        ? "#ff0000"
        : status.toLowerCase() === "unreleased"
          ? "#000000"
          : "#000000";
  }

  const onmouseover = (e) => {
    //highlight layer
    let highlightedLayer = e.target;
    let status = highlightedLayer.feature.properties.status;

    if (highlightedLayer.feature.geometry.type === "LineString") {
      highlightedLayer.setStyle({
        color: "#ffff00"
      });
    } else {
      status.toLowerCase() === "available"
        ? highlightedLayer.setStyle(availableHighlightedStyle)
        : status.toLowerCase() === "sold"
          ? highlightedLayer.setStyle(soldHighlightedStyle)
          : status.toLowerCase() === "unreleased"
            ? highlightedLayer.setStyle(unreleasedHighlightedStyle)
            : highlightedLayer.setStyle(unreleasedHighlightedStyle);
    }


    //show popup
    lyrHoverPopup = L.popup({ closeButton: false })
      .setLatLng(e.latlng)
      .setContent(
        "<span>" + highlightedLayer.feature.properties.unit + "</span>"
      )
      .openOn(map);


  }

  const onmouseout = (e) => {
    let highlightedLayer = e.target;
    let status = highlightedLayer.feature.properties.status;
    highlightedLayer.setStyle(getStyle(status));

    //close popup
    map.closePopup(lyrHoverPopup);
    lyrHoverPopup = null
  }


  const onMapClick = () => {
    // Do some wonderful map things...
    console.log("clicked on map")
  }



  const getLayerByUnitId = unit => {
    let outLayer = null;

    //get the feature from the layer using the unit id
    for (var layer_id in lyrProperties._layers) {
      let layer = lyrProperties._layers[layer_id]
      if (layer.feature.properties.unit == unit) {
        outLayer = layer
        break
      }
    }

    return outLayer
  }


  resizeMap = () => {
    map.invalidateSize();
  }

  selectFeatureOnMap = unit => {

    let layer = getLayerByUnitId(unit)
    let price = layer.feature.properties.price

    // set the selected feature globally
    dispatch(setSelectedProperty(layer.feature));


    // get the center latlng
    let latlng = layer.getCenter()

    //show popup on the property
    let popupContent = `<span> <b id="unit-title">Unit:</b> <b id="unit-value">${unit}</b></span>
                          <br>                          
                          <span> <b id="unit-title">Type:</b> &nbsp;&nbsp;&nbsp; <b id="unit-type">${layer.feature.properties.property_type}</b></span>
                          <br>
                          <span> <b id="unit-title">Price:</b> &nbsp;&nbsp;&nbsp; <b id="unit-price">$${numberWithCommas(price)}</b></span>
                          <br><br>
                          <button id="btn-view-details" class='btn-popup details app-btn'> <i class='fa fa-info'></i> Details</button>
                          <button id="btn-manage" class='btn-popup details app-btn'> <i class='fa fa-info'></i> Manage</button>`


    // close the bound popup if it is opened
    lyrProperties.closePopup();

    //close existing popup2 to avoid multiple popups on the map
    map.closePopup(lyrPopup2);
    lyrPopup2 = null;

    // show new popup
    lyrPopup2 = L.popup({ closeButton: true })
      .setLatLng(latlng)
      .setContent(
        popupContent
      )

    // all popups added by the addLayer would not automatically remoe existing popups
    map.addLayer(lyrPopup2);
  }



  const unreleasedStyle = {
    color: "#000000",
    fillColor: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  }

  const unreleasedHighlightedStyle = {
    color: "#000000",
    fillColor: "#000000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }

  const availableStyle = {
    color: "#000000",
    fillColor: "#008000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  }

  const availableHighlightedStyle = {
    color: "#000000",
    fillColor: "#008000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }

  const soldStyle = {
    color: "#000000",
    fillColor: "#ff0000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  }

  const soldHighlightedStyle = {
    color: "#000000",
    fillColor: "#ff0000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }

  return <div className="leaflet-map" />
}