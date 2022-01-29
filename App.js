import {Modal, useRef} from "react-native";
import {Text, ScrollView, Pressable, View, StatusBar} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React, { Component, useState } from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import HeaderView from './Header';
import {key} from './utils/WeatherKey'
export default class App extends Component {
  state = {
    modalVisible: false,
    temperature: 0,
    condition: null,
    title: 'New York, NY, USA',
    photoRef: 'Aap_uEDrUp51xQjc18aKt1r-YMzZNqT0p0_pw50xTCvR_bEvGl93U9RgTJRMHHxugXRVUkEhsQ6VQQKhCUgGuDRkyKd9RHbu93Ql8T_de5u0V1eIPcqGd4FvFKBO25Q21sUTarQNUabtFzdB13KJ6OWegD_m-diFsWR1TFgNXYKOYDzC5S8-',
    feelsLike: 0,
    high: 0,
    low: 0,
    wind: 0,
    humidity: 0,
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  getWeather(lat = 80, lon = 89) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${key}&units=imperial`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: parseInt(json.main.temp),
          feelsLike: parseInt(json.main.feels_like),
          condition: json.weather[0].main,
          high: parseInt(json.main.temp_max),
          low: parseInt(json.main.temp_min),
          humidity: parseInt(json.main.humidity),
          wind: parseInt(json.wind.speed)
        })
      });
  }
  componentDidMount() {
    this.getWeather(40.7128, -74.006);
  }
 render() {
  const { modalVisible, title, photoRef, feelsLike, high, low, wind, humidity, temperature, condition } = this.state;
  return (
    <View style={tw`h-full bg-gray-200 flex`}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={tw`p-3 pt-24 m-auto w-full z-0 h-full bg-gray-900 bg-opacity-100`}>
        <Text style={tw`text-white m-auto text-center pb-8`}>Search for a city or ZIP code.</Text>
    <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails = {true}
      onFail={() => {
        print("Error!");
      }}
      onPress={(data, details = null) => {
        console.log(details);
        this.setState({
          title: details.formatted_address,
          photoRef: details.photos[0].photo_reference,
        });
        this.getWeather(details.geometry.location.lat, details.geometry.location.lng)
        this.setModalVisible(!modalVisible);
        
      }}
      query={{
        key: 'AIzaSyDAq7gSWIC9vhgkH_Q459I2XbAb-6WIlVU',
        types: '(regions)',
        language: 'en',
        //components: 'country:us',
      }}
    />
        <Pressable style={tw`m-auto text-center absolute text-white p-2 top-14 right-4 bg-gray-900 font-bold rounded`} onPress={() => this.setModalVisible(!this.setModalVisible)} >
  <Text style={tw`text-white text-center font-semibold justify-center`}>Cancel</Text>
  </Pressable>
  </View>
  </Modal>
  <HeaderView condition={condition} title={title} temperature={temperature} high={high} low={low} feelsLike={feelsLike} wind={wind} humidity={humidity} photoRef={photoRef} style={tw`m-auto`}/>
  <View style={tw`h-2/3`}>
    <Pressable style={tw`m-auto text-center absolute bg-black p-2 bg-gray-900 top-14 right-4 font-bold rounded`} onPress={() => this.setModalVisible(true)} >
  <Text style={tw`text-white text-center font-semibold justify-center`}>Search</Text>
  </Pressable>
  </View>
  <View style={tw`w-24 mx-auto mt-3 rounded-lg bg-blue-600`}>

  </View>
  <StatusBar style="light" backgroundColor="#000000" />
</View>
  );
 }
}
/*     <HeaderView />
*/