import { ImageBackground } from 'react-native';
import {Text, Image, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import tw from 'tailwind-react-native-classnames';
import React, {useEffect, useState} from "react";
import {key} from './utils/WeatherKey'
const HeaderView = ({condition,title,temperature,high,low,feelsLike,wind,humidity,photoRef}) => {
    return (
<View style={tw`mx-auto mt-0 shadow-xl w-full h-full rounded-xl absolute shadow-xl rounded-xl`}>
<Image source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${photoRef}&key=XXXXXXXXXXXXXXXXXX`}} resizeMode="cover" style={tw`w-full h-1/2`}>
</Image>
<View style={tw`bg-gray-900 bg-opacity-100 h-full p-3`}>
<Text style={tw`text-3xl text-left text-white font-light mt-7`}>{title}</Text>
<Text style={tw`text-8xl text-left text-white font-semibold pt-2`}>{temperature}°</Text>
<Text style={tw`text-3xl text-left text-white font-bold`}>{condition}</Text>
<Text style={tw`text-xl text-left text-white font-light pt-2`}>High: {high}°</Text>
<Text style={tw`text-xl text-left text-white font-light pt-1`}>Low: {low}°</Text>
<Text style={tw`text-xl text-left text-white font-light pt-1`}>Feels Like: {feelsLike}°</Text>
<Text style={tw`text-xl text-left text-white font-light pt-1`}>Wind: {wind} mph</Text>
<Text style={tw`text-xl text-left text-white font-light pt-1`}>Humidity: {humidity}%</Text>

    </View>
</View>
    );
  };
  export default HeaderView;
